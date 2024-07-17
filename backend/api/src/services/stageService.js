import { stageRepository } from '../repositories/stageRepository.js';

export const stageService = {
    getAllStages: async() => {
        try {
            return await stageRepository.getAllStages();
        } catch(err) {
            console.error(`Erro ao recuperar todos os palcos: ${err.message}`);
            throw err;
        }
    },

    getStageById: async(id) => {
        try {
            return await stageRepository.getStageById(id);
        } catch(err) {
            console.error(`Erro ao recuperar palco com id ${id}: ${err.message}`);
            throw err;
        }
    },

    createStage: async(name, location, capacity) => {
        try {
            return await stageRepository.createStage(name, location, capacity);
        } catch(err) {
            console.error(`Erro ao criar novo palco no banco de dados: ${err.message}`);
            throw err;
        }
    },

    updateStage: async(id, name, location, capacity) => {
        try {
            return await stageRepository.updateStage(id, name, location, capacity);
        } catch(err) {
            console.error(`Erro ao atualizar palco com id ${id} no banco de dados: ${err.message}`);
            throw err;
        }
    },

    deleteStage: async(id) => {
        try {
            return await stageRepository.deleteStage(id);
        } catch(err) {
            console.error(`Erro ao deletar palco com id ${id} no banco de dados: ${err.message}`);
            throw err;
        }
    },

    existenceOfTheSameStageName: async(name, current_stage_id = null) => {
        try {
            return await stageRepository.existenceOfTheSameStageName(name, current_stage_id);
        } catch(err) {
            console.error(`Erro ao verificar a existência de palco com mesmo nome no banco de dados: ${err.message}`);
            throw err;
        }
    },

    existenceOfTheSameStageLocation: async(location, current_stage_id = null) => {
        try {
            return await stageRepository.existenceOfTheSameStageLocation(location, current_stage_id);
        } catch(err) {
            console.error(`Erro ao verificar a existência de mesma localizaçao de palco no banco de dados: ${err.message}`);
            throw err;
        }
    }
};