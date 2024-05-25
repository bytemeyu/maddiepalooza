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

    createArtist: async(name, biography, photo_url) => {
        try {
            return await artistRepository.createArtist(name, biography, photo_url);
        } catch(err) {
            console.error(`Erro ao criar novo artista no banco de dados: ${err.message}`);
            throw err;
        }  
    },

    updateArtist: async(id, name, biography, photo_url) => {
        try {
            return await artistRepository.updateArtist(id, name, biography, photo_url);
        } catch(err) {
            console.error(`Erro ao atualizar artista com id ${id} no banco de dados: ${err.message}`);
            throw err;
        }
    },

    deleteArtist: async(id) => {
        try {
            return await artistRepository.deleteArtist(id);
        } catch(err) {
            console.error(`Erro ao deletar artista com id ${id} no banco de dados: ${err.message}`);
            throw err;
        }
    }
};