import { query } from '../config/database.js';

export const artistRepository = {
    getAllArtists: async() => {
        const text = 'SELECT * FROM artist';
        try {
            const { rows } = await query(text);
            console.log(`tipo de rows: ${typeof rows}`);
            console.log(`rows é um objeto do tipo array? ${Array.isArray(rows)}`);
            //é comum que as funções de consulta de banco de dados retornem um array de resultados (em todos casos, ou seja, mesmo se apenas um objeto for esperado ou retornado pela consulta)
            return rows;
        } catch(err) {
            console.error(`Erro ao recuperar todos os artistas: ${err.message}`);
            throw err;
        }
    },

    getArtistById: async(id) => {
        const text = 'SELECT * FROM artist WHERE artist_id = $1';
        const params = [id];
        console.log(`parâmetro que vai pra query: ${params}`);
        try {
            const { rows } = await query(text, params);
            return rows;
        } catch(err) {
            console.error(`Erro ao recuperar artista com id ${id}: ${err.message}`);
            throw err;
        }
    },
};