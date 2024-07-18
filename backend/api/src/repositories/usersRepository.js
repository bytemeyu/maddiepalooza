import { query } from '../config/database.js';

export const usersRepository = {
    getAllUsers: async() => {
        const text = 'SELECT * FROM users';
        try {
            const { rows } = await query(text);
            return rows;
        } catch(err) {
            console.error(`Erro ao recuperar todos os usuários: ${err.message}`);
            throw err;
        }
    },

    getUserById: async(id) => {
        const text = 'SELECT * FROM users WHERE user_id = $1';
        const params = [id];

        try {
            const { rows } = await query(text, params);
            return rows[0];
        } catch(err) {
            console.error(`Erro ao recuperar usuário com id ${id}: ${err.message}`);
            throw err;
        }
    },

    getUserByUsername: async(username) => {
        const text = 'SELECT * FROM users WHERE username = $1';
        const params = [username];

        try {
            const { rows } = await query(text, params);
            return rows[0];
        } catch(err) {
            console.error(`Erro ao recuperar usuário com username ${username}: ${err.message}`);
            throw err;
        }
    },

    createUser: async(email, username, password_hash, role) => {
        const text = 'INSERT INTO users (email, username, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *;';
        const params = [email, username, password_hash, role];

        try {
            const { rows } = await query(text, params);
            return rows[0];
        } catch(err) {
            console.error(`Erro ao criar novo usuário no banco de dados: ${err.message}`);
            throw err;
        }
    },

    updateUser: async(id, email, username, password_hash, role) => {
        const text = 'UPDATE users SET email = $1, username = $2, password_hash = $3, role = $4 WHERE user_id = $5 RETURNING *';
        const params = [email, username, password_hash, role, id];

        try {
            const { rows } = await query(text, params);
            return rows[0];
        } catch(err) {
            console.error(`Erro ao atualizar usuário com id ${id} no banco de dados: ${err.message}`);
            throw err;
        }
    },

    deleteUser: async(id) => {
        const text = 'DELETE FROM users WHERE user_id = $1 RETURNING *';
        const params = [id];

        try {
            const { rows } = await query(text, params);
            return rows[0];
        } catch(err) {
            console.error(`Erro ao deletar usuário com id ${id} no banco de dados: ${err.message}`);
            throw err;
        }
    },

    getUserByEmail: async(email) => {
        const text = 'SELECT * FROM users WHERE email = $1';
        const params = [email];

        try {
            const { rows } = await query(text, params);
            return rows[0];
        } catch(err) {
            console.error(`Erro ao recuperar usuário com e-mail ${email}: ${err.message}`);
            throw err;
        }
    }
};