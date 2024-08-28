import { describe, jest } from "@jest/globals";
import { artistService } from "../../src/services/artistService";
import { artistRepository } from "../../src/repositories/artistRepository";

describe("artistService", () => {
  describe("getAllArtists", () => {
    test("tem que retornar todos os artistas ao resolver artistRepository.getAllArtists", async () => {
      const mockArtists = [
        {
          artist_id: 1,
          name: "Juju dos Teclados",
          biography:
            "Juju dos Teclados começou sua carreira em 2003, no Rio de Janeiro - RJ.",
          photo_url: "https://jujudosteclados.com.br",
        },
        {
          artist_id: 2,
          name: "Nina do Viola",
          biography:
            "Nina da Viola começou sua carreira em 2011, em Belo Horizonte - MG.",
          photo_url: "https://ninadaviola.com.br",
        },
      ];

      artistRepository.getAllArtists = jest.fn().mockResolvedValue(mockArtists);
      //artistRepository.getAllArtists é a função original no repositório que, em um cenário real, faria a consulta ao banco de dados para obter todos os artistas.
      //jest.fn() é uma função do Jest que cria um mock function (ou função mockada). Uma função mockada é uma função "falsa" que simula o comportamento de uma função real.
      //.mockResolvedValue(mockArtists) é um método específico para funções mockadas criadas por jest.fn() que configura a função para retornar uma promessa que resolve com um valor específico. No contexto de promessas (funções assíncronas), "resolver" significa que a promessa foi concluída com sucesso e retornou um valor. mockArtists é o valor com o qual a promessa vai resolver. Neste caso, mockArtists é um array de objetos que representa artistas simulados.
      //ao criar essa função, você está substituindo a função original getAllArtists do artistRepository por uma versão mockada.

      const artists = await artistService.getAllArtists();
      //await artistService.getAllArtists(): Aqui, estamos chamando o método getAllArtists do serviço artistService, que é a unidade de código que estamos testando. O uso de await é necessário porque getAllArtists é uma função assíncrona.
      //const artists: A constante artists armazena o valor retornado pelo serviço artistService.getAllArtists(), que por sua vez é o valor retornado por artistRepository.getAllArtists(), e que graças ao mock, deve ser igual a mockArtists.

      expect(artists).toEqual(mockArtists);
      //expect(artists): Essa função verifica o valor de artists, que é o resultado retornado pelo serviço.
      //toEqual(mockArtists): Esta asserção verifica se artists é estritamente igual ao mockArtists em termos de estrutura e conteúdo. Ou seja, estamos verificando se o serviço realmente retorna o que o mock do repositório forneceu.
      //await artistService.getAllArtists(): Você já usou await para garantir que a função getAllArtists do artistService seja resolvida antes de passar para o expect. Isso significa que, quando você chega ao expect(artists).toEqual(mockArtists);, o valor de artists já foi resolvido e armazenado na constante artists. expect(artists).toEqual(mockArtists): Neste ponto, artists é um valor regular (não uma promessa), então não há necessidade de await no expect.

      expect(artistRepository.getAllArtists).toHaveBeenCalledTimes(1);
      //expect(artistRepository.getAllArtists): Aqui, verificamos a função mockada getAllArtists do repositório.
      //toHaveBeenCalledTimes(1): Esta asserção verifica se a função mockada getAllArtists foi chamada exatamente uma vez durante a execução do teste. Isso assegura que o serviço artistService.getAllArtists() realmente invocou o repositório como esperado.
    });

    test("tem que lançar um erro quando artistRepository.getAllArtists é rejeitado", async () => {
      const mockError = new Error("Erro ao recuperar todos os artistas");

      artistRepository.getAllArtists = jest.fn().mockRejectedValue(mockError);

      await expect(artistService.getAllArtists()).rejects.toThrow(
        "Erro ao recuperar todos os artistas"
      );
      //await expect(...).rejects.toThrow(...): Aqui, o await é necessário porque expect(...).rejects.toThrow(...) está lidando com uma promessa que você espera que seja rejeitada. O await garante que você espere até que a promessa seja realmente rejeitada antes de verificar se o erro foi lançado.

      expect(artistRepository.getAllArtists).toHaveBeenCalledTimes(1);
    });

    test("tem que retornar um array vazio se não houver artistas", async () => {
      artistRepository.getAllArtists = jest.fn().mockResolvedValue([]);

      const artists = await artistService.getAllArtists();

      expect(artists).toEqual([]);

      expect(artistRepository.getAllArtists).toHaveBeenCalledTimes(1);
    });

    test("tem que garantir que os artistas retornados tenham a estrutura esperada", async () => {
      const mockArtists = [
        {
          artist_id: 1,
          name: "Juju dos Teclados",
          biography:
            "Juju dos Teclados começou sua carreira em 2003, no Rio de Janeiro - RJ.",
          photo_url: "https://jujudosteclados.com.br",
        },
        {
          artist_id: 2,
          name: "Nina do Viola",
          biography:
            "Nina da Viola começou sua carreira em 2011, em Belo Horizonte - MG.",
          photo_url: "https://ninadaviola.com.br",
        },
      ];

      artistRepository.getAllArtists = jest.fn().mockResolvedValue(mockArtists);

      const artists = await artistService.getAllArtists();

      expect(artists).toBeInstanceOf(Array);
      expect(artists[0]).toHaveProperty("artist_id");
      expect(artists[0]).toHaveProperty("name");
      expect(artists[0]).toHaveProperty("biography");
      expect(artists[0]).toHaveProperty("photo_url");
      expect(artists[1]).toHaveProperty("artist_id");
      expect(artists[1]).toHaveProperty("name");
      expect(artists[1]).toHaveProperty("biography");
      expect(artists[1]).toHaveProperty("photo_url");
    });
  });

  describe("getArtistById", () => {
    test("tem que retornar o artista com o id especificado (isso se o id for válido) ao resolver artistRepository.getArtistById(id)", async () => {
      const mockArtist = {
        artist_id: 1,
        name: "Juju dos Teclados",
        biography:
          "Juju dos Teclados começou sua carreira em 2003, no Rio de Janeiro - RJ.",
        photo_url: "https://jujudosteclados.com.br",
      };

      artistRepository.getArtistById = jest.fn().mockResolvedValue(mockArtist);

      const artist = await artistService.getArtistById(1);

      expect(artist).toEqual(mockArtist);
      expect(artistRepository.getArtistById).toHaveBeenCalledWith(1);
      expect(artistRepository.getArtistById).toHaveBeenCalledTimes(1);
    });

    test("tem que lançar um erro quando artistRepository.getArtistById(id) é rejeitado", async () => {
      const mockError = new Error("Erro ao recuperar artista com id");

      artistRepository.getArtistById = jest.fn().mockRejectedValue(mockError);

      await expect(artistService.getArtistById(1)).rejects.toThrow(
        "Erro ao recuperar artista com id"
      );

      expect(artistRepository.getArtistById).toHaveBeenCalledWith(1);
      expect(artistRepository.getArtistById).toHaveBeenCalledTimes(1);
    });

    // test("tem que retornar null se não houver artista com o id especificado", async () => {
    //   artistRepository.getArtistById = jest.fn().mockResolvedValue(null);

    //   const artist = await artistService.getArtistById(38999);

    //   expect(artist).toBeNull();
    //   expect(artistRepository.getArtistById).toHaveBeenCalledWith(38999);
    //   expect(artistRepository.getArtistById).toHaveBeenCalledTimes(1);
    // });
    //Este teste pode ser considerado desnecessário porque a lógica para verificar se um artista existe ou não (e, caso não exista, retornar uma resposta 404 ou null) é implementada no controller. O serviço não deveria ser responsável por esse tipo de validação. Em outras palavras, a responsabilidade do serviço é simplesmente retornar o que o repositório fornece, enquanto o controller decide o que fazer com esse retorno.
  });

  describe("createArtist", () => {
    test("deve criar um novo artista e retornar o artista criado", async () => {
      const newArtist = {
        name: "Juju dos Teclados",
        biography:
          "Juju dos Teclados começou sua carreira em 2003, no Rio de Janeiro - RJ.",
        photo_url: "https://jujudosteclados.com.br",
      };

      const mockCreatedArtist = {
        artist_id: 1,
        ...newArtist,
      };

      artistRepository.createArtist = jest
        .fn()
        .mockResolvedValue(mockCreatedArtist);

      const createdArtist = await artistService.createArtist(
        newArtist.name,
        newArtist.biography,
        newArtist.photo_url
      );

      expect(createdArtist).toEqual(mockCreatedArtist);
      expect(artistRepository.createArtist).toHaveBeenCalledWith(
        newArtist.name,
        newArtist.biography,
        newArtist.photo_url
      );
      expect(artistRepository.createArtist).toHaveBeenCalledTimes(1);
    });

    test("deve lançar um erro quando artistRepository.createArtist é rejeitado", async () => {
      const newArtist = {
        name: "Juju dos Teclados",
        biography:
          "Juju dos Teclados começou sua carreira em 2003, no Rio de Janeiro - RJ.",
        photo_url: "https://jujudosteclados.com.br",
      };

      const mockError = new Error(
        "Erro ao criar novo artista no banco de dados"
      );

      artistRepository.createArtist = jest.fn().mockRejectedValue(mockError);

      await expect(
        artistService.createArtist(
          newArtist.name,
          newArtist.biography,
          newArtist.photo_url
        )
      ).rejects.toThrow("Erro ao criar novo artista no banco de dados");

      expect(artistRepository.createArtist).toHaveBeenCalledWith(
        newArtist.name,
        newArtist.biography,
        newArtist.photo_url
      );
      expect(artistRepository.createArtist).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateArtist", () => {
    test("deve atualizar um artista existente e retornar o artista atualizado", async () => {
      const artistToUpdate = {
        artist_id: 1,
        name: "Juju dos Teclados",
        biography:
          "Juju dos Teclados começou sua carreira em 2013, no Rio de Janeiro - RJ.",
        photo_url: "https://jujudosteclados.com.br/updated",
      };

      const mockUpdatedArtist = {
        ...artistToUpdate,
      };

      artistRepository.updateArtist = jest
        .fn()
        .mockResolvedValue(mockUpdatedArtist);

      const updatedArtist = await artistService.updateArtist(
        artistToUpdate.artist_id,
        artistToUpdate.name,
        artistToUpdate.biography,
        artistToUpdate.photo_url
      );

      expect(updatedArtist).toEqual(mockUpdatedArtist);
      expect(artistRepository.updateArtist).toHaveBeenCalledWith(
        artistToUpdate.artist_id,
        artistToUpdate.name,
        artistToUpdate.biography,
        artistToUpdate.photo_url
      );
      expect(artistRepository.updateArtist).toHaveBeenCalledTimes(1);
    });

    test("deve lançar um erro quando artistRepository.updateArtist rejeita", async () => {
      const mockError = new Error(
        "Erro ao atualizar artista no banco de dados"
      );

      artistRepository.updateArtist = jest.fn().mockRejectedValue(mockError);

      await expect(
        artistService.updateArtist(
          1,
          "Juju dos Teclados",
          "Juju dos Teclados começou sua carreira em 2013, no Rio de Janeiro - RJ.",
          "https://jujudosteclados.com.br/updated"
        )
      ).rejects.toThrow("Erro ao atualizar artista no banco de dados");

      expect(artistRepository.updateArtist).toHaveBeenCalledWith(
        1,
        "Juju dos Teclados",
        "Juju dos Teclados começou sua carreira em 2013, no Rio de Janeiro - RJ.",
        "https://jujudosteclados.com.br/updated"
      );
      expect(artistRepository.updateArtist).toHaveBeenCalledTimes(1);
    });
  });

  describe("deleteArtist", () => {
    test("deve deletar um artista existente e retornar o artista deletado", async () => {
      const artistToDelete = {
        artist_id: 1,
        name: "Juju dos Teclados",
        biography:
          "Juju dos Teclados começou sua carreira em 2013, no Rio de Janeiro - RJ.",
        photo_url: "https://jujudosteclados.com.br",
      };

      const mockDeletedArtist = {
        ...artistToDelete,
      };

      artistRepository.deleteArtist = jest
        .fn()
        .mockResolvedValue(mockDeletedArtist);

      const deletedArtist = await artistService.deleteArtist(
        artistToDelete.artist_id
      );

      expect(deletedArtist).toEqual(mockDeletedArtist);
      expect(artistRepository.deleteArtist).toHaveBeenCalledWith(
        artistToDelete.artist_id
      );
      expect(artistRepository.deleteArtist).toHaveBeenCalledTimes(1);
    });

    test("deve lançar um erro quando artistRepository.deleteArtist rejeita", async () => {
      const mockError = new Error("Erro ao deletar artista no banco de dados");

      artistRepository.deleteArtist = jest.fn().mockRejectedValue(mockError);

      await expect(artistService.deleteArtist(38999)).rejects.toThrow(
        "Erro ao deletar artista no banco de dados"
      );

      expect(artistRepository.deleteArtist).toHaveBeenCalledWith(38999);
      expect(artistRepository.deleteArtist).toHaveBeenCalledTimes(1);
    });
  });

  describe("existenceOfTheSameArtistName", () => {
    test("deve retornar true quando já existir um artista com o mesmo nome", async () => {
      artistRepository.existenceOfTheSameArtistName = jest
        .fn()
        .mockResolvedValue(true);

      const result = await artistService.existenceOfTheSameArtistName(
        "Juju dos Teclados"
      );

      expect(result).toBe(true);
      expect(
        artistRepository.existenceOfTheSameArtistName
      ).toHaveBeenCalledWith("Juju dos Teclados", null);
      //o null é usado para garantir que o serviço foi chamado corretamente com o valor padrão para current_artist_id quando você não passa um segundo argumento. Ele serve como um placeholder que indica que não há ID de artista específico a ser ignorado na verificação de duplicidade. Esse comportamento é útil, por exemplo, quando você está adicionando um novo artista e quer garantir que não exista outro artista com o mesmo nome no banco de dados. Como você não está comparando com um artista existente (porque está adicionando um novo), você passa null ou omite o segundo argumento, e ele é automaticamente null.
      expect(
        artistRepository.existenceOfTheSameArtistName
      ).toHaveBeenCalledTimes(1);
    });

    test("deve retornar false quando não existir um artista com o mesmo nome", async () => {
      artistRepository.existenceOfTheSameArtistName = jest
        .fn()
        .mockResolvedValue(false);

      const result = await artistService.existenceOfTheSameArtistName(
        "Gege da Bateria"
      );

      expect(result).toBe(false);
      expect(
        artistRepository.existenceOfTheSameArtistName
      ).toHaveBeenCalledWith("Gege da Bateria", null);
      expect(
        artistRepository.existenceOfTheSameArtistName
      ).toHaveBeenCalledTimes(1);
    });

    test("deve ignorar o artista atual ao verificar a existência de outro artista com o mesmo nome", async () => {
      artistRepository.existenceOfTheSameArtistName = jest
        .fn()
        .mockResolvedValue(false);

      const result = await artistService.existenceOfTheSameArtistName(
        "Juju dos Teclados",
        1
      );
      //aqui é passado o current_artist_id, ou seja, essa verificação de duplicidade está sendo feita na hora de atualizar o artista em questão, ou seja, existenceOfTheSameArtistName deve retornar false, afinal, estamos somente atualizando um artista existente.

      expect(result).toBe(false);
      expect(
        artistRepository.existenceOfTheSameArtistName
      ).toHaveBeenCalledWith("Juju dos Teclados", 1);
      expect(
        artistRepository.existenceOfTheSameArtistName
      ).toHaveBeenCalledTimes(1);
    });

    test("deve lançar um erro quando o repositório lança um erro", async () => {
      const mockError = new Error(
        "Erro ao verificar a existência de artista com mesmo nome no banco de dados"
      );
      artistRepository.existenceOfTheSameArtistName = jest
        .fn()
        .mockRejectedValue(mockError);

      await expect(
        artistService.existenceOfTheSameArtistName("Um Nome Qualquer")
      ).rejects.toThrow(
        "Erro ao verificar a existência de artista com mesmo nome no banco de dados"
      );
      //coloquei "Um Nome Qualquer" porque o que importa não é o nome, mas sim a operação não ter sucesso.

      expect(
        artistRepository.existenceOfTheSameArtistName
      ).toHaveBeenCalledWith("Um Nome Qualquer", null);
      expect(
        artistRepository.existenceOfTheSameArtistName
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe("existenceOfTheSamePhotoUrl", () => {
    test("deve retornar true quando já existir um artista com a mesma URL de foto", async () => {
      artistRepository.existenceOfTheSamePhotoUrl = jest
        .fn()
        .mockResolvedValue(true);

      const result = await artistService.existenceOfTheSamePhotoUrl(
        "https://jujudosteclados.com.br/updated"
      );

      expect(result).toBe(true);
      expect(artistRepository.existenceOfTheSamePhotoUrl).toHaveBeenCalledWith(
        "https://jujudosteclados.com.br/updated",
        null
      );
      expect(artistRepository.existenceOfTheSamePhotoUrl).toHaveBeenCalledTimes(
        1
      );
    });

    test("deve retornar false quando não existir um artista com a mesma URL de foto", async () => {
      artistRepository.existenceOfTheSamePhotoUrl = jest
        .fn()
        .mockResolvedValue(false);

      const result = await artistService.existenceOfTheSamePhotoUrl(
        "https://gegedabateria.com.br"
      );

      expect(result).toBe(false);
      expect(artistRepository.existenceOfTheSamePhotoUrl).toHaveBeenCalledWith(
        "https://gegedabateria.com.br",
        null
      );
      expect(artistRepository.existenceOfTheSamePhotoUrl).toHaveBeenCalledTimes(
        1
      );
    });

    test("deve ignorar o artista atual ao verificar a existência de outro artista com a mesma URL de foto", async () => {
      artistRepository.existenceOfTheSamePhotoUrl = jest
        .fn()
        .mockResolvedValue(false);

      const result = await artistService.existenceOfTheSamePhotoUrl(
        "https://jujudosteclados.com.br/updated",
        1
      );

      expect(result).toBe(false);
      expect(artistRepository.existenceOfTheSamePhotoUrl).toHaveBeenCalledWith(
        "https://jujudosteclados.com.br/updated",
        1
      );
      expect(artistRepository.existenceOfTheSamePhotoUrl).toHaveBeenCalledTimes(
        1
      );
    });

    test("deve lançar um erro quando o repositório lança um erro", async () => {
      const mockError = new Error(
        "Erro ao verificar a existência de URL de foto igual no banco de dados"
      );
      artistRepository.existenceOfTheSamePhotoUrl = jest
        .fn()
        .mockRejectedValue(mockError);

      await expect(
        artistService.existenceOfTheSamePhotoUrl("https://umaurlqualquer.com")
      ).rejects.toThrow(
        "Erro ao verificar a existência de URL de foto igual no banco de dados"
      );

      expect(artistRepository.existenceOfTheSamePhotoUrl).toHaveBeenCalledWith(
        "https://umaurlqualquer.com",
        null
      );
      expect(artistRepository.existenceOfTheSamePhotoUrl).toHaveBeenCalledTimes(
        1
      );
    });
  });
});

//Para suprimir o console.error durante os testes, utilizamos o Jest para "mockar" (substituir temporariamente) o comportamento padrão do console.error. Basicamente, vamos substituir a função console.error por uma função vazia enquanto os testes estão rodando, o que faz com que nada seja impresso no console. Depois que os testes terminarem, restauramos o comportamento normal do console.error. Isso é útil para manter a saída dos testes limpa e focada nos resultados dos testes em si, sem poluição visual causada por mensagens de erro simuladas.

// Antes de cada teste, vamos substituir o console.error por uma função vazia
beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

// Após cada teste, vamos restaurar o comportamento original do console.error
afterEach(() => {
  console.error.mockRestore();
});
