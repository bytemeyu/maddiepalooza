import { artistRepository } from '../repositories/artistRepository.js';

export const artistService = {
    getAllArtists: async() => {
        try {
            return await artistRepository.getAllArtists();
        } catch(err) {
            console.error(`Erro ao recuperar todos os artistas: ${err.message}`);
            throw err;
        }
    },

    getArtistById: async(id) => {
        try {
            return await artistRepository.getArtistById(id);
        } catch(err) {
            console.error(`Erro ao recuperar artista com id ${id}: ${err.message}`);
            throw err;
        }
    },
};