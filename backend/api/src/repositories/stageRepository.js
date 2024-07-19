import { query } from '../config/database.js';

export const stageRepository = {
    getAllStages: async() => {
        const text = 'SELECT * FROM stage';
        try {
            const { rows } = await query(text);
            return rows;
        } catch(err) {
            console.error(`Erro ao recuperar todos os palcos: ${err.message}`);
            throw err;
        }
    },

    getStageById: async(id) => {
        const text = 'SELECT * FROM stage WHERE stage_id = $1';
        const params = [id];

        try {
            const { rows } = await query(text, params);
            return rows[0];
        } catch(err) {
            console.error(`Erro ao recuperar palco com id ${id}: ${err.message}`);
            throw err;
        }
    },

    createStage: async(name, location, capacity) => {
        const text = 'INSERT INTO stage (name, location, capacity) VALUES ($1, $2, $3) RETURNING *;';
        const params = [name, location, capacity];

        try {
            const { rows } = await query(text, params);
            return rows[0];
        } catch(err) {
            console.error(`Erro ao criar novo palco no banco de dados: ${err.message}`);
            throw err;
        }
    },

    updateStage: async(id, name, location, capacity) => {
        const text = 'UPDATE stage SET name = $1, location = $2, capacity = $3 WHERE stage_id = $4 RETURNING *';
        const params = [name, location, capacity, id];

        try {
            const { rows } = await query(text, params);
            return rows[0];
        } catch(err) {
            console.error(`Erro ao atualizar palco com id ${id} no banco de dados: ${err.message}`);
            throw err;
        }
    },

    deleteStage: async(id) => {
        const text = 'DELETE FROM stage WHERE stage_id = $1 RETURNING *';
        const params = [id];

        try {
            const { rows } = await query(text, params);
            return rows[0];
        } catch(err) {
            console.error(`Erro ao deletar palco com id ${id} no banco de dados: ${err.message}`);
            throw err;
        }
    },

    existenceOfTheSameStageName: async(name, current_stage_id = null) => {
        const text = 'SELECT EXISTS (SELECT 1 FROM stage WHERE name = $1 AND ($2::int IS NULL OR stage_id != $2)) AS name_exists;';
    
        const params = [name, current_stage_id];

        try {
            const res = await query(text, params);
            return res.rows[0].name_exists;
        } catch(err) {
            console.error(`Erro ao verificar a existência de palco com mesmo nome no banco de dados: ${err.message}`);
            throw err;
        }
    },

    existenceOfTheSameStageLocation: async(location, current_stage_id = null) => {
        const text = 'SELECT EXISTS (SELECT 1 FROM stage WHERE location = $1 AND ($2::int IS NULL OR stage_id != $2)) AS name_exists;';
    
        const params = [location, current_stage_id];

        try {
            const res = await query(text, params);
            return res.rows[0].name_exists;
        } catch(err) {
            console.error(`Erro ao verificar a existência de mesma localizaçao de palco no banco de dados: ${err.message}`);
            throw err;
        }
    },
};