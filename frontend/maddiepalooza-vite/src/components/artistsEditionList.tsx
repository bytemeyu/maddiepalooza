import React, { useState, useEffect } from 'react';
import { Artist } from '../types/artist';
import { twMerge } from 'tailwind-merge';
import { ArtistsEditionListProps } from '../types/artistsEditionList';
import { Modal } from './basics/modal';

export const ArtistsEditionList = ({ divAddArtistClassName, h2AddArtistClassName, inputAddArtistClassName, textareaAddArtistClassName, inputUrlAddArtistClassName, buttonAddArtistClassName, liClassName, imgClassName, className, children, ...rest }: ArtistsEditionListProps) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  //Define um estado chamado artists que é um array de objetos do tipo Artist. Inicialmente, artists é um array vazio. setArtists é a função usada para atualizar o estado artists.
  const [newArtist, setNewArtist] = useState<Partial<Artist>>({
    name: '',
    biography: '',
    photo_url: ''
  });
  //Define um estado chamado newArtist que é um objeto parcial do tipo Artist. Inicialmente, newArtist é um objeto com as propriedades name, biography e photo_url, todas definidas como strings vazias. setNewArtist é a função usada para atualizar o estado newArtist.
  const [editedArtist, setEditedArtist] = useState<Partial<Artist>>({});
  //Define um estado chamado editedArtist que é um objeto parcial do tipo Artist. Inicialmente, editedArtist é um objeto vazio. setEditedArtist é a função usada para atualizar o estado editedArtist.
  const [isModalOpen, setIsModalOpen] = useState(false);
  //Define um estado chamado isModalOpen que é um booleano. Inicialmente, isModalOpen é false. setIsModalOpen é a função usada para atualizar o estado isModalOpen.

  useEffect(() => {
    //executa um efeito colateral (fetch) quando o componente é montado
    async function fetchArtists() {
      //função assíncrona para buscar artistas
      try {
        const response = await fetch('http://localhost:3000/api/artist');
        const jsonResponse = await response.json();
        setArtists(jsonResponse.data as Artist[]);
        //agora o array artists é populado pelos artistas buscados pela API
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    }

    fetchArtists();
  }, []);
  //ao caregar a página pela primeira vez, busca a lista de artistas e renderiza na tela

  const addArtist = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/artist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newArtist),
        credentials: 'include'
      });

      const jsonResponse = await response.json();

      if (response.ok) {
        //se o artista foi adicionado ao banco de dados, agora precisamos atualizar a parte visual do site:
        setArtists(prev => [...prev, jsonResponse.data]);
        //prev: Este é o estado anterior do array artists. [...prev, jsonResponse.data]: Usa o operador spread (...) para criar um novo array que contém todos os itens do array anterior (prev) e adiciona jsonResponse.data (o novo artista) ao final desse array. Quando o estado artists é atualizado, o componente que usa esse estado é automaticamente re-renderizado pelo React. Durante o re-render, o React vai gerar o DOM atualizado, incluindo o novo artista na lista exibida. Quando você atualiza o estado local com a resposta da API para um único artista, em vez de buscar todos os artistas novamente, você está economizando a quantidade de dados trafegados entre o cliente (navegador) e o servidor.
        setNewArtist({ name: '', biography: '', photo_url: '' });
        //Reseta o estado newArtist.
      }
    } catch (error) {
      console.error('Error adding artist:', error);
    }
  };

  const updateArtist = async () => {
    if (editedArtist.artist_id) {
      try {
        const response = await fetch(`http://localhost:3000/api/artist/${editedArtist.artist_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editedArtist),
          credentials: 'include'
        });

        const jsonResponse = await response.json();

        if (response.ok) {
          //se o artista foi atualizado no banco de dados, agora precisamos atualizar a parte visual do site:
          setArtists(prev => prev.map(artist => 
            artist.artist_id === jsonResponse.data.artist_id ? jsonResponse.data : artist
          ));
          //A função de callback (prev => prev.map(...)) recebe o estado anterior (prev) e retorna um novo array modificado. prev: Refere-se ao estado anterior do array artists. prev.map(...): Aplica o método map a este array, criando um novo array. artist: Representa cada elemento individual do array prev. É um parâmetro da função fornecida ao map. O método map itera sobre cada artist no array prev. artist.artist_id === jsonResponse.data.artist_id: Compara o artist_id do artist atual (o elemento sendo iterado) com o artist_id do artista atualizado (jsonResponse.data.artist_id). Se os artist_ids corresponderem, retorna o objeto atualizado do artista. Se os artist_ids não corresponderem, retorna o artist atual inalterado. Isso garante que o array artists seja atualizado corretamente, ou seja, somente com o artista modificado.
          closeEditModal();
        } 
      } catch (error) {
        console.error('Error updating artist:', error);
      }
    }
  };

  const deleteArtist = async (artistId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/artist/${artistId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      const jsonResponse = await response.json();

      if (response.ok) {
        setArtists(prev => prev.filter(artist => artist.artist_id !== artistId));
        //Se a resposta da API indica sucesso (response.ok é true), o estado artists é atualizado. O método filter cria um novo array excluindo o artista cujo artist_id corresponde ao artistId fornecido. setArtists(prev => prev.filter(...)): Atualiza o estado artists com o novo array, que não contém o artista removido.
      }
    } catch (error) {
      console.error('Error deleting artist:', error);
    }
  };

  const handleAddArtistChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //Esta linha define a função handleAddArtistChange como uma constante. A função aceita um parâmetro e, que é um evento de mudança (ChangeEvent) disparado por um <input> ou <textarea>.
    const { name, value } = e.target;
    //Esta linha utiliza a desestruturação para extrair as propriedades name e value do alvo (target) do evento (e). name é o atributo name do elemento <input> ou <textarea>, e value é o valor atual desse elemento.
    setNewArtist(prev => ({ ...prev, [name]: value }));
    //Aqui, a função setNewArtist é chamada para atualizar o estado newArtist. Ela recebe uma função de callback que toma o estado anterior (prev) e retorna um novo objeto de estado. O operador spread (...prev) é usado para copiar todas as propriedades do estado anterior, e [name]: value atualiza a propriedade específica com o novo valor. Desta forma, se o name for biography e o valor for New Biography, o estado newArtist será atualizado para { name: '', biography: 'New Biography', photo_url: '' }.
  };
  //handleAddArtistChange: É usada nos campos de entrada de texto para adicionar um novo artista. Cada vez que um usuário digita algo nos campos "Nome do Artista", "Biografia" ou "URL da Foto", esta função é chamada para atualizar o estado newArtist.

  const handleEditArtistChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedArtist(prev => ({ ...prev, [name]: value }));
  };
  //handleEditArtistChange: É usada nos campos de entrada de texto dentro do modal de edição de artista. Quando um usuário edita os campos "Nome do Artista", "Biografia" ou "URL da Foto" de um artista existente, esta função é chamada para atualizar o estado editArtist.

  const openEditModal = (artist: Artist) => {
    //Define a função openEditModal como uma constante. A função aceita um parâmetro artist, que é um objeto do tipo Artist. Este objeto representa o artista que será editado.
    setEditedArtist(artist);
    //Chama a função setEditedArtist para atualizar o estado editedArtist com o artista passado como argumento. Isso prepara o formulário de edição com os dados do artista selecionado, preenchendo os campos do modal com as informações atuais do artista.
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setEditedArtist({});
    //Chama a função setEditedArtist para atualizar o estado editedArtist com um objeto vazio. Isso "reseta" o formulário de edição, removendo quaisquer dados de artista previamente carregados.
    setIsModalOpen(false);
  };

  //estilização padrão (a estilização mais personalizada vai ser feita na view, ao chamar esse componente, através do className específico):
  const artistsEditionListClasses = '';
  const divAddArtistClasses = 'w-full max-w-4xl p-4 my-5 mx-auto text-center flex flex-col space-y-4';
  const h2AddArtistClasses = 'text-center w-full text-xl md:text-2xl h-auto';
  const inputAddArtistClasses = 'h-10 w-2/5';
  const textareaAddArtistClasses = 'h-40 w-3/5';
  const inputUrlAddArtistClasses = 'h-10 w-4/5';
  const buttonAddArtistClasses = 'text-xl md:text-xl px-3 py-2 mx-auto ml-auto';

  const liClasses = 'flex items-center my-4';
  const imgClasses = 'w-24 h-24 mr-4 rounded-full';
  const pClasses = 'text-left';

  return (
    <div {...rest} className={twMerge(artistsEditionListClasses, className)}>
      <div className={twMerge(divAddArtistClasses, divAddArtistClassName)}>
        <h2 className={twMerge(h2AddArtistClasses, h2AddArtistClassName)}>
          Novo Artista
        </h2>
        <input
          type="text"
          name="name"
          value={newArtist.name}
          onChange={handleAddArtistChange}
          placeholder="Nome do Artista"
          className={twMerge(inputAddArtistClasses, inputAddArtistClassName)}
        />
        <textarea
          name="biography"
          value={newArtist.biography}
          onChange={handleAddArtistChange}
          placeholder="Biografia"
          className={twMerge(textareaAddArtistClasses, textareaAddArtistClassName)}
        />
        <input
          type="text"
          name="photo_url"
          value={newArtist.photo_url}
          onChange={handleAddArtistChange}
          placeholder="URL da Foto"
          className={twMerge(inputUrlAddArtistClasses, inputUrlAddArtistClassName)}
        />
        <button onClick={addArtist} className={twMerge(buttonAddArtistClasses, buttonAddArtistClassName)}>
          Adicionar Artista
        </button>
      </div>

      <ul>
        {artists.map(artist => (
          <li key={artist.artist_id} className={twMerge(liClasses, liClassName)}>
            <img src={artist.photo_url} alt={artist.name} className={twMerge(imgClasses, imgClassName)} />
            <div>
              <p className={pClasses}>{artist.name}</p>
              <p className={pClasses}>{artist.biography}</p>
              <button onClick={() => openEditModal(artist)} className="btn-edit">Editar</button>
              <button onClick={() => deleteArtist(artist.artist_id)} className="btn-delete">Remover</button>
            </div>
          </li>
        ))}
      </ul>

      <Modal isOpen={isModalOpen} onClose={closeEditModal}>
        <h2>Editar Artista</h2>
        <input
          type="text"
          name="name"
          value={editedArtist.name || ''}
          onChange={handleEditArtistChange}
          placeholder="Nome do Artista"
          className={pClasses}
        />
        <textarea
          name="biography"
          value={editedArtist.biography || ''}
          onChange={handleEditArtistChange}
          placeholder="Biografia"
          className={pClasses}
        />
        <input
          type="text"
          name="photo_url"
          value={editedArtist.photo_url || ''}
          onChange={handleEditArtistChange}
          placeholder="URL da Foto"
          className={pClasses}
        />
        <button onClick={updateArtist} className="btn-save">Salvar</button>
        <button onClick={closeEditModal} className="btn-close">Fechar</button>
      </Modal>
    </div>
  );
};
