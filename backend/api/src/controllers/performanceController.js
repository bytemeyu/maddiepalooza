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

    getPerformanceById: async(req, res) => {
        const { id } = req.params;

        try {
            const performanceById = await performanceService.getPerformanceById(id);
            if(!performanceById){
                res.status(404).json(
                    {
                        'success': false,
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

    createPerformance: async(req, res) => {
        const { artist_id, stage_id, start_time, end_time, date } = req.body;

        try {
            const checkArtistUnavailability = await performanceService.artistUnavailability(artist_id, start_time, end_time, date);
            if(checkArtistUnavailability) {
                return res.status(409).json(
                    {
                        'success': false,
                        'error': 'Este artista já está agendado para outra performance no mesmo horário'
                    }
                );
            }

            const checkStageUnavailability = await performanceService.stageUnavailability(stage_id, start_time, end_time, date);
            if(checkStageUnavailability) {
                return res.status(409).json(
                    {
                        'success': false,
                        'error': 'Já existe uma performance agendada neste palco para o horário especificado'
                    }
                );
            }

            const createdPerformance = await performanceService.createPerformance(artist_id, stage_id, start_time, end_time, date);
            res.status(200).json(
                {
                    'success': true,
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

    updatePerformance: async(req, res) => {
        const { id } = req.params;

        try {
            const outdatedPerformance = await performanceService.getPerformanceById(id);
            if(!outdatedPerformance) {
                res.status(404).json(
                    {
                        'success': false,
                        'data': 'Não há nenhuma performance com o id especificado no banco de dados'
                    }
                );
                return;
            }

            const { artist_id } = req.body;
            const artist_idToUse = artist_id || outdatedPerformance.artist_id;
            const { stage_id } = req.body;
            const stage_idToUse = stage_id || outdatedPerformance.stage_id;
            const { start_time } = req.body;
            const start_timeToUse = start_time || outdatedPerformance.start_time;
            const { end_time } = req.body;
            const end_timeToUse = end_time || outdatedPerformance.end_time;
            const { date } = req.body;
            const dateToUse = date || outdatedPerformance.date;

            const checkArtistUnavailability = await performanceService.artistUnavailability(artist_idToUse, start_timeToUse, end_timeToUse, dateToUse, id);
            if(checkArtistUnavailability) {
                return res.status(409).json(
                    {
                        'success': false,
                        'error': 'Este artista já está agendado para outra performance no mesmo horário'
                    }
                );
            }

            const checkStageUnavailability = await performanceService.stageUnavailability(stage_idToUse, start_timeToUse, end_timeToUse, dateToUse, id);
            if(checkStageUnavailability) {
                return res.status(409).json(
                    {
                        'success': false,
                        'error': 'Já existe uma performance agendada neste palco para o horário especificado'
                    }
                );
            }

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

    deletePerformance: async(req, res) => {
        const { id } = req.params;

        try {
            const performanceById = await performanceService.getPerformanceById(id);
            if(!performanceById) {
                res.status(404).json(
                    {
                        'success': false,
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
};