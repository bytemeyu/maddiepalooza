import bcrypt from "bcryptjs";
import { usersService } from "../services/usersService.js";
import { validationResult } from "express-validator";

export const usersController = {
  getAllUsers: async (req, res) => {
    try {
      const allUsers = await usersService.getAllUsers();

      if (allUsers.length === 0) {
        return res.status(404).json({
          success: false,
          data: "Não há nenhum usuário no banco de dados",
        });
      }

      const mappedUsers = allUsers.map((user) => {
        return {
          user_id: user.user_id,
          email: user.email,
          username: user.username,
          role: user.role,
        };
      });

      res.status(200).json({
        success: true,
        data: mappedUsers,
      });
    } catch (err) {
      console.error(`Erro ao recuperar todos os usuários: ${err.message}`);
      res.status(500).json({
        success: false,
        error: "Erro ao recuperar todos os usuários",
      });
    }
  },

  getUserById: async (req, res) => {
    const { id } = req.params;

    try {
      const userById = await usersService.getUserById(id);
      if (!userById) {
        return res.status(404).json({
          success: false,
          data: "Não há nenhum usuário com o id especificado no banco de dados",
        });
      }

      res.status(200).json({
        success: true,
        data: {
          user_id: userById.user_id,
          email: userById.email,
          username: userById.username,
          role: userById.role,
        },
      });
    } catch (err) {
      console.error(`Erro ao recuperar usuário com id ${id}: ${err.message}`);
      res.status(500).json({
        success: false,
        error: "Erro ao recuperar usuário a partir de id",
      });
    }
  },

  createUser: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, username, password, role } = req.body;

    const authenticatedUserRole = req.user.role;

    const password_hash = await bcrypt.hash(password, 10);

    try {
      const createdUser = await usersService.createUser(
        authenticatedUserRole,
        email,
        username,
        password_hash,
        role
      );
      res.status(200).json({
        success: true,
        data: {
          user_id: createdUser.user_id,
          email: createdUser.email,
          username: createdUser.username,
          role: createdUser.role,
        },
      });
    } catch (err) {
      console.error(
        `Erro ao criar novo usuário no banco de dados: ${err.message}`
      );
      res.status(500).json({
        success: false,
        error: "Erro ao criar novo usuário no banco de dados",
      });
    }
  },

  updateUser: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { email, username, password, role } = req.body;

    const authenticatedUser = req.user;

    try {
      const updatedUser = await usersService.updateUser(
        authenticatedUser,
        id,
        email,
        username,
        password,
        role
      );
      res.status(200).json({
        success: true,
        data: {
          user_id: updatedUser.user_id,
          email: updatedUser.email,
          username: updatedUser.username,
          role: updatedUser.role,
        },
      });
    } catch (err) {
      if (err.message === "Permissão negada") {
        return res.status(403).json({
          success: false,
          error: "Permissão negada para atualizar este usuário",
        });
      }
      console.error(
        `Erro ao atualizar usuário com id ${id} no banco de dados: ${err.message}`
      );
      res.status(500).json({
        success: false,
        error: "Erro ao atualizar usuário no banco de dados",
      });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;

    try {
      const authenticatedUser = req.user;
      const userById = await usersService.getUserById(id);
      if (!userById) {
        return res.status(404).json({
          success: false,
          data: "Não há nenhum usuário com o id especificado no banco de dados",
        });
      }

      if (
        authenticatedUser.role === "producer" &&
        (userById.role === "webadmin" || userById.role === "producer")
      ) {
        return res.status(403).json({
          success: false,
          error: "Permissão negada para deletar este usuário",
        });
      }
      //Producer não pode deletar webadmin nem producer.

      const deletedUser = await usersService.deleteUser(id);
      res.status(200).json({
        success: true,
        data: {
          user_id: deletedUser.user_id,
          email: deletedUser.email,
          username: deletedUser.username,
          role: deletedUser.role,
        },
      });
    } catch {
      console.error(
        `Erro ao deletar usuário com id ${id} no banco de dados: ${err.message}`
      );
      res.status(500).json({
        success: false,
        error: "Erro ao deletar usuário do banco de dados",
      });
    }
  },
};
