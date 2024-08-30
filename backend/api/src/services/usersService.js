import bcrypt from "bcryptjs";
import { usersRepository } from "../repositories/usersRepository.js";

export const usersService = {
  getAllUsers: async () => {
    try {
      return await usersRepository.getAllUsers();
    } catch (err) {
      console.error(`Erro ao recuperar todos os usuários: ${err.message}`);
      throw err;
    }
  },

  getUserById: async (id) => {
    try {
      return await usersRepository.getUserById(id);
    } catch (err) {
      console.error(`Erro ao recuperar usuário com id ${id}: ${err.message}`);
      throw err;
    }
  },

  getUserByUsername: async (username) => {
    try {
      return await usersRepository.getUserByUsername(username);
    } catch (err) {
      console.error(
        `Erro ao recuperar usuário com username ${username}: ${err.message}`
      );
    }
  },

  createUser: async (
    authenticatedUserRole,
    email,
    username,
    password_hash,
    role
  ) => {
    try {
      const acceptedRoles = ["webadmin", "producer", "assistant"];
      if (!acceptedRoles.includes(role)) {
        throw new Error(
          "Não é possível criar um tipo de usuário diferente de webadmin, producer ou assistant"
        );
      }

      if (authenticatedUserRole === "producer" && role !== "assistant") {
        throw new Error(
          "Produtores (producer) só podem criar usuários do tipo assistente (assistant)"
        );
      }

      return await usersRepository.createUser(
        email,
        username,
        password_hash,
        role
      );
    } catch (err) {
      console.error(
        `Erro ao criar novo usuário no banco de dados: ${err.message}`
      );
      throw err;
    }
  },

  updateUser: async (
    authenticatedUser,
    id,
    email,
    username,
    password,
    role
  ) => {
    try {
      const outdatedUser = await usersRepository.getUserById(id);

      if (!outdatedUser) {
        throw new Error(
          "Não há nenhum usuário com o id especificado no banco de dados"
        );
      }

      if (
        (authenticatedUser.role === "producer" &&
          outdatedUser.role === "webadmin") ||
        (authenticatedUser.role === "assistant" &&
          (outdatedUser.role === "webadmin" ||
            outdatedUser.role === "producer"))
      ) {
        throw new Error("Permissão negada");
      }
      //Producer não pode alterar webadmin; assistant não pode alterar webadmin nem producer.

      let roleToUse = outdatedUser.role;

      if (
        authenticatedUser.role === "producer" &&
        outdatedUser.role === "assistant" &&
        role !== "webadmin"
      ) {
        roleToUse = role || outdatedUser.role;
        //Se for um producer alterando um assistant, ele pode promover o assistant a producer (nunca a webadmin).
      } else if (authenticatedUser.role === "webadmin") {
        roleToUse = role || outdatedUser.role;
        //Se for um webadmin alterando um webadmin, um producer ou um assistant, ele pode alterar para o tipo que quiser.
      }

      const emailToUse = email || outdatedUser.email;
      const usernameToUse = username || outdatedUser.username;
      let password_hashToUse = outdatedUser.password_hash;
      if (password) {
        password_hashToUse = await bcrypt.hash(password, 10);
      }
      //eu achava que esse trecho deveria estar no Controller, mas pesquisei e o ideal é manter esse trecho no Service. A razão é que essa lógica faz parte do processo de decisão sobre como os dados do usuário devem ser atualizados, o que é uma responsabilidade de negócio. O Service deve decidir quais valores usar e como processá-los, de acordo com as regras de negócio definidas.

      return await usersRepository.updateUser(
        id,
        emailToUse,
        usernameToUse,
        password_hashToUse,
        roleToUse
      );
    } catch (err) {
      console.error(
        `Erro ao atualizar usuário com id ${id} no banco de dados: ${err.message}`
      );
      throw err;
    }
  },

  deleteUser: async (id) => {
    try {
      return await usersRepository.deleteUser(id);
    } catch (err) {
      console.error(
        `Erro ao deletar usuário com id ${id} no banco de dados: ${err.message}`
      );
      throw err;
    }
  },

  getUserByEmail: async (email) => {
    try {
      return await usersRepository.getUserByEmail(email);
    } catch (err) {
      console.error(
        `Erro ao recuperar usuário com e-mail ${email}: ${err.message}`
      );
      throw err;
    }
  },
};
