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

//A melhor prática recomendada para testes de integração (e testes em geral) é garantir que cada teste seja completamente independente dos outros. Isso significa que cada teste deve ser capaz de ser executado isoladamente, sem depender da ordem de execução ou de outros testes terem sido bem-sucedidos.

beforeEach(async () => {
  await query("BEGIN");
  const sqlFiles = [
    "artist.sql",
    "stage.sql",
    "performance.sql",
    "artistPerformances.sql",
  ];

  for (const file of sqlFiles) {
    const filePath = path.resolve(__dirname, "../app/src/schema.sql", file);
    //cria o caminho de cada um dos arquivos schema.sql
    const sql = fs.readFileSync(filePath, "utf8");
    //lê o conteúdo de cada arquivo
    await query(sql);
    //executa o sql no banco de dados teste
  }

  await query("TRUNCATE TABLE artist RESTART IDENTITY CASCADE");
  await query("TRUNCATE TABLE stage RESTART IDENTITY CASCADE");
  await query("TRUNCATE TABLE performance RESTART IDENTITY CASCADE");
  //limpa as tabelas antes de todos os testes

  //inserir artista para poder testar performance:
  const insertedArtist = await query(
    `INSERT INTO artist (name, biography, photo_url) VALUES ($1, $2, $3) RETURNING artist_id`,
    [
      "Juju dos Teclados",
      "Juju dos Teclados começou sua carreira em 2003, no Rio de Janeiro - RJ.",
      "https://jujudosteclados.com.br",
    ]
  );

  global.testArtistId = insertedArtist.rows[0].artist_id;
  //A variável insertedArtist contém o resultado da consulta SQL. O rows[0] refere-se à primeira linha do resultado (que corresponde ao artista inserido), e artist_id é o ID desse artista, que foi gerado automaticamente pelo banco de dados.
  //A parte global.testArtistId está armazenando o valor do artist_id no objeto global do Node.js, que permite criar variáveis globais acessíveis de qualquer lugar do código. Isso é feito para que o ID do artista recém-criado (artist_id) possa ser acessado em outros lugares do código ou em outros testes, sem precisar passar o valor diretamente entre funções.
  console.log(
    `o id do artista está sendo passado assim: ${global.testArtistId}`
  );

  //inserir palco para poder testar performance:
  const insertedStage = await query(
    `INSERT INTO stage (name, location, capacity) VALUES ($1, $2, $3) RETURNING stage_id`,
    ["Saara", "Rio de Janeiro - RJ", 750]
  );

  global.testStageId = insertedStage.rows[0].stage_id;
  console.log(`o id do palco está sendo passado assim: ${global.testArtistId}`);
});

afterEach(async () => {
  await query("ROLLBACK");
  //reverte a transação após cada teste
});

afterAll(async () => {
  await pool.end();
  //fecha o pool de conexões do banco
});

describe("Performance API Endpoints", () => {
  describe("POST /api/performance", () => {
    test("deve criar uma nova performance com dados válidos", async () => {
      const newPerformance = {
        artist_id: global.testArtistId,
        stage_id: global.testStageId,
        start_time: "2025-05-15T19:00:00+00:00",
        end_time: "2025-05-15T20:30:00+00:00",
        date: "2025-05-15",
      };

      const token = generateValidToken();

      const res = await request(app)
        .post("/api/performance")
        .send(newPerformance)
        .set("Cookie", `token=${token}`);

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("performance_id");
      expect(res.body.data).toHaveProperty(
        "artist_id",
        newPerformance.artist_id
      );
      expect(res.body.data).toHaveProperty("stage_id", newPerformance.stage_id);

      //convertendo ambos os valores para o mesmo formato antes de comparar:
      const returnedStartTime = new Date(res.body.data.start_time)
        .toISOString()
        .split(".")[0];
      const expectedStartTime = new Date(newPerformance.start_time)
        .toISOString()
        .split(".")[0];

      expect(returnedStartTime).toEqual(expectedStartTime);

      //idem:
      const returnedEndTime = new Date(res.body.data.end_time)
        .toISOString()
        .split(".")[0];
      const expectedEndTime = new Date(newPerformance.end_time)
        .toISOString()
        .split(".")[0];

      expect(returnedEndTime).toEqual(expectedEndTime);

      //extraindo apenas a parte da data para comparar:
      const returnedDate = res.body.data.date.split("T")[0];
      expect(returnedDate).toEqual(newPerformance.date);
    });

    test("deve retornar 400 se a validação de dados falhar durante a criação de uma nova performance", async () => {
      const invalidPerformanceData = {
        stage_id: global.testStageId,
        start_time: "2025-05-15T19:00:00+00:00",
        end_time: "2025-05-15T20:30:00+00:00",
        date: "2025-05-15",
        // faltando artist_id, que é obrigatório
      };

      const token = generateValidToken();

      const res = await request(app)
        .post("/api/performance")
        .send(invalidPerformanceData)
        .set("Cookie", `token=${token}`);

      expect(res.statusCode).toEqual(400);
      expect(res.body.errors).toBeDefined();
      expect(res.body.errors[0].msg).toBe(
        "Um id válido de artista é obrigatório"
      );
    });

    test("deve retornar 401 se o usuário não estiver autenticado", async () => {
      const newPerformance = {
        artist_id: global.testArtistId,
        stage_id: global.testStageId,
        start_time: "2025-05-15T19:00:00+00:00",
        end_time: "2025-05-15T20:30:00+00:00",
        date: "2025-05-15",
      };

      const res = await request(app)
        .post("/api/performance")
        .send(newPerformance);

      expect(res.statusCode).toEqual(401);
      expect(res.body.error).toBe("Token não fornecido");
    });
  });
});
