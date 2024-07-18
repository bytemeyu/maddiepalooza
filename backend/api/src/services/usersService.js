import { usersRepository } from "../repositories/usersRepository.js";

export const usersService = {
    getAllUsers: async() => {
        try {
            return await usersRepository.getAllUsers();
        } catch(err) {
            console.error(`Erro ao recuperar todos os usuários: ${err.message}`);
            throw err;
        }
    },

    getUserById: async(id) => {
        try {
            return await usersRepository.getUserById(id);
        } catch(err) {
            console.error(`Erro ao recuperar usuário com id ${id}: ${err.message}`);
            throw err;
        }
    },

    getUserByUsername: async(username) => {
        try {
            return await usersRepository.getUserByUsername(username);
        } catch(err) {
            console.error(`Erro ao recuperar usuário com username ${username}: ${err.message}`);
        }
    },

    createUser: async(email, username, password_hash, role) => {
        try {
            return await usersRepository.createUser(email, username, password_hash, role);
        } catch(err) {
            console.error(`Erro ao criar novo usuário no banco de dados: ${err.message}`);
            throw err;
        }
    },

    updateUser: async(id, email, username, password_hash, role) => {
        try {
            return await usersRepository.updateUser(id, email, username, password_hash, role);
        } catch(err) {
            console.error(`Erro ao atualizar usuário com id ${id} no banco de dados: ${err.message}`);
            throw err;
        }
    },

    deleteUser: async(id) => {
        try {
            return await usersRepository.deleteUser(id);
        } catch(err) {
            console.error(`Erro ao deletar usuário com id ${id} no banco de dados: ${err.message}`);
            throw err;
        }
    },

    getUserByEmail: async(email) => {
        try {
            return await usersRepository.getUserByEmail(email);
        } catch(err) {
            console.error(`Erro ao recuperar usuário com e-mail ${email}: ${err.message}`);
        }
    }
};