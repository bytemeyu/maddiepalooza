import { performanceService } from "../services/performanceService.js";

export const performanceController = {
    getAllPerformances: async(req, res) => {
        try {
            const allPerformances = await performanceService.getAllPerformances();

            if(allPerformances.length === 0) {
                res.status(404).json(
                    {
                        'success': false,
                        'data': 'Não há nenhuma performance no banco de dados'
                    }
                );
                return;
            }
            res.status(200).json(
                {
                    'success': true, 	
                    'data': allPerformances,
                }
            );
        } catch(err) {
            console.error(`Erro ao recuperar todas as performances: ${err.message}`);
            res.status(500).json(
                {
                    'success': false, 	
                    'error': 'Erro ao recuperar todas as performances',
                }
            );
        }
    },
    //curl -X GET http://localhost:3000/api/performance

    getPerformanceById: async(req, res) => {
        const { id } = req.params;

        try {
            const performanceById = await performanceService.getPerformanceById(id);
            if(performanceById.length === 0){
                res.status(404).json(
                    {
                        'sucess': false,
                        'data': 'Não há nenhuma performance com o id especificado no banco de dados'
                    }
                );
                return;
            }
            res.status(200).json(
                {
                    'success': true,
                    'data': performanceById,
                }
            );
        } catch(err) {
            console.error(`Erro ao recuperar performance com id ${id}: ${err.message}`);
            res.status(500).json(
                {
                    'success': false,
                    'error': 'Erro ao recuperar performance a partir de id',
                }
            );
        }
    },
    //curl -X GET http://localhost:3000/api/performance/1

    createPerformance: async(req, res) => {
        const { artist_id, stage_id, start_time, end_time, date } = req.body;

        try {
            const createdPerformance = await performanceService.createPerformance(artist_id, stage_id, start_time, end_time, date);
            res.status(200).json(
                {
                    'sucess': true,
                    'data': createdPerformance,
                }
            );
        } catch(err) {
            console.error(`Erro ao criar nova performance no banco de dados: ${err.message}`);
            res.status(500).json(
                {
                    'success': false,
                    'error': 'Erro ao criar nova performance no banco de dados',
                }
            );
        }
    },
    //curl -X POST http://localhost:3000/api/performance \
    //-H "Content-Type: application/json" \
    //-d '{
    //"artist_id": "1",
    //"stage_id": "1",
    //"start_time": "2025-05-15T19:00:00+00:00",
    //"end_time": "2025-05-15T20:30:00+00:00",
    //"date": "2025-05-15"
    //}'

    updatePerformance: async(req, res) => {
        const { id } = req.params;

        try {
            const outdatedPerformance = await performanceService.getPerformanceById(id);
            if(outdatedPerformance.length === 0 || !outdatedPerformance[0]) {
                res.status(404).json(
                    {
                        'sucess': false,
                        'data': 'Não há nenhuma performance com o id especificado no banco de dados'
                    }
                );
                return;
            }

            const { artist_id } = req.body;
            const artist_idToUse = artist_id || outdatedPerformance[0].artist_id;
            const { stage_id } = req.body;
            const stage_idToUse = stage_id || outdatedPerformance[0].stage_id;
            const { start_time } = req.body;
            const start_timeToUse = start_time || outdatedPerformance[0].start_time;
            const { end_time } = req.body;
            const end_timeToUse = end_time || outdatedPerformance[0].end_time;
            const { date } = req.body;
            const dateToUse = date || outdatedPerformance[0].date;

            const updatedPerformance = await performanceService.updatePerformance(id, artist_idToUse, stage_idToUse, start_timeToUse, end_timeToUse, dateToUse);
            res.status(200).json(
                {
                    'success': true,
                    'data': updatedPerformance,
                }
            );
        } catch(err) {
            console.error(`Erro ao atualizar performance com id ${id} no banco de dados: ${err.message}`);
            res.status(500).json(
                {
                    'success': false,
                    'error': 'Erro ao atualizar performance no banco de dados',
                }
            );
        }
    },
    //curl -X PUT http://localhost:3000/api/performance/1 \
    //-H "Content-Type: application/json" \
    //-d '{
    //"start_time": "2025-05-15T19:30:00+00:00",
    //"end_time": "2025-05-15T21:00:00+00:00"
    //}'

    deletePerformance: async(req, res) => {
        const { id } = req.params;

        try {
            const performanceById = await performanceService.getPerformanceById(id);
            if(performanceById.length === 0 || !performanceById[0]) {
                res.status(404).json(
                    {
                        'sucess': false,
                        'data': 'Não há nenhuma performance com o id especificado no banco de dados'
                    }
                );
                return;
            }

            const deletedPerformance = await performanceService.deletePerformance(id);
            res.status(200).json(
                {
                    'success': true,
                    'data': deletedPerformance,
                }
            );
        } catch {
            console.error(`Erro ao deletar performance com id ${id} no banco de dados: ${err.message}`);
            res.status(500).json(
                {
                    'success': false,
                    'error': 'Erro ao deletar performance do banco de dados',
                }
            );
        }
    }
    //curl -X DELETE http://localhost:3000/api/performance/2
};