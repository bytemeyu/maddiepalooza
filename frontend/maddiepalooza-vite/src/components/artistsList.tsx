import React, { useState, useEffect } from 'react';
import { Artist } from '../types/artist';
import { ArtistsListProps } from '../types/artistsList';
import { twMerge } from 'tailwind-merge';

export const ArtistsList = ({ liClassName, imgClassName, className, children, ...rest }: ArtistsListProps) => {
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    async function fetchArtists() {
      try {
        const response = await fetch('http://localhost:3000/api/artist');
        const jsonResponse = await response.json();
        setArtists(jsonResponse.data as Artist[]);
        //afinal o array com os artistas está dentro do objeto 'data' na resposta do fetch
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    }

    fetchArtists();
  }, []);
  //Usar useState e useEffect para gerenciar a lista de artistas dá ao componente controle total sobre os dados e sua apresentação, permitindo que ele responda a mudanças de estado de forma eficiente e mantenha a interface do usuário sincronizada com as atualizações de dados. Ao armazenar dados como a lista de artistas no estado local, você não apenas melhora a eficiência e a resposta da interface do usuário, mas também pode ajudar a economizar largura de banda e reduzir o payload, resultando em menos tráfego de rede e potencialmente menor carga nos servidores backend.

  const artistsListClasses = '';
  const liClasses = 'flex items-center my-6';
  const imgClasses = 'w-24 h-24 mr-4 rounded-full';
  const pArtistNameClasses = 'text-left font-extrabold';
  const pClasses = 'text-left';

  return (
    <div {...rest} className={twMerge(artistsListClasses, className)}>
      <ul>
        {artists.map(artist => (
            <li key={artist.artist_id} className={twMerge(liClasses, liClassName)}>
                <img src={artist.photo_url} alt={artist.name} className={twMerge(imgClasses, imgClassName)}/>
                <div>
                  <p className={pArtistNameClasses}>
                    {artist.name}
                  </p>
                  <p className={pClasses}>
                    {artist.biography}
                  </p>
                </div>
            </li>
        ))}
      </ul>
    </div>
  );
}
