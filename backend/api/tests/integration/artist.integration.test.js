import request from "supertest";
import app from "../../src/app.js";
import { query, pool } from "../../src/config/database.js";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";

const __dirname = path.resolve();

const generateValidToken = () => {
  const payload = {
    id: 38999,
    username: "user",
    role: "webadmin",
  };
  //simula o payload de um usuário
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
  //gera um token válido
};

beforeEach(async () => {
  await query("BEGIN");
  //inicia uma transação antes de cada teste (envolvendo cada teste em uma transação e, após o teste, fazendo um rollback para garantir que nenhuma alteração no banco de dados persista entre os testes)
  const filePath = path.resolve(__dirname, "../app/src/schema.sql/artist.sql");
  const sql = fs.readFileSync(filePath, "utf8");
  //lê o conteúdo do arquivo
  await query(sql);
  //executa o sql no banco de dados teste

  await query("TRUNCATE TABLE artist RESTART IDENTITY CASCADE");
  //limpa a tabela em questão antes de todos os testes
});

afterEach(async () => {
  await query("ROLLBACK");
  //reverte a transação após cada teste
});

afterAll(async () => {
  await pool.end();
  //fecha o pool de conexões do banco
});

describe("Artist API Endpoints", () => {
  describe("POST /api/artist", () => {
    test("deve criar um novo artista com os dados válidos", async () => {
      const newArtist = {
        name: "Juju dos Teclados",
        biography:
          "Juju dos Teclados começou sua carreira em 2003, no Rio de Janeiro - RJ.",
        photo_url: "https://jujudosteclados.com.br",
      };

      const token = generateValidToken();
      //gera um token de usuário webadmin autenticado

      const res = await request(app)
        .post("/api/artist")
        .send(newArtist)
        .set("Cookie", `token=${token}`);
      //envia o token JWT no cookie

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("artist_id");
      expect(res.body.data).toHaveProperty("name", newArtist.name);
      expect(res.body.data).toHaveProperty("biography", newArtist.biography);
      expect(res.body.data).toHaveProperty("photo_url", newArtist.photo_url);
    });

    test("deve retornar 400 se a validação de dados falhar durante a criação de novo artista", async () => {
      const invalidArtistData = {
        biography: "This artist data is invalid",
        photo_url: "http://exemplo.com/invalid.jpg",
        //está faltando o name, que é obrigatório
      };

      const token = generateValidToken();
      //gera um token de usuário webadmin autenticado

      const res = await request(app)
        .post("/api/artist")
        .send(invalidArtistData)
        .set("Cookie", `token=${token}`);
      //envia o token JWT no cookie

      expect(res.statusCode).toEqual(400);
      expect(res.body.errors).toBeDefined();
      expect(res.body.errors[0].msg).toBe("O nome do artista é obrigatório");
    });

    test("deve retornar 401 se o usuário não estiver autenticado", async () => {
      const newArtist = {
        name: "Juju dos Teclados",
        biography:
          "Juju dos Teclados começou sua carreira em 2003, no Rio de Janeiro - RJ.",
        photo_url: "https://jujudosteclados.com.br",
      };

      const res = await request(app).post("/api/artist").send(newArtist);
      //sem enviar o token JWT

      expect(res.statusCode).toEqual(401);
      //verifica se o status é 401 (não autorizado)
      expect(res.body.error).toBe("Token não fornecido");
    });
  });
});
