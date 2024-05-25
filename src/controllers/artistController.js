import { artistService } from '../services/artistService.js';

export const artistController = {
    getAllArtists: async(req, res) => {
        try {
            const allArtists = await artistService.getAllArtists();
            console.log(`tipo de allArtists: ${typeof allArtists}`);
            console.log(`allArtists é um objeto do tipo array? ${Array.isArray(allArtists)}`);
            if(allArtists.length === 0) {
                res.status(200).json(
                    {
                        'success': true,
                        'data': 'Não há nenhum artista no banco de dados'
                    }
                );
            } else {
                res.status(200).json(
                    {
                        'success': true, 	
                        'data': allArtists,
                    }
                );
            }
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
        console.log(`id extraído da requisição: ${id}`);
        try {
            const artistById = await artistService.getArtistById(id);
            if(artistById.length === 0){
                res.status(200).json(
                    {
                        'sucess': true,
                        'data': 'Não há nenhum artista com o id especificado no banco de dados'
                    }
                );
            } else {
                res.status(200).json(
                    {
                        'success': true,
                        'data': artistById,
                    }
                );
            }
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
};