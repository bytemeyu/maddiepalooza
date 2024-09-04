import { describe, test, jest, expect } from "@jest/globals";
import { usersService } from "../../../src/services/usersService";
import { usersRepository } from "../../../src/repositories/usersRepository";

describe("usersService", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpa todos os mocks antes de cada teste
  });

  describe("getAllUsers", () => {
    test("tem que retornar todos os usuários ao resolver usersRepository.getAllUsers", async () => {
      const mockUsers = [
        {
          user_id: 1,
          email: "user1@example.com",
          username: "user1",
          role: "webadmin",
        },
        {
          user_id: 2,
          email: "user2@example.com",
          username: "user2",
          role: "producer",
        },
      ];

      usersRepository.getAllUsers = jest.fn().mockResolvedValue(mockUsers);

      const users = await usersService.getAllUsers();

      expect(users).toEqual(mockUsers);
      expect(usersRepository.getAllUsers).toHaveBeenCalledTimes(1);
    });

    test("tem que lançar um erro quando usersRepository.getAllUsers é rejeitado", async () => {
      const mockError = new Error("Erro ao recuperar todos os usuários");

      usersRepository.getAllUsers = jest.fn().mockRejectedValue(mockError);

      await expect(usersService.getAllUsers()).rejects.toThrow(
        "Erro ao recuperar todos os usuários"
      );

      expect(usersRepository.getAllUsers).toHaveBeenCalledTimes(1);
    });

    test("tem que retornar um array vazio se não houver usuários", async () => {
      usersRepository.getAllUsers = jest.fn().mockResolvedValue([]);

      const users = await usersService.getAllUsers();

      expect(users).toEqual([]);
      expect(usersRepository.getAllUsers).toHaveBeenCalledTimes(1);
    });

    test("tem que garantir que os usuários retornados tenham a estrutura esperada", async () => {
      const mockUsers = [
        {
          user_id: 1,
          email: "user1@example.com",
          username: "user1",
          role: "webadmin",
        },
        {
          user_id: 2,
          email: "user2@example.com",
          username: "user2",
          role: "producer",
        },
      ];

      usersRepository.getAllUsers = jest.fn().mockResolvedValue(mockUsers);

      const users = await usersService.getAllUsers();

      expect(users).toBeInstanceOf(Array);
      expect(users[0]).toHaveProperty("user_id");
      expect(users[0]).toHaveProperty("email");
      expect(users[0]).toHaveProperty("username");
      expect(users[0]).toHaveProperty("role");
      expect(users[1]).toHaveProperty("user_id");
      expect(users[1]).toHaveProperty("email");
      expect(users[1]).toHaveProperty("username");
      expect(users[1]).toHaveProperty("role");
    });
  });

  describe("getUserById", () => {
    test("tem que retornar o usuário com o id especificado ao resolver usersRepository.getUserById(id)", async () => {
      const mockUser = {
        user_id: 1,
        email: "user1@example.com",
        username: "user1",
        role: "webadmin",
      };

      usersRepository.getUserById = jest.fn().mockResolvedValue(mockUser);

      const user = await usersService.getUserById(1);

      expect(user).toEqual(mockUser);
      expect(usersRepository.getUserById).toHaveBeenCalledWith(1);
      expect(usersRepository.getUserById).toHaveBeenCalledTimes(1);
    });

    test("tem que garantir que o usuário retornado tenha a estrutura esperada", async () => {
      const mockUser = {
        user_id: 1,
        email: "user1@example.com",
        username: "user1",
        role: "webadmin",
      };

      usersRepository.getUserById = jest.fn().mockResolvedValue(mockUser);

      const user = await usersService.getUserById(1);

      expect(user).toHaveProperty("user_id");
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("username");
      expect(user).toHaveProperty("role");
    });

    test("tem que lançar um erro quando usersRepository.getUserById(id) é rejeitado", async () => {
      const mockError = new Error("Erro ao recuperar usuário com id");

      usersRepository.getUserById = jest.fn().mockRejectedValue(mockError);

      await expect(usersService.getUserById(1)).rejects.toThrow(
        "Erro ao recuperar usuário com id"
      );

      expect(usersRepository.getUserById).toHaveBeenCalledWith(1);
      expect(usersRepository.getUserById).toHaveBeenCalledTimes(1);
    });
  });

  describe("createUser", () => {
    test("deve criar um novo usuário quando os dados são válidos", async () => {
      const newUser = {
        email: "user@example.com",
        username: "user",
        password_hash: "hashedPassword",
        role: "producer",
      };

      const mockCreatedUser = {
        user_id: 1,
        ...newUser,
      };

      usersRepository.createUser = jest.fn().mockResolvedValue(mockCreatedUser);

      const createdUser = await usersService.createUser(
        "webadmin", // authenticatedUserRole
        newUser.email,
        newUser.username,
        newUser.password_hash,
        newUser.role
      );

      expect(createdUser).toEqual(mockCreatedUser);
      expect(usersRepository.createUser).toHaveBeenCalledWith(
        newUser.email,
        newUser.username,
        newUser.password_hash,
        newUser.role
      );
      expect(usersRepository.createUser).toHaveBeenCalledTimes(1);
    });

    test("deve lançar um erro se o papel do usuário não for aceito", async () => {
      const newUser = {
        email: "user@example.com",
        username: "user",
        password_hash: "hashedPassword",
        role: "invalidRole",
      };

      await expect(
        usersService.createUser(
          "webadmin", // authenticatedUserRole
          newUser.email,
          newUser.username,
          newUser.password_hash,
          newUser.role
        )
      ).rejects.toThrow(
        "Não é possível criar um tipo de usuário diferente de webadmin, producer ou assistant"
      );

      expect(usersRepository.createUser).not.toHaveBeenCalled();
    });

    test("deve lançar um erro se o produtor tentar criar um usuário que não seja assistente", async () => {
      const newUser = {
        email: "user@example.com",
        username: "user",
        password_hash: "hashedPassword",
        role: "producer",
      };

      await expect(
        usersService.createUser(
          "producer", // authenticatedUserRole
          newUser.email,
          newUser.username,
          newUser.password_hash,
          newUser.role
        )
      ).rejects.toThrow(
        "Produtores (producer) só podem criar usuários do tipo assistente (assistant)"
      );

      expect(usersRepository.createUser).not.toHaveBeenCalled();
    });

    test("deve lançar um erro se ocorrer um problema durante a criação do usuário", async () => {
      const newUser = {
        email: "user@example.com",
        username: "user",
        password_hash: "hashedPassword",
        role: "assistant",
      };

      const mockError = new Error(
        "Erro ao criar novo usuário no banco de dados"
      );

      usersRepository.createUser = jest.fn().mockRejectedValue(mockError);

      await expect(
        usersService.createUser(
          "webadmin", // authenticatedUserRole
          newUser.email,
          newUser.username,
          newUser.password_hash,
          newUser.role
        )
      ).rejects.toThrow("Erro ao criar novo usuário no banco de dados");

      expect(usersRepository.createUser).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateUser", () => {
    test("deve atualizar um usuário existente quando os dados são válidos", async () => {
      const authenticatedUser = {
        user_id: 1,
        role: "webadmin",
      };

      const updatedUser = {
        id: 2,
        email: "newuser@example.com",
        username: "newuser",
        password: "newpassword",
        role: "assistant",
      };

      const mockUpdatedUser = {
        user_id: updatedUser.id,
        email: updatedUser.email,
        username: updatedUser.username,
        role: updatedUser.role,
      };

      usersRepository.getUserById = jest
        .fn()
        .mockResolvedValue(mockUpdatedUser);
      usersRepository.updateUser = jest.fn().mockResolvedValue(mockUpdatedUser);

      const result = await usersService.updateUser(
        authenticatedUser,
        updatedUser.id,
        updatedUser.email,
        updatedUser.username,
        updatedUser.password,
        updatedUser.role
      );

      expect(result).toEqual(mockUpdatedUser);
      expect(usersRepository.getUserById).toHaveBeenCalledWith(updatedUser.id);
      expect(usersRepository.updateUser).toHaveBeenCalledTimes(1);
    });

    test("deve lançar um erro se o usuário não existir", async () => {
      const authenticatedUser = {
        user_id: 1,
        role: "webadmin",
      };

      usersRepository.getUserById = jest.fn().mockResolvedValue(null);

      await expect(
        usersService.updateUser(
          authenticatedUser,
          2,
          "newuser@example.com",
          "newuser",
          "newpassword",
          "assistant"
        )
      ).rejects.toThrow(
        "Não há nenhum usuário com o id especificado no banco de dados"
      );

      expect(usersRepository.updateUser).not.toHaveBeenCalled();
    });

    test("deve lançar um erro se o papel do usuário não for permitido para o autenticado", async () => {
      const authenticatedUser = {
        user_id: 1,
        role: "producer",
      };

      const existingUser = {
        user_id: 2,
        email: "user2@example.com",
        username: "user2",
        role: "webadmin",
      };

      usersRepository.getUserById = jest.fn().mockResolvedValue(existingUser);

      await expect(
        usersService.updateUser(
          authenticatedUser,
          2,
          "newuser@example.com",
          "newuser",
          "newpassword",
          "assistant"
        )
      ).rejects.toThrow("Permissão negada");

      expect(usersRepository.updateUser).not.toHaveBeenCalled();
    });

    test("deve lançar um erro se ocorrer um problema durante a atualização do usuário", async () => {
      const authenticatedUser = {
        user_id: 1,
        role: "webadmin",
      };

      const existingUser = {
        user_id: 2,
        email: "user2@example.com",
        username: "user2",
        role: "assistant",
      };

      const mockError = new Error(
        "Erro ao atualizar usuário no banco de dados"
      );

      usersRepository.getUserById = jest.fn().mockResolvedValue(existingUser);
      usersRepository.updateUser = jest.fn().mockRejectedValue(mockError);

      await expect(
        usersService.updateUser(
          authenticatedUser,
          2,
          "newuser@example.com",
          "newuser",
          "newpassword",
          "assistant"
        )
      ).rejects.toThrow("Erro ao atualizar usuário no banco de dados");

      expect(usersRepository.updateUser).toHaveBeenCalledTimes(1);
    });
  });

  describe("deleteUser", () => {
    test("deve deletar um usuário existente e retornar o usuário deletado", async () => {
      const mockDeletedUser = {
        user_id: 1,
        email: "user1@example.com",
        username: "user1",
        role: "webadmin",
      };

      usersRepository.deleteUser = jest.fn().mockResolvedValue(mockDeletedUser);

      const deletedUser = await usersService.deleteUser(1);

      expect(deletedUser).toEqual(mockDeletedUser);
      expect(usersRepository.deleteUser).toHaveBeenCalledWith(1);
      expect(usersRepository.deleteUser).toHaveBeenCalledTimes(1);
    });

    test("deve lançar um erro quando usersRepository.deleteUser é rejeitado", async () => {
      const mockError = new Error("Erro ao deletar usuário no banco de dados");

      usersRepository.deleteUser = jest.fn().mockRejectedValue(mockError);

      await expect(usersService.deleteUser(1)).rejects.toThrow(
        "Erro ao deletar usuário no banco de dados"
      );

      expect(usersRepository.deleteUser).toHaveBeenCalledWith(1);
      expect(usersRepository.deleteUser).toHaveBeenCalledTimes(1);
    });
  });

  describe("getUserByEmail", () => {
    test("tem que retornar o usuário com o email especificado ao resolver usersRepository.getUserByEmail(email)", async () => {
      const mockUser = {
        user_id: 1,
        email: "user1@example.com",
        username: "user1",
        role: "webadmin",
      };

      usersRepository.getUserByEmail = jest.fn().mockResolvedValue(mockUser);

      const user = await usersService.getUserByEmail("user1@example.com");

      expect(user).toEqual(mockUser);
      expect(usersRepository.getUserByEmail).toHaveBeenCalledWith(
        "user1@example.com"
      );
      expect(usersRepository.getUserByEmail).toHaveBeenCalledTimes(1);
    });

    test("tem que lançar um erro quando usersRepository.getUserByEmail(email) é rejeitado", async () => {
      const mockError = new Error(
        "Erro ao recuperar usuário com e-mail user1@example.com"
      );

      usersRepository.getUserByEmail = jest.fn().mockRejectedValue(mockError);

      await expect(
        usersService.getUserByEmail("user1@example.com")
      ).rejects.toThrow(
        "Erro ao recuperar usuário com e-mail user1@example.com"
      );

      expect(usersRepository.getUserByEmail).toHaveBeenCalledWith(
        "user1@example.com"
      );
      expect(usersRepository.getUserByEmail).toHaveBeenCalledTimes(1);
    });
  });
});

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});
