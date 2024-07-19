import { stageService } from "../services/stageService.js";
import { validationResult } from "express-validator";

export const stageController = {
    getAllStages: async(req, res) => {
        try {
            const allStages = await stageService.getAllStages();

            if(allStages.length === 0) {
                res.status(404).json(
                    {
                        'success': false,
                        'data': 'Não há nenhum palco no banco de dados'
                    }
                );
                return;
            }

            res.status(200).json(
                {
                    'success': true, 	
                    'data': allStages,
                }
            );
        } catch(err) {
            console.error(`Erro ao recuperar todos os palcos: ${err.message}`);
            res.status(500).json(
                {
                    'success': false, 	
                    'error': 'Erro ao recuperar todos os palcos',
                }
            );
        }
    },

    getStageById: async(req, res) => {
        const { id } = req.params;

        try {
            const stageById = await stageService.getStageById(id);
            if(!stageById){
                res.status(404).json(
                    {
                        'success': false,
                        'data': 'Não há nenhum palco com o id especificado no banco de dados'
                    }
                );
                return;
            }
            res.status(200).json(
                {
                    'success': true,
                    'data': stageById,
                }
            );
        } catch(err) {
            console.error(`Erro ao recuperar palco com id ${id}: ${err.message}`);
            res.status(500).json(
                {
                    'success': false,
                    'error': 'Erro ao recuperar palco a partir de id',
                }
            );
        }
    },

    createStage: async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, location, capacity } = req.body;

        try {
            const createdStage = await stageService.createStage(name, location, capacity);
            res.status(200).json(
                {
                    'success': true,
                    'data': createdStage,
                }
            );
        } catch(err) {
            console.error(`Erro ao criar novo palco no banco de dados: ${err.message}`);
            res.status(500).json(
                {
                    'success': false,
                    'error': 'Erro ao criar novo palco no banco de dados',
                }
            );
        }
    },

    updateStage: async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { id } = req.params;

        try {
            const outdatedStage = await stageService.getStageById(id);
            if(!outdatedStage) {
                res.status(404).json(
                    {
                        'success': false,
                        'data': 'Não há nenhum palco com o id especificado no banco de dados'
                    }
                );
                return;
            }

            const { name } = req.body;
            const nameToUse = name || outdatedStage.name;
            const { location } = req.body;
            const locationToUse = location || outdatedStage.location;
            const { capacity } = req.body;
            const capacityToUse = capacity || outdatedStage.capacity;
            
            const updatedStage = await stageService.updateStage(id, nameToUse, locationToUse, capacityToUse);
            res.status(200).json(
                {
                    'success': true,
                    'data': updatedStage,
                }
            );
        } catch(err) {
            console.error(`Erro ao atualizar palco com id ${id} no banco de dados: ${err.message}`);
            res.status(500).json(
                {
                    'success': false,
                    'error': 'Erro ao atualizar palco no banco de dados',
                }
            );
        }
    },

    deleteStage: async(req, res) => {
        const { id } = req.params;

        try {
            const stageById = await stageService.getStageById(id);
            if(!stageById) {
                res.status(404).json(
                    {
                        'success': false,
                        'data': 'Não há nenhum palco com o id especificado no banco de dados'
                    }
                );
                return;
            }

            const deletedStage = await stageService.deleteStage(id);
            res.status(200).json(
                {
                    'success': true,
                    'data': deletedStage,
                }
            );
        } catch {
            console.error(`Erro ao deletar palco com id ${id} no banco de dados: ${err.message}`);
            res.status(500).json(
                {
                    'success': false,
                    'error': 'Erro ao deletar palco do banco de dados',
                }
            );
        }
    }
};