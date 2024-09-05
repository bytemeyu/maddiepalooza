import request from "supertest";
import app from "../../src/app.js";
import { query, pool } from "../../src/config/database.js";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";

const __dirname = path.resolve();

const generateValidToken = (role = "webadmin") => {
  const payload = {
    id: 38999,
    username: "user",
    role,
  };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
};

beforeEach(async () => {
  await query("BEGIN");
  //inicia uma transação antes de cada teste (envolvendo cada teste em uma transação e, após o teste, fazendo um rollback para garantir que nenhuma alteração no banco de dados persista entre os testes)
  const filePath = path.resolve(__dirname, "../app/src/schema.sql/users.sql");
  const sql = fs.readFileSync(filePath, "utf8");
  //lê o conteúdo do arquivo
  await query(sql);
  //executa o sql no banco de dados teste

  await query("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
  //limpa a tabela em questão antes de todos os testes

  //inserir usuário para poder testar gets, put e delete com maior acurácia:
  const insertedUser = await query(
    `INSERT INTO users (email, username, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING user_id`,
    ["name@example.com", "user", "#password", "webadmin"]
  );

  global.testUserId = insertedUser.rows[0].user_id;
});

afterEach(async () => {
  await query("ROLLBACK");
  //reverte a transação após cada teste
});

afterAll(async () => {
  await pool.end();
  //fecha o pool de conexões do banco depois de todos os testes
});

describe("Users API Endpoints", () => {
  describe("GET /api/users", () => {
    test("deve retornar todos os usuários", async () => {
      const token = generateValidToken();

      const res = await request(app)
        .get("/api/users")
        .set("Cookie", `token=${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeInstanceOf(Array);
    });

    test("deve retornar 401 se o usuário não estiver autenticado", async () => {
      const res = await request(app).get("/api/users");

      expect(res.statusCode).toEqual(401);
      expect(res.body.error).toBe("Token não fornecido");
    });
  });

  describe("GET /api/users/:id", () => {
    test("deve retornar um usuário específico", async () => {
      const token = generateValidToken();
      const userId = global.testUserId;

      const res = await request(app)
        .get(`/api/users/${userId}`)
        .set("Cookie", `token=${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("user_id", userId);
    });

    test("deve retornar 404 se o usuário não for encontrado", async () => {
      const token = generateValidToken();
      const userId = 37999;

      const res = await request(app)
        .get(`/api/users/${userId}`)
        .set("Cookie", `token=${token}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body.data).toBe(
        "Não há nenhum usuário com o id especificado no banco de dados"
      );
    });
  });

  describe("POST /api/users", () => {
    test("deve criar um novo usuário com dados válidos", async () => {
      const token = generateValidToken("webadmin");

      const newUser = {
        email: "john.doe@example.com",
        username: "john_doe",
        password: "pass_Word123",
        role: "assistant",
      };

      const res = await request(app)
        .post("/api/users")
        .send(newUser)
        .set("Cookie", `token=${token}`);

      console.log("corpo da resposta:", res.body);
      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("user_id");
      expect(res.body.data).toHaveProperty("email", newUser.email);
      expect(res.body.data).toHaveProperty("username", newUser.username);
      expect(res.body.data).toHaveProperty("role", newUser.role);
    });

    test("deve retornar 400 se a validação de dados falhar", async () => {
      const token = generateValidToken();

      const invalidUser = {
        username: "john_doe",
      };

      const res = await request(app)
        .post("/api/users")
        .send(invalidUser)
        .set("Cookie", `token=${token}`);

      expect(res.statusCode).toEqual(400);
      expect(res.body.errors).toBeDefined();
    });

    test("deve retornar 403 (na verdade está implementado 500 mesmo, porque a mensagem de erro mais específica e tals está na camada de serviço, aí chega na camada de controle como um erro 500 mesmo) se o usuário não tiver permissão para criar", async () => {
      const token = generateValidToken("producer");

      const newUser = {
        email: "jane.doe@example.com",
        username: "jane_doe",
        password: "pass_Word123",
        role: "producer",
      };

      const res = await request(app)
        .post("/api/users")
        .send(newUser)
        .set("Cookie", `token=${token}`);

      expect(res.statusCode).toEqual(500);
      expect(res.body.error).toBe(
        "Erro ao criar novo usuário no banco de dados"
      );
    });
  });

  describe("PUT /api/users/:id", () => {
    test("deve atualizar um usuário com dados válidos", async () => {
      const token = generateValidToken();
      const userId = global.testUserId;

      const updatedUser = {
        email: "john.doe@newdomain.com",
        username: "john_doe_updated",
        password: "newpass_Word123",
        role: "assistant",
      };

      const res = await request(app)
        .put(`/api/users/${userId}`)
        .send(updatedUser)
        .set("Cookie", `token=${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("user_id", userId);
      expect(res.body.data).toHaveProperty("email", updatedUser.email);
      expect(res.body.data).toHaveProperty("username", updatedUser.username);
      expect(res.body.data).toHaveProperty("role", updatedUser.role);
    });

    test("deve retornar 403 se o usuário não tiver permissão para atualizar", async () => {
      const token = generateValidToken("assistant");
      const userId = global.testUserId;

      const updatedUser = {
        email: "john.doe@newdomain.com",
        username: "john_doe_updated",
        password: "newpass_Word123",
        role: "producer",
      };

      const res = await request(app)
        .put(`/api/users/${userId}`)
        .send(updatedUser)
        .set("Cookie", `token=${token}`);

      expect(res.statusCode).toEqual(403);
      expect(res.body.error).toBe(
        "Permissão negada para atualizar este usuário"
      );
    });
  });

  describe("DELETE /api/users/:id", () => {
    test("deve deletar um usuário com sucesso", async () => {
      const token = generateValidToken();
      const userId = global.testUserId;

      const res = await request(app)
        .delete(`/api/users/${userId}`)
        .set("Cookie", `token=${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("user_id", userId);
    });

    test("deve retornar 403 se o usuário não tiver permissão para deletar", async () => {
      const token = generateValidToken("producer");
      const userId = global.testUserId;

      const res = await request(app)
        .delete(`/api/users/${userId}`)
        .set("Cookie", `token=${token}`);

      expect(res.statusCode).toEqual(403);
      expect(res.body.error).toBe("Permissão negada para deletar este usuário");
    });
  });
});
