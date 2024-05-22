import { query } from '../config/database.js';

export const artistRepository = {
    getAllArtists: async() => {
        const text = 'SELECT * FROM artists';
        try {
            const { rows } = await query(text);
            return rows;
        } catch (err) {
            console.error(`Erro ao recuperar todos os artistas: ${err.message}`);
            throw err;
        }
    },
};