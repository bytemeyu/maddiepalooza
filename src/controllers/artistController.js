import { artistService } from '../services/artistService.js';

export const artistController = {
    getAllArtists: async(req, res) => {
        try {
            const allArtists = await artistService.getAllArtists();
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
};