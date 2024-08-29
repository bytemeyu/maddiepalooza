import { describe, test, jest, expect } from "@jest/globals";
import { performanceService } from "../../src/services/performanceService";
import { performanceRepository } from "../../src/repositories/performanceRepository";

describe("performanceService", () => {
  describe("getAllPerformances", () => {
    test("tem que retornar todos as performances ao resolver performanceRepository.getAllPerformances", async () => {
      const mockPerformances = [
        {
          performance_id: 1,
          artist_id: 1,
          stage_id: 1,
          start_time: "2024-08-30 20:00:00+00",
          end_time: "2024-08-30 21:00:00+00",
          date: "2024-08-30",
        },
        {
          performance_id: 2,
          artist_id: 2,
          stage_id: 2,
          start_time: "2024-08-30 20:00:00+00",
          end_time: "2024-08-30 21:00:00+00",
          date: "2024-08-30",
        },
      ];

      performanceRepository.getAllPerformances = jest
        .fn()
        .mockResolvedValue(mockPerformances);

      const performances = await performanceService.getAllPerformances();

      expect(performances).toEqual(mockPerformances);

      expect(performanceRepository.getAllPerformances).toHaveBeenCalledTimes(1);
    });

    test("tem que lançar um erro quando performanceRepository.getAllPerformances é rejeitado", async () => {
      const mockError = new Error("Erro ao recuperar todas as performances");

      performanceRepository.getAllPerformances = jest
        .fn()
        .mockRejectedValue(mockError);

      await expect(performanceService.getAllPerformances()).rejects.toThrow(
        "Erro ao recuperar todas as performances"
      );

      expect(performanceRepository.getAllPerformances).toHaveBeenCalledTimes(1);
    });

    test("tem que retornar um array vazio se não houver performances", async () => {
      performanceRepository.getAllPerformances = jest
        .fn()
        .mockResolvedValue([]);

      const performances = await performanceService.getAllPerformances();

      expect(performances).toEqual([]);

      expect(performanceRepository.getAllPerformances).toHaveBeenCalledTimes(1);
    });

    test("tem que garantir que as performances retornados tenham a estrutura esperada", async () => {
      const mockPerformances = [
        {
          performance_id: 1,
          artist_id: 1,
          stage_id: 1,
          start_time: "2024-08-30 20:00:00+00",
          end_time: "2024-08-30 21:00:00+00",
          date: "2024-08-30",
        },
        {
          performance_id: 2,
          artist_id: 2,
          stage_id: 2,
          start_time: "2024-08-30 20:00:00+00",
          end_time: "2024-08-30 21:00:00+00",
          date: "2024-08-30",
        },
      ];

      performanceRepository.getAllPerformances = jest
        .fn()
        .mockResolvedValue(mockPerformances);

      const performances = await performanceService.getAllPerformances();

      expect(performances).toBeInstanceOf(Array);
      expect(performances[0]).toHaveProperty("performance_id");
      expect(performances[0]).toHaveProperty("artist_id");
      expect(performances[0]).toHaveProperty("stage_id");
      expect(performances[0]).toHaveProperty("start_time");
      expect(performances[0]).toHaveProperty("end_time");
      expect(performances[0]).toHaveProperty("date");
      expect(performances[1]).toHaveProperty("performance_id");
      expect(performances[1]).toHaveProperty("artist_id");
      expect(performances[1]).toHaveProperty("stage_id");
      expect(performances[1]).toHaveProperty("start_time");
      expect(performances[1]).toHaveProperty("end_time");
      expect(performances[1]).toHaveProperty("date");
    });
  });

  describe("getPerformanceById", () => {
    test("tem que retornar a performance com o id especificado (isso se o id for válido) ao resolver performanceRepository.getPerformanceById(id)", async () => {
      const mockPerformance = {
        performance_id: 1,
        artist_id: 1,
        stage_id: 1,
        start_time: "2024-08-30 20:00:00+00",
        end_time: "2024-08-30 21:00:00+00",
        date: "2024-08-30",
      };

      performanceRepository.getPerformanceById = jest
        .fn()
        .mockResolvedValue(mockPerformance);

      const performance = await performanceService.getPerformanceById(1);

      expect(performance).toEqual(mockPerformance);
      expect(performanceRepository.getPerformanceById).toHaveBeenCalledWith(1);
      expect(performanceRepository.getPerformanceById).toHaveBeenCalledTimes(1);
    });

    test("tem que garantir que a performance retornada tenha a estrutura esperada", async () => {
      const mockPerformance = {
        performance_id: 1,
        artist_id: 1,
        stage_id: 1,
        start_time: "2024-08-30 20:00:00+00",
        end_time: "2024-08-30 21:00:00+00",
        date: "2024-08-30",
      };

      performanceRepository.getPerformanceById = jest
        .fn()
        .mockResolvedValue(mockPerformance);

      const performance = await performanceService.getPerformanceById(1);

      expect(performance).toHaveProperty("performance_id");
      expect(performance).toHaveProperty("artist_id");
      expect(performance).toHaveProperty("stage_id");
      expect(performance).toHaveProperty("start_time");
      expect(performance).toHaveProperty("end_time");
      expect(performance).toHaveProperty("date");
    });

    test("tem que lançar um erro quando performanceRepository.getPerformanceById(id) é rejeitado", async () => {
      const mockError = new Error("Erro ao recuperar performance com id");

      performanceRepository.getPerformanceById = jest
        .fn()
        .mockRejectedValue(mockError);

      await expect(performanceService.getPerformanceById(1)).rejects.toThrow(
        "Erro ao recuperar performance com id"
      );

      expect(performanceRepository.getPerformanceById).toHaveBeenCalledWith(1);
      expect(performanceRepository.getPerformanceById).toHaveBeenCalledTimes(1);
    });
  });

  describe("createPerformance", () => {
    test("deve criar uma nova performance quando o artista e o palco estão disponíveis", async () => {
      const newPerformance = {
        artist_id: 1,
        stage_id: 1,
        start_time: "2024-08-30 20:00:00+00",
        end_time: "2024-08-30 21:00:00+00",
        date: "2024-08-30",
      };

      const mockCreatedPerformance = {
        performance_id: 1,
        ...newPerformance,
      };

      //mockando as funções de indisponibilidade para retornar false (disponível):
      performanceRepository.artistUnavailability = jest
        .fn()
        .mockResolvedValue(false);
      performanceRepository.stageUnavailability = jest
        .fn()
        .mockResolvedValue(false);

      //mockando a criação da performance para retornar um objeto simulado
      performanceRepository.createPerformance = jest
        .fn()
        .mockResolvedValue(mockCreatedPerformance);

      const createdPerformance = await performanceService.createPerformance(
        newPerformance.artist_id,
        newPerformance.stage_id,
        newPerformance.start_time,
        newPerformance.end_time,
        newPerformance.date
      );

      expect(createdPerformance).toEqual(mockCreatedPerformance);
      expect(performanceRepository.artistUnavailability).toHaveBeenCalledWith(
        newPerformance.artist_id,
        newPerformance.start_time,
        newPerformance.end_time,
        newPerformance.date
      );
      expect(performanceRepository.stageUnavailability).toHaveBeenCalledWith(
        newPerformance.stage_id,
        newPerformance.start_time,
        newPerformance.end_time,
        newPerformance.date
      );
      expect(performanceRepository.createPerformance).toHaveBeenCalledWith(
        newPerformance.artist_id,
        newPerformance.stage_id,
        newPerformance.start_time,
        newPerformance.end_time,
        newPerformance.date
      );
      expect(performanceRepository.createPerformance).toHaveBeenCalledTimes(1);
    });

    test("deve lançar um erro se o artista não estiver disponível", async () => {
      const newPerformance = {
        artist_id: 1,
        stage_id: 2,
        start_time: "2024-08-30 20:30:00+00",
        end_time: "2024-08-30 21:30:00+00",
        date: "2024-08-30",
      };

      performanceRepository.artistUnavailability = jest
        .fn()
        .mockResolvedValue(true);

      await expect(
        performanceService.createPerformance(
          1,
          2,
          "2024-08-30T20:30:00Z",
          "2024-08-30T22:30:00Z",
          "2024-08-30"
        )
      ).rejects.toThrow(
        "Este artista já está agendado para outra performance no mesmo horário"
      );

      expect(performanceRepository.artistUnavailability).toHaveBeenCalledWith(
        1,
        "2024-08-30T20:30:00Z",
        "2024-08-30T22:30:00Z",
        "2024-08-30"
      );

      expect(performanceRepository.artistUnavailability).toHaveBeenCalledTimes(
        1
      );

      expect(performanceRepository.stageUnavailability).not.toHaveBeenCalled();
      expect(performanceRepository.createPerformance).not.toHaveBeenCalled();
    });

    test("deve lançar um erro se o palco não estiver disponível", async () => {
      const newPerformance = {
        artist_id: 2,
        stage_id: 1,
        start_time: "2024-08-30 20:00:00+00",
        end_time: "2024-08-30 21:00:00+00",
        date: "2024-08-30",
      };

      performanceRepository.artistUnavailability = jest
        .fn()
        .mockResolvedValue(false);
      performanceRepository.stageUnavailability = jest
        .fn()
        .mockResolvedValue(true);

      await expect(
        performanceService.createPerformance(
          2,
          1,
          "2024-08-30T20:00:00Z",
          "2024-08-30T22:00:00Z",
          "2024-08-30"
        )
      ).rejects.toThrow(
        "Já existe uma performance agendada neste palco para o horário especificado"
      );

      expect(performanceRepository.artistUnavailability).toHaveBeenCalledWith(
        2,
        "2024-08-30T20:00:00Z",
        "2024-08-30T22:00:00Z",
        "2024-08-30"
      );
      expect(performanceRepository.stageUnavailability).toHaveBeenCalledWith(
        1,
        "2024-08-30T20:00:00Z",
        "2024-08-30T22:00:00Z",
        "2024-08-30"
      );

      expect(performanceRepository.artistUnavailability).toHaveBeenCalledTimes(
        1
      );
      expect(performanceRepository.stageUnavailability).toHaveBeenCalledTimes(
        1
      );
      expect(performanceRepository.createPerformance).not.toHaveBeenCalled();
    });

    test("deve lançar um erro se ocorrer um problema durante a criação da performance", async () => {
      const newPerformance = {
        artist_id: 1,
        stage_id: 1,
        start_time: "2024-08-30 20:00:00+00",
        end_time: "2024-08-30 21:00:00+00",
        date: "2024-08-30",
      };

      const mockError = new Error(
        "Erro ao criar nova performance no banco de dados"
      );

      performanceRepository.artistUnavailability = jest
        .fn()
        .mockResolvedValue(false);
      performanceRepository.stageUnavailability = jest
        .fn()
        .mockResolvedValue(false);
      performanceRepository.createPerformance = jest
        .fn()
        .mockRejectedValue(mockError);

      await expect(
        performanceService.createPerformance(
          newPerformance.artist_id,
          newPerformance.stage_id,
          newPerformance.start_time,
          newPerformance.end_time,
          newPerformance.date
        )
      ).rejects.toThrow("Erro ao criar nova performance no banco de dados");

      expect(performanceRepository.artistUnavailability).toHaveBeenCalledTimes(
        1
      );
      expect(performanceRepository.stageUnavailability).toHaveBeenCalledTimes(
        1
      );
      expect(performanceRepository.createPerformance).toHaveBeenCalledTimes(1);
    });
  });

  describe("updatePerformance", () => {
    test("deve atualizar uma performance existente quando o artista e o palco estão disponíveis", async () => {
      const performanceToUpdate = {
        id: 1,
        artist_id: 1,
        stage_id: 1,
        start_time: "2024-08-30 20:00:00+00",
        end_time: "2024-08-30 21:00:00+00",
        date: "2024-08-30",
      };

      const mockPerformanceToUpdate = {
        ...performanceToUpdate,
      };

      performanceRepository.artistUnavailability = jest
        .fn()
        .mockResolvedValue(false);
      performanceRepository.stageUnavailability = jest
        .fn()
        .mockResolvedValue(false);

      performanceRepository.updatePerformance = jest
        .fn()
        .mockResolvedValue(mockPerformanceToUpdate);

      const updatedPerformance = await performanceService.updatePerformance(
        performanceToUpdate.id,
        performanceToUpdate.artist_id,
        performanceToUpdate.stage_id,
        performanceToUpdate.start_time,
        performanceToUpdate.end_time,
        performanceToUpdate.date
      );

      expect(updatedPerformance).toEqual(mockPerformanceToUpdate);

      expect(performanceRepository.artistUnavailability).toHaveBeenCalledWith(
        performanceToUpdate.artist_id,
        performanceToUpdate.start_time,
        performanceToUpdate.end_time,
        performanceToUpdate.date,
        performanceToUpdate.id
      );
      expect(performanceRepository.stageUnavailability).toHaveBeenCalledWith(
        performanceToUpdate.stage_id,
        performanceToUpdate.start_time,
        performanceToUpdate.end_time,
        performanceToUpdate.date,
        performanceToUpdate.id
      );
      expect(performanceRepository.updatePerformance).toHaveBeenCalledWith(
        performanceToUpdate.id,
        performanceToUpdate.artist_id,
        performanceToUpdate.stage_id,
        performanceToUpdate.start_time,
        performanceToUpdate.end_time,
        performanceToUpdate.date
      );

      expect(performanceRepository.updatePerformance).toHaveBeenCalledTimes(1);
    });

    test("deve lançar um erro se o artista não estiver disponível", async () => {
      const performanceToUpdate = {
        id: 1,
        artist_id: 1,
        stage_id: 2,
        start_time: "2024-08-30 20:00:00+00",
        end_time: "2024-08-30 21:00:00+00",
        date: "2024-08-30",
      };

      performanceRepository.artistUnavailability = jest
        .fn()
        .mockResolvedValue(true);

      await expect(
        performanceService.updatePerformance(
          1,
          1,
          2,
          "2024-08-30T20:00:00Z",
          "2024-08-30T22:00:00Z",
          "2024-08-30"
        )
      ).rejects.toThrow(
        "Este artista já está agendado para outra performance no mesmo horário"
      );

      expect(performanceRepository.artistUnavailability).toHaveBeenCalledWith(
        1,
        "2024-08-30T20:00:00Z",
        "2024-08-30T22:00:00Z",
        "2024-08-30",
        1
      );

      expect(performanceRepository.artistUnavailability).toHaveBeenCalledTimes(
        1
      );

      expect(performanceRepository.stageUnavailability).not.toHaveBeenCalled();
      expect(performanceRepository.updatePerformance).not.toHaveBeenCalled();
    });

    test("deve lançar um erro se o palco não estiver disponível", async () => {
      const performanceToUpdate = {
        id: 2,
        artist_id: 2,
        stage_id: 1,
        start_time: "2024-08-30 20:00:00+00",
        end_time: "2024-08-30 21:00:00+00",
        date: "2024-08-30",
      };

      const mockPerformanceToUpdate = {
        ...performanceToUpdate,
      };

      performanceRepository.artistUnavailability = jest
        .fn()
        .mockResolvedValue(false);
      performanceRepository.stageUnavailability = jest
        .fn()
        .mockResolvedValue(true);

      await expect(
        performanceService.updatePerformance(
          2,
          2,
          1,
          "2024-08-30T20:00:00Z",
          "2024-08-30T21:00:00Z",
          "2024-08-30"
        )
      ).rejects.toThrow(
        "Já existe uma performance agendada neste palco para o horário especificado"
      );

      expect(performanceRepository.artistUnavailability).toHaveBeenCalledWith(
        2,
        "2024-08-30T20:00:00Z",
        "2024-08-30T21:00:00Z",
        "2024-08-30",
        2
      );
      expect(performanceRepository.stageUnavailability).toHaveBeenCalledWith(
        1,
        "2024-08-30T20:00:00Z",
        "2024-08-30T21:00:00Z",
        "2024-08-30",
        2
      );

      expect(performanceRepository.artistUnavailability).toHaveBeenCalledTimes(
        1
      );
      expect(performanceRepository.stageUnavailability).toHaveBeenCalledTimes(
        1
      );
      expect(performanceRepository.updatePerformance).not.toHaveBeenCalled();
    });

    test("deve lançar um erro se ocorrer um problema durante a atualização da performance", async () => {
      const performanceToUpdate = {
        id: 1,
        artist_id: 1,
        stage_id: 1,
        start_time: "2024-08-30 20:00:00+00",
        end_time: "2024-08-30 21:00:00+00",
        date: "2024-08-30",
      };

      const mockError = new Error(
        "Erro ao atualizar performance no banco de dados"
      );

      performanceRepository.artistUnavailability = jest
        .fn()
        .mockResolvedValue(false);
      performanceRepository.stageUnavailability = jest
        .fn()
        .mockResolvedValue(false);
      performanceRepository.updatePerformance = jest
        .fn()
        .mockRejectedValue(mockError);

      await expect(
        performanceService.updatePerformance(
          performanceToUpdate.id,
          performanceToUpdate.artist_id,
          performanceToUpdate.stage_id,
          performanceToUpdate.start_time,
          performanceToUpdate.end_time,
          performanceToUpdate.date
        )
      ).rejects.toThrow("Erro ao atualizar performance no banco de dados");

      expect(performanceRepository.artistUnavailability).toHaveBeenCalledTimes(
        1
      );
      expect(performanceRepository.stageUnavailability).toHaveBeenCalledTimes(
        1
      );
      expect(performanceRepository.updatePerformance).toHaveBeenCalledTimes(1);
    });
  });

  describe("deletePerformance", () => {
    test("deve deletar uma performance existente e retornar a performance deletada", async () => {
      const performanceToDelete = {
        performance_id: 1,
        artist_id: 1,
        stage_id: 1,
        start_time: "2024-08-30 20:00:00+00",
        end_time: "2024-08-30 21:00:00+00",
        date: "2024-08-30",
      };

      const mockDeletedPerformance = {
        ...performanceToDelete,
      };

      performanceRepository.deletePerformance = jest
        .fn()
        .mockResolvedValue(mockDeletedPerformance);

      const deletedPerformance = await performanceService.deletePerformance(
        performanceToDelete.performance_id
      );

      expect(deletedPerformance).toEqual(mockDeletedPerformance);
      expect(performanceRepository.deletePerformance).toHaveBeenCalledWith(
        performanceToDelete.performance_id
      );
      expect(performanceRepository.deletePerformance).toHaveBeenCalledTimes(1);
    });

    test("deve lançar um erro quando performanceRepository.deletePerformance é rejeitado", async () => {
      const mockError = new Error(
        "Erro ao deletar performance no banco de dados"
      );

      performanceRepository.deletePerformance = jest
        .fn()
        .mockRejectedValue(mockError);

      await expect(performanceService.deletePerformance(38999)).rejects.toThrow(
        "Erro ao deletar performance no banco de dados"
      );

      expect(performanceRepository.deletePerformance).toHaveBeenCalledWith(
        38999
      );
      expect(performanceRepository.deletePerformance).toHaveBeenCalledTimes(1);
    });
  });
});

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});
