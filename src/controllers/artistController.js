import { artistService } from '../services/artistService.js';

export const artistController = {
    getAllArtists: async(req, res) => {
        try {
            const allArtists = await artistService.getAllArtists();

            if(allArtists.length === 0) {
                res.status(404).json(
                    {
                        'success': false,
                        'data': 'Não há nenhum artista no banco de dados'
                    }
                );
                return;
            }
            
            res.status(200).json(
                {
                    'success': true, 	
                    'data': allArtists,
                }
            );
        } catch(err) {
            console.error(`Erro ao recuperar todos os artistas: ${err.message}`);
            res.status(500).json(
                {
                    'success': false, 	
                    'error': 'Erro ao recuperar todos os artistas',
                }
            );
        }
    },

    getArtistById: async(req, res) => {
        const { id } = req.params;

        try {
            const artistById = await artistService.getArtistById(id);
            if(artistById.length === 0){
                res.status(404).json(
                    {
                        'success': false,
                        'data': 'Não há nenhum artista com o id especificado no banco de dados'
                    }
                );
                return;
            }

            res.status(200).json(
                {
                    'success': true,
                    'data': artistById,
                }
            );
        } catch(err) {
            console.error(`Erro ao recuperar artista com id ${id}: ${err.message}`);
            res.status(500).json(
                {
                    'success': false,
                    'error': 'Erro ao recuperar artista a partir de id',
                }
            );
        }
    },
    
    createArtist: async(req, res) => {
        const { name, biography, photo_url } = req.body;

        try {
            const createdArtist = await artistService.createArtist(name, biography, photo_url);
            res.status(200).json(
                {
                    'success': true,
                    'data': createdArtist,
                }
            );
        } catch(err) {
            console.error(`Erro ao criar novo artista no banco de dados: ${err.message}`);
            res.status(500).json(
                {
                    'success': false,
                    'error': 'Erro ao criar novo artista no banco de dados',
                }
            );
        }
    },

    updateArtist: async(req, res) => {
        const { id } = req.params;

        try {
            const outdatedArtist = await artistService.getArtistById(id);
            if(outdatedArtist.length === 0 || !outdatedArtist[0]) {
                res.status(404).json(
                    {
                        'success': false,
                        'data': 'Não há nenhum artista com o id especificado no banco de dados'
                    }
                );
                return;
            }

            const { name } = req.body;
            const nameToUse = name || outdatedArtist[0].name;
            const { biography } = req.body;
            const biographyToUse = biography || outdatedArtist[0].biography;
            const { photo_url } = req.body;
            const photo_urlToUse = photo_url || outdatedArtist[0].photo_url;
            
            const updatedArtist = await artistService.updateArtist(id, nameToUse, biographyToUse, photo_urlToUse);
            res.status(200).json(
                {
                    'success': true,
                    'data': updatedArtist,
                }
            );
        } catch(err) {
            console.error(`Erro ao atualizar artista com id ${id} no banco de dados: ${err.message}`);
            res.status(500).json(
                {
                    'success': false,
                    'error': 'Erro ao atualizar artista no banco de dados',
                }
            );
        }
    },

    deleteArtist: async(req, res) => {
        const { id } = req.params;

        try {
            const artistById = await artistService.getArtistById(id);
            if(artistById.length === 0 || !artistById[0]) {
                res.status(404).json(
                    {
                        'success': false,
                        'data': 'Não há nenhum artista com o id especificado no banco de dados'
                    }
                );
                return;
            }

            const deletedArtist = await artistService.deleteArtist(id);
            res.status(200).json(
                {
                    'success': true,
                    'data': deletedArtist,
                }
            );
        } catch(err) {
            console.error(`Erro ao deletar artista com id ${id} no banco de dados: ${err.message}`);
            res.status(500).json(
                {
                    'success': false,
                    'error': 'Erro ao deletar artista do banco de dados',
                }
            );
        }
    }
};