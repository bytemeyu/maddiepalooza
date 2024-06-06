import { stageService } from "../services/stageService.js";

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
    //curl -X GET http://localhost:3000/api/stage

    getStageById: async(req, res) => {
        const { id } = req.params;

        try {
            const stageById = await stageService.getStageById(id);
            if(stageById.length === 0){
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
    //curl -X GET http://localhost:3000/api/stage/1

    createStage: async(req, res) => {
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
    //curl -X POST http://localhost:3000/api/stage \
    //-H "Content-Type: application/json" \
    //-d '{
    //"name": "I have no shame",
    //"location": "Michigan",
    //"capacity": "750"
    //}'

    updateStage: async(req, res) => {
        const { id } = req.params;

        try {
            const outdatedStage = await stageService.getStageById(id);
            if(outdatedStage.length === 0 || !outdatedStage[0]) {
                res.status(404).json(
                    {
                        'success': false,
                        'data': 'Não há nenhum palco com o id especificado no banco de dados'
                    }
                );
                return;
            }

            const { name } = req.body;
            const nameToUse = name || outdatedStage[0].name;
            const { location } = req.body;
            const locationToUse = location || outdatedStage[0].location;
            const { capacity } = req.body;
            const capacityToUse = capacity || outdatedStage[0].capacity;
            
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
    //curl -X PUT http://localhost:3000/api/stage/1 \
    //-H "Content-Type: application/json" \
    //-d '{
    //"location": "Michigan/EUA",
    //"capacity": "650"
    //}'

    deleteStage: async(req, res) => {
        const { id } = req.params;

        try {
            const stageById = await stageService.getStageById(id);
            if(stageById.length === 0 || !stageById[0]) {
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
    //curl -X DELETE http://localhost:3000/api/stage/2
};