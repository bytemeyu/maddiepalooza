import { jest } from '@jest/globals';
import { artistService } from "../../src/services/artistService";
import { artistRepository } from "../../src/repositories/artistRepository";

describe("artistService", () => {
  describe("getAllArtists", () => {
    test(
      "tem que retornar todos os artistas ao resolver artistRepository.getAllArtists", async () => {
        const mockArtists = [
          {
            artist_id: 1,
            name: "Anita da Marimba",
            biography:
              "Anita da Marimba começou sua carreira em 2001, em Cotia-SP.",
            photo_url: "https://anita.com.br",
          },
        ];

        artistRepository.getAllArtists = jest.fn().mockResolvedValue(mockArtists);
        //artistRepository.getAllArtists é a função original no repositório que, em um cenário real, faria a consulta ao banco de dados para obter todos os artistas.
        //jest.fn() é uma função do Jest que cria um mock function (ou função mockada). Uma função mockada é uma função "falsa" que simula o comportamento de uma função real.
        //.mockResolvedValue(mockArtists) é um método específico para funções mockadas criadas por jest.fn() que configura a função para retornar uma promessa que resolve com um valor específico. No contexto de promessas (funções assíncronas), "resolver" significa que a promessa foi concluída com sucesso e retornou um valor. mockArtists é o valor com o qual a promessa vai resolver. Neste caso, mockArtists é um array de objetos que representa artistas simulados.
        //ao criar essa função, você está substituindo a função original getAllArtists do artistRepository por uma versão mockada.

        const artists = await artistService.getAllArtists();
        //await artistService.getAllArtists(): Aqui, estamos chamando o método getAllArtists do serviço artistService, que é a unidade de código que estamos testando. O uso de await é necessário porque getAllArtists é uma função assíncrona.
        //const artists: A constante artists armazena o valor retornado pelo serviço artistService.getAllArtists(), que, graças ao mock, deve ser igual a mockArtists.

        expect(artists).toEqual(mockArtists);
        //expect(artists): Essa função verifica o valor de artists, que é o resultado retornado pelo serviço.
        //toEqual(mockArtists): Esta asserção verifica se artists é estritamente igual ao mockArtists em termos de estrutura e conteúdo. Ou seja, estamos verificando se o serviço realmente retorna o que o mock do repositório forneceu.

        expect(artistRepository.getAllArtists).toHaveBeenCalledTimes(1);
        //expect(artistRepository.getAllArtists): Aqui, verificamos a função mockada getAllArtists do repositório.
        //toHaveBeenCalledTimes(1): Esta asserção verifica se a função mockada getAllArtists foi chamada exatamente uma vez durante a execução do teste. Isso assegura que o serviço artistService.getAllArtists() realmente invocou o repositório como esperado.
    });
  });
});
