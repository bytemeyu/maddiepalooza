import request from "supertest";
import app from "../../src/app.js";
import { query, pool } from "../../src/config/database.js";
import path from "path";
import fs from "fs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const __dirname = path.resolve();

beforeEach(async () => {
  await query("BEGIN");
  const filePath = path.resolve(__dirname, "../app/src/schema.sql/users.sql");
  const sql = fs.readFileSync(filePath, "utf8");
  await query(sql);

  await query("TRUNCATE TABLE users RESTART IDENTITY CASCADE");

  const passwordHash = await bcrypt.hash("validPassword123_", 10);
  await query(
    `INSERT INTO users (email, username, password_hash, role) VALUES ($1, $2, $3, $4)`,
    ["test@example.com", "testUser", passwordHash, "assistant"]
  );
});

afterEach(async () => {
  await query("ROLLBACK");
});

afterAll(async () => {
  await pool.end();
});

describe("Auth API Endpoints", () => {
  describe("POST /api/auth/login", () => {
    test("deve realizar login com credenciais válidas", async () => {
      const loginData = {
        username: "testUser",
        password: "validPassword123_",
      };

      const res = await request(app).post("/api/auth/login").send(loginData);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("token");
      expect(res.body).toHaveProperty("username", loginData.username);
      expect(res.body).toHaveProperty("role");
      expect(res.headers["set-cookie"]).toBeDefined();
      //verifica se o token foi enviado via cookie
    });

    test("deve retornar 400 se faltar username ou senha", async () => {
      const loginData = {
        password: "somePassword",
      };

      const res = await request(app).post("/api/auth/login").send(loginData);

      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toBe("Nome de usuário e senha são obrigatórios");
    });

    test("deve retornar 401 se o nome de usuário for inválido", async () => {
      const loginData = {
        username: "wrongUser",
        password: "validPassword123_",
      };

      const res = await request(app).post("/api/auth/login").send(loginData);

      expect(res.statusCode).toEqual(401);
      expect(res.body.error).toBe("Nome de usuário ou senha inválidos");
    });

    test("deve retornar 401 se a senha for inválida", async () => {
      const loginData = {
        username: "testUser",
        password: "wrongPassword",
      };

      const res = await request(app).post("/api/auth/login").send(loginData);

      expect(res.statusCode).toEqual(401);
      expect(res.body.error).toBe("Nome de usuário ou senha inválidos");
    });
  });

  describe("DELETE /api/auth/logout", () => {
    test("deve realizar logout com sucesso", async () => {
      const loginData = {
        username: "testUser",
        password: "validPassword123_",
      };

      const loginRes = await request(app)
        .post("/api/auth/login")
        .send(loginData);
      const token = loginRes.headers["set-cookie"][0];

      const res = await request(app)
        .delete("/api/auth/logout")
        .set("Cookie", token);

      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBe("Logout bem-sucedido");
      expect(res.headers["set-cookie"]).toBeDefined();
      //verifica se o cookie foi removido
    });

    test("deve retornar 401 se não houver token para encerrar a sessão", async () => {
      const res = await request(app).delete("/api/auth/logout");

      //"No seu teste para a rota DELETE /api/auth/logout, você espera que o status retornado seja 200 quando não há um token de sessão. No entanto, o status retornado é 401, o que significa que o middleware de autenticação provavelmente está rejeitando a requisição quando não encontra um token, antes mesmo de chegar ao controlador (authController.logout)."

      expect(res.statusCode).toEqual(401);
      expect(res.body.error).toBe("Token não fornecido");
    });
  });
});
