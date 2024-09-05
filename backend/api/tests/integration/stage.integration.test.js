import request from "supertest";
import app from "../../src/app.js";
import jwt from "jsonwebtoken";

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

//como no teste da primeira entidade (artist) já foram criadas as tabelas e etc, aqui não precisa de beforeAll.

describe("Stage API Endpoints", () => {
  describe("POST /api/stage", () => {
    test("deve criar um novo palco com dados válidos", async () => {
      const newStage = {
        name: "Saara",
        location: "Rio de Janeiro - RJ",
        capacity: 750,
      };

      const token = generateValidToken();

      const res = await request(app)
        .post("/api/stage")
        .send(newStage)
        .set("Cookie", `token=${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("stage_id");
      expect(res.body.data).toHaveProperty("name", newStage.name);
      expect(res.body.data).toHaveProperty("location", newStage.location);
      expect(res.body.data).toHaveProperty("capacity", newStage.capacity);
    });

    test("deve retornar 400 se a validação de dados falhar durante a criação de um novo palco", async () => {
      const invalidStageData = {
        localization: "This stage localization is invalid",
        capacity: 750,
        // faltando a localização, que é obrigatória
      };

      const token = generateValidToken();

      const res = await request(app)
        .post("/api/stage")
        .send(invalidStageData)
        .set("Cookie", `token=${token}`);

      expect(res.statusCode).toEqual(400);
      expect(res.body.errors).toBeDefined();
      expect(res.body.errors[0].msg).toBe(
        "A localização do palco é obrigatória"
      );
    });

    test("deve retornar 401 se o usuário não estiver autenticado", async () => {
      const newStage = {
        name: "Saara",
        location: "Rio de Janeiro - RJ",
        capacity: 750,
      };

      const res = await request(app).post("/api/stage").send(newStage);

      expect(res.statusCode).toEqual(401);
      expect(res.body.error).toBe("Token não fornecido");
    });
  });
});
