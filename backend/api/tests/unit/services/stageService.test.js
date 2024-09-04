import { describe, test, jest, expect } from "@jest/globals";
import { stageService } from "../../../src/services/stageService";
import { stageRepository } from "../../../src/repositories/stageRepository";

describe("stageService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllStages", () => {
    test("tem que retornar todos os palcos ao resolver stageRepository.getAllStages", async () => {
      const mockStages = [
        {
          stage_id: 1,
          name: "Madrugada",
          location: "São Paulo - SP",
          capacity: 5000,
        },
        {
          stage_id: 2,
          name: "Pôr-do-Sol",
          location: "Rio de Janeiro - RJ",
          capacity: 3500,
        },
      ];

      stageRepository.getAllStages = jest.fn().mockResolvedValue(mockStages);

      const stages = await stageService.getAllStages();

      expect(stages).toEqual(mockStages);

      expect(stageRepository.getAllStages).toHaveBeenCalledTimes(1);
    });

    test("tem que lançar um erro quando stageRepository.getAllStages é rejeitado", async () => {
      const mockError = new Error("Erro ao recuperar todos os palcos");

      stageRepository.getAllStages = jest.fn().mockRejectedValue(mockError);

      await expect(stageService.getAllStages()).rejects.toThrow(
        "Erro ao recuperar todos os palcos"
      );
      //O .rejects é um matcher específico do Jest que é utilizado para trabalhar com promessas que você espera que sejam rejeitadas. Ele diz ao Jest para esperar que a promessa seja rejeitada e, em seguida, permitir que você verifique a natureza da rejeição.
      //O .toThrow() é outro matcher do Jest que verifica se a função lança um erro. Quando usado junto com .rejects, ele verifica se a promessa foi rejeitada com um erro que tem a mensagem correspondente ao valor fornecido, neste caso, "Erro ao recuperar todos os palcos".
      //Se a promessa for rejeitada com um erro cuja mensagem contenha o texto "Erro ao recuperar todos os palcos", o teste passará. Caso contrário, o teste falhará.

      expect(stageRepository.getAllStages).toHaveBeenCalledTimes(1);
    });

    test("tem que retornar um array vazio se não houver palcos", async () => {
      stageRepository.getAllStages = jest.fn().mockResolvedValue([]);

      const stages = await stageService.getAllStages();

      expect(stages).toEqual([]);

      expect(stageRepository.getAllStages).toHaveBeenCalledTimes(1);
    });

    test("tem que garantir que os palcos retornados tenham a estrutura esperada", async () => {
      const mockStages = [
        {
          stage_id: 1,
          name: "Madrugada",
          location: "São Paulo - SP",
          capacity: 5000,
        },
        {
          stage_id: 2,
          name: "Pôr-do-Sol",
          location: "Rio de Janeiro - RJ",
          capacity: 3500,
        },
      ];

      stageRepository.getAllStages = jest.fn().mockResolvedValue(mockStages);

      const stages = await stageService.getAllStages();

      expect(stages).toBeInstanceOf(Array);
      //O matcher .toBeInstanceOf é um método específico do Jest usado para verificar se um objeto é uma instância de uma determinada classe ou construtor.
      //Neste caso, Array é o construtor nativo do JavaScript para arrays. A verificação .toBeInstanceOf(Array) está garantindo que stages seja um array, ou seja, que ele foi criado pelo construtor Array e tem todas as propriedades e métodos associados a arrays em JavaScript.
      expect(stages[0]).toHaveProperty("stage_id");
      expect(stages[0]).toHaveProperty("name");
      expect(stages[0]).toHaveProperty("location");
      expect(stages[0]).toHaveProperty("capacity");
      expect(stages[1]).toHaveProperty("stage_id");
      expect(stages[1]).toHaveProperty("name");
      expect(stages[1]).toHaveProperty("location");
      expect(stages[1]).toHaveProperty("capacity");
    });
  });

  describe("getStageById", () => {
    test("tem que retornar o palco com o id especificado (isso se o id for válido) ao resolver stageRepository.getStageById(id)", async () => {
      const mockStage = {
        stage_id: 1,
        name: "Madrugada",
        location: "São Paulo - SP",
        capacity: 5000,
      };

      stageRepository.getStageById = jest.fn().mockResolvedValue(mockStage);
      //A tentativa de usar stageRepository.getStageById(1) = jest.fn().mockResolvedValue(mockStage); resultaria em um erro de sintaxe, pois você não pode atribuir uma função mockada a uma chamada de função específica. Em jest.fn().mockResolvedValue(mockStage), você não passa o argumento 1 diretamente. O método jest.fn() é utilizado para criar uma função mockada, e mockResolvedValue faz com que essa função retorne uma promessa resolvida com o valor mockStage independentemente do argumento passado ao chamar getStageById na execução do teste.

      const stage = await stageService.getStageById(1);

      expect(stage).toEqual(mockStage);
      expect(stageRepository.getStageById).toHaveBeenCalledWith(1);
      expect(stageRepository.getStageById).toHaveBeenCalledTimes(1);
    });

    test("tem que garantir que o palco retornado tenha a estrutura esperada", async () => {
      const mockStage = {
        stage_id: 1,
        name: "Madrugada",
        location: "São Paulo - SP",
        capacity: 5000,
      };

      stageRepository.getStageById = jest.fn().mockResolvedValue(mockStage);

      const stage = await stageService.getStageById(1);

      expect(stage).toHaveProperty("stage_id");
      expect(stage).toHaveProperty("name");
      expect(stage).toHaveProperty("location");
      expect(stage).toHaveProperty("capacity");
    });

    test("tem que lançar um erro quando stageRepository.getStageById(id) é rejeitado", async () => {
      const mockError = new Error("Erro ao recuperar palco com id");

      stageRepository.getStageById = jest.fn().mockRejectedValue(mockError);

      await expect(stageService.getStageById(1)).rejects.toThrow(
        "Erro ao recuperar palco com id"
      );

      expect(stageRepository.getStageById).toHaveBeenCalledWith(1);
      expect(stageRepository.getStageById).toHaveBeenCalledTimes(1);
    });
  });

  describe("createStage", () => {
    test("deve criar um novo palco e retornar o palco criado", async () => {
      const newStage = {
        name: "Madrugada",
        location: "São Paulo - SP",
        capacity: 5000,
      };

      const mockCreatedStage = {
        stage_id: 1,
        ...newStage,
      };

      stageRepository.createStage = jest
        .fn()
        .mockResolvedValue(mockCreatedStage);

      const createdStage = await stageService.createStage(
        newStage.name,
        newStage.location,
        newStage.capacity
      );

      expect(createdStage).toEqual(mockCreatedStage);
      expect(stageRepository.createStage).toHaveBeenCalledWith(
        newStage.name,
        newStage.location,
        newStage.capacity
      );
      expect(stageRepository.createStage).toHaveBeenCalledTimes(1);
    });

    test("deve lançar um erro quando stageRepository.createStage é rejeitado", async () => {
      const newStage = {
        name: "Madrugada",
        location: "São Paulo - SP",
        capacity: 5000,
      };

      const mockError = new Error("Erro ao criar novo palco no banco de dados");

      stageRepository.createStage = jest.fn().mockRejectedValue(mockError);

      await expect(
        stageService.createStage(
          newStage.name,
          newStage.location,
          newStage.capacity
        )
      ).rejects.toThrow("Erro ao criar novo palco no banco de dados");

      expect(stageRepository.createStage).toHaveBeenCalledWith(
        newStage.name,
        newStage.location,
        newStage.capacity
      );
      expect(stageRepository.createStage).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateStage", () => {
    test("deve atualizar um palco existente e retornar o palco atualizado", async () => {
      const stageToUpdate = {
        stage_id: 1,
        name: "Madrugada Fria",
        location: "São Paulo - SP",
        capacity: 5000,
      };

      const mockUpdatedStage = {
        ...stageToUpdate,
      };

      stageRepository.updateStage = jest
        .fn()
        .mockResolvedValue(mockUpdatedStage);

      const updatedStage = await stageService.updateStage(
        stageToUpdate.stage_id,
        stageToUpdate.name,
        stageToUpdate.location,
        stageToUpdate.capacity
      );

      expect(updatedStage).toEqual(mockUpdatedStage);
      expect(stageRepository.updateStage).toHaveBeenCalledWith(
        stageToUpdate.stage_id,
        stageToUpdate.name,
        stageToUpdate.location,
        stageToUpdate.capacity
      );
      expect(stageRepository.updateStage).toHaveBeenCalledTimes(1);
    });

    test("deve lançar um erro quando stageRepository.updateStage é rejeitado", async () => {
      const mockError = new Error("Erro ao atualizar palco no banco de dados");

      stageRepository.updateStage = jest.fn().mockRejectedValue(mockError);

      await expect(
        stageService.updateStage(1, "Madrugada Fria", "São Paulo - SP", 5000)
      ).rejects.toThrow("Erro ao atualizar palco no banco de dados");

      expect(stageRepository.updateStage).toHaveBeenCalledWith(
        1,
        "Madrugada Fria",
        "São Paulo - SP",
        5000
      );
      expect(stageRepository.updateStage).toHaveBeenCalledTimes(1);
    });
  });

  describe("deleteStage", () => {
    test("deve deletar um palco existente e retornar o palco deletado", async () => {
      const stageToDelete = {
        stage_id: 1,
        name: "Madrugada",
        location: "São Paulo - SP",
        capacity: 5000,
      };

      const mockDeletedStage = {
        ...stageToDelete,
      };

      stageRepository.deleteStage = jest
        .fn()
        .mockResolvedValue(mockDeletedStage);

      const deletedStage = await stageService.deleteStage(
        stageToDelete.stage_id
      );

      expect(deletedStage).toEqual(mockDeletedStage);
      expect(stageRepository.deleteStage).toHaveBeenCalledWith(
        stageToDelete.stage_id
      );
      expect(stageRepository.deleteStage).toHaveBeenCalledTimes(1);
    });

    test("deve lançar um erro quando stageRepository.deleteStage é rejeitado", async () => {
      const mockError = new Error("Erro ao deletar palco no banco de dados");

      stageRepository.deleteStage = jest.fn().mockRejectedValue(mockError);

      await expect(stageService.deleteStage(38999)).rejects.toThrow(
        "Erro ao deletar palco no banco de dados"
      );

      expect(stageRepository.deleteStage).toHaveBeenCalledWith(38999);
      expect(stageRepository.deleteStage).toHaveBeenCalledTimes(1);
    });
  });

  describe("existenceOfTheSameStageName", () => {
    test("deve retornar true quando já existir um palco com o mesmo nome", async () => {
      stageRepository.existenceOfTheSameStageName = jest
        .fn()
        .mockResolvedValue(true);

      const result = await stageService.existenceOfTheSameStageName(
        "Madrugada"
      );

      expect(result).toBe(true);

      expect(stageRepository.existenceOfTheSameStageName).toHaveBeenCalledWith(
        "Madrugada",
        null
      );

      expect(stageRepository.existenceOfTheSameStageName).toHaveBeenCalledTimes(
        1
      );
    });

    test("deve retornar false quando não existir um palco com o mesmo nome", async () => {
      stageRepository.existenceOfTheSameStageName = jest
        .fn()
        .mockResolvedValue(false);

      const result = await stageService.existenceOfTheSameStageName(
        "Sol a Pino"
      );

      expect(result).toBe(false);
      expect(stageRepository.existenceOfTheSameStageName).toHaveBeenCalledWith(
        "Sol a Pino",
        null
      );
      expect(stageRepository.existenceOfTheSameStageName).toHaveBeenCalledTimes(
        1
      );
    });

    test("deve ignorar o palco atual ao verificar a existência de outro palco com o mesmo nome (isso ocorre em caso de atualização de informações de um palco já existente)", async () => {
      stageRepository.existenceOfTheSameStageName = jest
        .fn()
        .mockResolvedValue(false);

      const result = await stageService.existenceOfTheSameStageName(
        "Madrugada",
        1
      );

      expect(result).toBe(false);
      expect(stageRepository.existenceOfTheSameStageName).toHaveBeenCalledWith(
        "Madrugada",
        1
      );
      expect(stageRepository.existenceOfTheSameStageName).toHaveBeenCalledTimes(
        1
      );
    });

    test("deve lançar um erro quando o repositório lança um erro", async () => {
      const mockError = new Error(
        "Erro ao verificar a existência de palco com mesmo nome no banco de dados"
      );

      stageRepository.existenceOfTheSameStageName = jest
        .fn()
        .mockRejectedValue(mockError);

      await expect(
        stageService.existenceOfTheSameStageName("Um Nome Qualquer")
      ).rejects.toThrow(
        "Erro ao verificar a existência de palco com mesmo nome no banco de dados"
      );

      expect(stageRepository.existenceOfTheSameStageName).toHaveBeenCalledWith(
        "Um Nome Qualquer",
        null
      );
      expect(stageRepository.existenceOfTheSameStageName).toHaveBeenCalledTimes(
        1
      );
    });
  });

  describe("existenceOfTheSameStageLocation", () => {
    test("deve retornar true quando já existir um palco com a mesma localização", async () => {
      stageRepository.existenceOfTheSameStageLocation = jest
        .fn()
        .mockResolvedValue(true);

      const result = await stageService.existenceOfTheSameStageLocation(
        "São Paulo - SP"
      );

      expect(result).toBe(true);
      expect(
        stageRepository.existenceOfTheSameStageLocation
      ).toHaveBeenCalledWith("São Paulo - SP", null);
      expect(
        stageRepository.existenceOfTheSameStageLocation
      ).toHaveBeenCalledTimes(1);
    });

    test("deve retornar false quando não existir um palco com a mesma localização", async () => {
      stageRepository.existenceOfTheSameStageLocation = jest
        .fn()
        .mockResolvedValue(false);

      const result = await stageService.existenceOfTheSameStageLocation(
        "Salvador - BA"
      );

      expect(result).toBe(false);
      expect(
        stageRepository.existenceOfTheSameStageLocation
      ).toHaveBeenCalledWith("Salvador - BA", null);
      expect(
        stageRepository.existenceOfTheSameStageLocation
      ).toHaveBeenCalledTimes(1);
    });

    test("deve ignorar o palco atual ao verificar a existência de outro palco com a mesma localização (isso ocorre em caso de atualização de informações de um palco já existente)", async () => {
      stageRepository.existenceOfTheSameStageLocation = jest
        .fn()
        .mockResolvedValue(false);

      const result = await stageService.existenceOfTheSameStageLocation(
        "São Paulo - SP",
        1
      );

      expect(result).toBe(false);
      expect(
        stageRepository.existenceOfTheSameStageLocation
      ).toHaveBeenCalledWith("São Paulo - SP", 1);
      expect(
        stageRepository.existenceOfTheSameStageLocation
      ).toHaveBeenCalledTimes(1);
    });

    test("deve lançar um erro quando o repositório lança um erro", async () => {
      const mockError = new Error(
        "Erro ao verificar a existência de mesma localizaçao de palco no banco de dados"
      );
      stageRepository.existenceOfTheSameStageLocation = jest
        .fn()
        .mockRejectedValue(mockError);

      await expect(
        stageService.existenceOfTheSameStageLocation("Uma localização qualquer")
      ).rejects.toThrow(
        "Erro ao verificar a existência de mesma localizaçao de palco no banco de dados"
      );

      expect(
        stageRepository.existenceOfTheSameStageLocation
      ).toHaveBeenCalledWith("Uma localização qualquer", null);
      expect(
        stageRepository.existenceOfTheSameStageLocation
      ).toHaveBeenCalledTimes(1);
    });
  });
});

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});
