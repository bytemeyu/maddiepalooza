import { artistService } from '../services/artistService.js';
import { validationResult } from 'express-validator';

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
            if(!artistById){
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
        const errors = validationResult(req);
        //validationResult(req): Esta função é parte do pacote express-validator. Ela é utilizada para coletar os resultados das validações que foram aplicadas aos dados da requisição (req). Essa função pega o objeto da requisição (req) como argumento e retorna um objeto que pode ser usado para verificar se houve erros de validação.
        if (!errors.isEmpty()) {
            //O objeto retornado por validationResult() contém vários métodos úteis, mas o mais comum é o método isEmpty(). Este método retorna true se não houver erros de validação e false caso contrário. Como está sendo usada uma negação (!), se errors não estiver vazio, ou seja, contiver erros, ele retorna a resposta abaixo.
            return res.status(400).json({ errors: errors.array() });
        }
        
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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;

        try {
            const outdatedArtist = await artistService.getArtistById(id);
            if(!outdatedArtist) {
                res.status(404).json(
                    {
                        'success': false,
                        'data': 'Não há nenhum artista com o id especificado no banco de dados'
                    }
                );
                return;
            }

            const { name } = req.body;
            const nameToUse = name || outdatedArtist.name;
            const { biography } = req.body;
            const biographyToUse = biography || outdatedArtist.biography;
            const { photo_url } = req.body;
            const photo_urlToUse = photo_url || outdatedArtist.photo_url;
            
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
            if(!artistById) {
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