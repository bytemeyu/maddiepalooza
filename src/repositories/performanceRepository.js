import { query } from "../config/database.js";

export const performanceRepository = {
    getAllPerformances: async() => {
        const text = 'SELECT * FROM performance';
        try {
            const { rows } = await query(text);
            return rows;
        } catch(err) {
            console.error(`Erro ao recuperar todos as performances: ${err.message}`);
            throw err;
        }
    },

    getPerformanceById: async(id) => {
        const text = 'SELECT * FROM performance WHERE performance_id = $1';
        const params = [id];

        try {
            const { rows } = await query(text, params);
            return rows;
        } catch(err) {
            console.error(`Erro ao recuperar performance com id ${id}: ${err.message}`);
            throw err;
        }
    },

    createPerformance: async(artist_id, stage_id, start_time, end_time, date) => {
        const text = 'INSERT INTO performance (artist_id, stage_id, start_time, end_time, date) VALUES ($1, $2, $3, $4, $5) RETURNING *;';
        const params = [artist_id, stage_id, start_time, end_time, date];

        try {
            const { rows } = await query(text, params);
            return rows;
        } catch(err) {
            console.error(`Erro ao criar nova performance no banco de dados: ${err.message}`);
            throw err;
        }
    },

    updatePerformance: async(id, artist_id, stage_id, start_time, end_time, date) => {
        const text = 'UPDATE performance SET artist_id = $1, stage_id = $2, start_time = $3, end_time = $4, date = $5 WHERE performance_id = $6 RETURNING *';
        const params = [artist_id, stage_id, start_time, end_time, date, id];

        try {
            const { rows } = await query(text, params);
            return rows;
        } catch(err) {
            console.error(`Erro ao atualizar performance com id ${id} no banco de dados: ${err.message}`);
            throw err;
        }
    },

    deletePerformance: async(id) => {
        const text = 'DELETE FROM performance WHERE performance_id = $1 RETURNING *';
        const params = [id];

        try {
            const { rows } = await query(text, params);
            return rows;
        } catch(err) {
            console.error(`Erro ao deletar performance com id ${id} no banco de dados: ${err.message}`);
            throw err;
        }
    }
};