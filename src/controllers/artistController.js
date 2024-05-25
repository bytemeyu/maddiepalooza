import { artistService } from '../services/artistService.js';

export const artistController = {
    getAllArtists: async(req, res) => {
        try {
            const allArtists = await artistService.getAllArtists();

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
    //curl -X GET http://localhost:3000/api/artist

    getArtistById: async(req, res) => {
        const { id } = req.params;

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
    //curl -X GET http://localhost:3000/api/artist/1
    
    createArtist: async(req, res) => {
        const { name, biography, photo_url } = req.body;

        try {
            const createdArtist = await artistService.createArtist(name, biography, photo_url);
            res.status(200).json(
                {
                    'sucess': true,
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
    //curl -X POST http://localhost:3000/api/artist \
    //-H "Content-Type: application/json" \
    //-d '{
    //"name": "Madonna",
    //"biography": "Biografia da Madonna",
    //"photo_url": "http://exemplo.com/foto.jpg"
    //}'
};