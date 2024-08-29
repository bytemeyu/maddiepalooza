import React, { useState, useEffect } from "react";
import { Performance } from "../types/performance";
import { PerformancesListProps } from "../types/performancesList";
import { Stage } from "../types/stage";
import { Artist } from "../types/artist";
import { twMerge } from "tailwind-merge";

export const PerformancesList = ({
  liClassName,
  className,
  children,
  ...rest
}: PerformancesListProps) => {
  const [performances, setPerformances] = useState<Performance[]>([]);
  const [stages, setStages] = useState<Stage[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        //fetch performances:
        const performancesResponse = await fetch(
          "http://localhost:3000/api/performance"
        );
        const performancesJson = await performancesResponse.json();
        if (Array.isArray(performancesJson.data)) {
          setPerformances(performancesJson.data as Performance[]);
        } else {
          setPerformances([]);
        }

        //fetch stages:
        const stagesResponse = await fetch("http://localhost:3000/api/stage");
        const stagesJson = await stagesResponse.json();
        if (Array.isArray(stagesJson.data)) {
          setStages(stagesJson.data as Stage[]);
        } else {
          setStages([]);
        }

        //fetch artists:
        const artistsResponse = await fetch("http://localhost:3000/api/artist");
        const artistsJson = await artistsResponse.json();
        if (Array.isArray(artistsJson.data)) {
          setArtists(artistsJson.data as Artist[]);
        } else {
          setArtists([]);
        }
      } catch (error) {
        console.error(
          "Error fetching data (performances, stages and artists):",
          error
        );
        setPerformances([]);
        setStages([]);
        setArtists([]);
      }
    }

    fetchData();
  }, []);

  const getStageName = (stageId: number) => {
    const stage = stages.find((stage) => stage.stage_id === stageId);
    return stage ? stage.name : "Unknown Stage";
  };

  const getArtistName = (artistId: number) => {
    const artist = artists.find((artist) => artist.artist_id === artistId);
    return artist ? artist.name : "Unknown Artist";
  };

  const formatDate = (date: string | Date) => {
    if (typeof date === "string") {
      //se for string, presumimos que está no formato ISO e fazemos a conversão:
      const [year, month, day] = date.split("T")[0].split("-");
      return `${day}/${month}`;
    } else if (date instanceof Date) {
      //se for Date, formatamos diretamente:
      return `${date.getDate()}/${date.getMonth() + 1}`;
    }
    return "Invalid date";
  };

  const formatTime = (time: string | Date | undefined) => {
    if (!time) return "Invalid time";
    if (typeof time === "string") {
      const timePart = time.split("T")[1]?.split("Z")[0];
      if (timePart) {
        const [hours, minutes] = timePart.split(":");
        return `${hours}h${minutes}`;
      }
    } else if (time instanceof Date) {
      return `${time.getHours()}h${time.getMinutes()}`;
    }
    return "Invalid time";
  };

  const performancesListClasses = "flex justify-center items-center";
  const ulClasses = "text-center";
  const liClasses = "flex justify-center items-center my-6";
  const pPerformanceDateClasses = "text-center font-extrabold";
  const pClasses = "text-center";

  return (
    <div {...rest} className={twMerge(performancesListClasses, className)}>
      <ul className={ulClasses}>
        {performances.length > 0 ? (
          performances.map((performance) => (
            <li
              key={performance.performance_id}
              className={twMerge(liClasses, liClassName)}
            >
              <div>
                <p className={pPerformanceDateClasses}>
                  {formatDate(performance.date)}
                </p>
                <p className={pClasses}>
                  Palco{" "}
                  {performance.stage_id !== undefined
                    ? getStageName(performance.stage_id)
                    : "Palco Indefinido"}
                </p>
                <p className={pClasses}>{formatTime(performance.start_time)}</p>
                <p className={pClasses}>
                  {getArtistName(performance.artist_id)}
                </p>
              </div>
            </li>
          ))
        ) : (
          <p className="font-beiruti-english text-3xl text-amber-50">
            Nenhuma performance encontrada.
          </p>
        )}
      </ul>
    </div>
  );
};
