import { query } from '../config/database.js';

export const artistRepository = {
    getAllArtists: async() => {
        const text = 'SELECT * FROM artist';
        try {
            const { rows } = await query(text);
            //É comum que as funções de consulta de banco de dados retornem um array de resultados (em todos casos, ou seja, mesmo se apenas um objeto for esperado ou retornado pela consulta).
            return rows;
        } catch(err) {
            console.error(`Erro ao recuperar todos os artistas: ${err.message}`);
            throw err;
        }
    },

    getArtistById: async(id) => {
        const text = 'SELECT * FROM artist WHERE artist_id = $1';
        const params = [id];

        try {
            const { rows } = await query(text, params);
            return rows;
        } catch(err) {
            console.error(`Erro ao recuperar artista com id ${id}: ${err.message}`);
            throw err;
        }
    },

    createArtist: async(name, biography, photo_url) => {
        const text = 'INSERT INTO artist (name, biography, photo_url) VALUES ($1, $2, $3) RETURNING *;';
        const params = [name, biography, photo_url];

        try {
            const { rows } = await query(text, params);
            return rows;
        } catch(err) {
            console.error(`Erro ao criar novo artista no banco de dados: ${err.message}`);
            throw err;
        }
    }
};