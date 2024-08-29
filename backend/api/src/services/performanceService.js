import { performanceRepository } from "../repositories/performanceRepository.js";

export const performanceService = {
  getAllPerformances: async () => {
    try {
      return await performanceRepository.getAllPerformances();
    } catch (err) {
      console.error(`Erro ao recuperar todas as performances: ${err.message}`);
      throw err;
    }
  },

  getPerformanceById: async (id) => {
    try {
      return await performanceRepository.getPerformanceById(id);
    } catch (err) {
      console.error(
        `Erro ao recuperar performance com id ${id}: ${err.message}`
      );
      throw err;
    }
  },

  createPerformance: async (
    artist_id,
    stage_id,
    start_time,
    end_time,
    date
  ) => {
    try {
      const artistUnavailable =
        await performanceRepository.artistUnavailability(
          artist_id,
          start_time,
          end_time,
          date
        );
      if (artistUnavailable) {
        throw new Error(
          "Este artista já está agendado para outra performance no mesmo horário"
        );
      }

      const stageUnavailable = await performanceRepository.stageUnavailability(
        stage_id,
        start_time,
        end_time,
        date
      );
      if (stageUnavailable) {
        throw new Error(
          "Já existe uma performance agendada neste palco para o horário especificado"
        );
      }

      return await performanceRepository.createPerformance(
        artist_id,
        stage_id,
        start_time,
        end_time,
        date
      );
    } catch (err) {
      console.error(
        `Erro ao criar nova performance no banco de dados: ${err.message}`
      );
      throw err;
    }
  },

  updatePerformance: async (
    id,
    artist_id,
    stage_id,
    start_time,
    end_time,
    date
  ) => {
    try {
      const artistUnavailable =
        await performanceRepository.artistUnavailability(
          artist_id,
          start_time,
          end_time,
          date,
          id
        );
      if (artistUnavailable) {
        throw new Error(
          "Este artista já está agendado para outra performance no mesmo horário"
        );
      }

      const stageUnavailable = await performanceRepository.stageUnavailability(
        stage_id,
        start_time,
        end_time,
        date,
        id
      );
      if (stageUnavailable) {
        throw new Error(
          "Já existe uma performance agendada neste palco para o horário especificado"
        );
      }

      return await performanceRepository.updatePerformance(
        id,
        artist_id,
        stage_id,
        start_time,
        end_time,
        date
      );
    } catch (err) {
      console.error(
        `Erro ao atualizar performance com id ${id} no banco de dados: ${err.message}`
      );
      throw err;
    }
  },

  deletePerformance: async (id) => {
    try {
      return await performanceRepository.deletePerformance(id);
    } catch (err) {
      console.error(
        `Erro ao deletar performance com id ${id} no banco de dados: ${err.message}`
      );
      throw err;
    }
  },
};
