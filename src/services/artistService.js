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
};