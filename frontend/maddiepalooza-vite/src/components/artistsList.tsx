import React, { useState, useEffect } from "react";
import { Artist } from "../types/artist";
import { ArtistsListProps } from "../types/artistsList";
import { twMerge } from "tailwind-merge";

export const ArtistsList = ({
  liClassName,
  imgClassName,
  className,
  children,
  ...rest
}: ArtistsListProps) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    async function fetchArtists() {
      try {
        const response = await fetch(`${apiUrl}/api/artist`);
        const jsonResponse = await response.json();
        if (jsonResponse.success && Array.isArray(jsonResponse.data)) {
          setArtists(jsonResponse.data as Artist[]);
          //afinal o array com os artistas está dentro do objeto 'data' na resposta do fetch
        } else {
          console.warn(
            "No artists found or unexpected data structure:",
            jsonResponse.data
          );
          setArtists([]); // Define `artists` como um array vazio se não houver artistas
        }
      } catch (error) {
        console.error("Error fetching artists:", error);
        setArtists([]); // Define `artists` como um array vazio em caso de erro
      }
    }

    fetchArtists();
  }, []);
  //Usar useState e useEffect para gerenciar a lista de artistas dá ao componente controle total sobre os dados e sua apresentação, permitindo que ele responda a mudanças de estado de forma eficiente e mantenha a interface do usuário sincronizada com as atualizações de dados. Ao armazenar dados como a lista de artistas no estado local, você não apenas melhora a eficiência e a resposta da interface do usuário, mas também pode ajudar a economizar largura de banda e reduzir o payload, resultando em menos tráfego de rede e potencialmente menor carga nos servidores backend.

  const artistsListClasses = "";
  const liClasses = "flex items-center my-6";
  const imgClasses = "w-24 h-24 mr-4 rounded-full";
  const pArtistNameClasses = "text-left font-extrabold";
  const pClasses = "text-left";

  return (
    <div {...rest} className={twMerge(artistsListClasses, className)}>
      <ul>
        {artists.length > 0 ? (
          artists.map((artist) => (
            <li
              key={artist.artist_id}
              className={twMerge(liClasses, liClassName)}
            >
              <img
                src={artist.photo_url}
                alt={artist.name}
                className={twMerge(imgClasses, imgClassName)}
              />
              <div>
                <p className={pArtistNameClasses}>{artist.name}</p>
                <p className={pClasses}>{artist.biography}</p>
              </div>
            </li>
          ))
        ) : (
          <p className="font-beiruti-english text-3xl text-amber-50">
            Nenhum artista encontrado.
          </p>
        )}
      </ul>
    </div>
  );
};
