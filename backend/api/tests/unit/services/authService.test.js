import { describe, test, jest, expect } from "@jest/globals";
import { authService } from "../../../src/services/authService";
import { usersService } from "../../../src/services/usersService";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

describe("authService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  describe("login", () => {
    test("tem que fazer o login se usuário e senha estiverem corretos (caso de sucesso)", async () => {
      const user = {
        user_id: 1,
        username: "user1",
        password_hash: "hashedPassword",
        role: "webadmin",
      };

      // Mockando usersService.getUserByUsername para retornar o usuário simulado
      usersService.getUserByUsername = jest.fn().mockResolvedValue(user);

      // Mockando bcrypt.compare para retornar true (senha correta)
      bcrypt.compare = jest.fn().mockResolvedValue(true);

      // Mockando jwt.sign para retornar um token simulado
      const token = "fakeToken";
      jwt.sign = jest.fn().mockReturnValue(token);

      const successfullLogin = await authService.login(
        user.username,
        "password1"
      );

      expect(successfullLogin).toEqual({
        id: user.user_id,
        username: user.username,
        role: user.role,
        token,
      });

      expect(usersService.getUserByUsername).toHaveBeenCalledWith(
        user.username
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        "password1",
        user.password_hash
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: user.user_id, username: user.username, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "3h" }
      );
    });

    test("não deve fazer login e deve lançar um erro caso o usuário seja inválido (caso específico com tratamento de erro", async () => {
      const mockError = new Error("Nome de usuário inválido");

      const user = {
        user_id: 1,
        username: "user11",
        password_hash: "hashedPassword",
        role: "webadmin",
      };

      // Simulando que o usuário não foi encontrado
      usersService.getUserByUsername = jest.fn().mockResolvedValue(null);

      //bcrypt.compare = jest.fn().mockResolvedValue();
      //jwt.sign = jest.fn().mockReturnValue();
      //não faz sentido mockar bcrypt.compare e jwt.sign, pois essas funções nunca devem ser chamadas se o nome de usuário for inválido.

      await expect(
        authService.login(user.username, "password1")
      ).rejects.toThrow("Nome de usuário inválido");

      expect(usersService.getUserByUsername).toHaveBeenCalledWith(
        user.username
      );
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    test("não deve fazer login e deve lançar um erro caso a senha seja inválida (caso específico com tratamento de erro", async () => {
      const mockError = new Error("Senha inválida");

      const user = {
        user_id: 1,
        username: "user1",
        password_hash: "hashedPassword",
        role: "webadmin",
      };

      usersService.getUserByUsername = jest.fn().mockResolvedValue(user);

      // Mockando bcrypt.compare para retornar false (senha incorreta)
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await expect(
        authService.login(user.username, "password11")
      ).rejects.toThrow("Senha inválida");

      expect(usersService.getUserByUsername).toHaveBeenCalledWith(
        user.username
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        "password11",
        user.password_hash
      );
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    test("deve lançar um erro se ocorrer um problema ao gerar o token JWT", async () => {
      const user = {
        user_id: 1,
        username: "user1",
        password_hash: "hashedPassword",
        role: "webadmin",
      };

      usersService.getUserByUsername = jest.fn().mockResolvedValue(user);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn(() => {
        throw new Error("Erro ao gerar token JWT");
      });

      await expect(
        authService.login(user.username, "password1")
      ).rejects.toThrow("Erro ao gerar token JWT");

      expect(usersService.getUserByUsername).toHaveBeenCalledWith(
        user.username
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        "password1",
        user.password_hash
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: user.user_id, username: user.username, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "3h" }
      );
    });
  });
});
