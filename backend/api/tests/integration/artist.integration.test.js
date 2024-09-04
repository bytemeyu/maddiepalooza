import request from "supertest";
import app from "../../src/app.js";
import { query } from "../../src/config/database.js";
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

const checkTableExists = async (tableName) => {
  const result = await query(
    `SELECT EXISTS (
      SELECT FROM pg_tables
      WHERE schemaname = 'public' AND tablename = $1
    );`,
    [tableName]
  );
  return result.rows[0].exists;
};

beforeAll(async () => {
  const sqlFiles = [
    { file: "artist.sql", table: "artist" },
    { file: "stage.sql", table: "stage" },
    { file: "performance.sql", table: "performance" },
    { file: "artistPerformances.sql", table: "artist_performances" },
    { file: "users.sql", table: "users" },
  ];

  for (const { file, table } of sqlFiles) {
    const tableExists = await checkTableExists(table);

    if (!tableExists) {
      const filePath = path.resolve(__dirname, "../app/src/schema.sql", file);
      //cria o caminho de cada um dos arquivos schema.sql, lembrando que esse caminho é relativo ao serviço de api no docker
      console.log(`Criando tabela ${table}`);
      console.log(filePath);
      const sql = fs.readFileSync(filePath, "utf8");
      //lê o conteúdo de cada arquivo
      await query(sql);
      //executa o sql no banco de dados teste
    } else {
      console.log(`Tabela ${table} já existe. Pulando criação.`);
    }
  }

  await query("TRUNCATE TABLE artist RESTART IDENTITY CASCADE");
  //limpa as tabelas antes de todos os testes
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
