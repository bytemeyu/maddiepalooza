import React, { useState, useEffect } from "react";
import { Performance } from "../types/performance";
import { PerformancesEditionListProps } from "../types/performancesEditionList";
import { twMerge } from "tailwind-merge";
import { Modal } from "./basics/modal";
import { Stage } from "../types/stage";
import { Artist } from "../types/artist";

export const PerformancesEditionList = ({
  divAddPerformanceClassName,
  labelAddPerformanceClassName,
  selectAddPerformanceClassName,
  inputDateAddPerformanceClassName,
  buttonAddPerformanceClassName,
  liClassName,
  buttonEditPerformanceClassName,
  buttonRemovePerformanceClassName,
  className,
  children,
  ...rest
}: PerformancesEditionListProps) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [performances, setPerformances] = useState<Performance[]>([]);
  const [stages, setStages] = useState<Stage[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [newPerformance, setNewPerformance] = useState<Partial<Performance>>({
    artist_id: 0,
    stage_id: 0,
    start_time: "",
    end_time: "",
    date: "",
  });
  const [editedPerformance, setEditedPerformance] = useState<
    Partial<Performance>
  >({
    artist_id: 0,
    stage_id: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        //fetch performances:
        const performancesResponse = await fetch(`${apiUrl}/api/performance`);
        const performancesJson = await performancesResponse.json();
        if (Array.isArray(performancesJson.data)) {
          setPerformances(performancesJson.data as Performance[]);
        } else {
          setPerformances([]);
        }

        //fetch stages:
        const stagesResponse = await fetch(`${apiUrl}/api/stage`);
        const stagesJson = await stagesResponse.json();
        if (Array.isArray(stagesJson.data)) {
          setStages(stagesJson.data as Stage[]);
        } else {
          setStages([]);
        }

        //fetch artists:
        const artistsResponse = await fetch(`${apiUrl}/api/artist`);
        const artistsJson = await artistsResponse.json();
        if (Array.isArray(artistsJson.data)) {
          setArtists(artistsJson.data as Artist[]);
        } else {
          setArtists([]);
        }
      } catch (error) {
        console.error(
          "Error fetching data (performances, stages, and artists):",
          error
        );
        setPerformances([]);
        setStages([]);
        setArtists([]);
      }
    }

    fetchData();
  }, []);

  const handleAddPerformanceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewPerformance((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditPerformanceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedPerformance((prev) => ({ ...prev, [name]: value }));
  };

  const addPerformance = async () => {
    const combinedStartTime = `${newPerformance.date}T${newPerformance.start_time}`;
    const combinedEndTime = `${newPerformance.date}T${newPerformance.end_time}`;

    const performanceToSubmit = {
      ...newPerformance,
      start_time: combinedStartTime,
      end_time: combinedEndTime,
    };

    try {
      const response = await fetch(`${apiUrl}/api/performance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(performanceToSubmit),
        credentials: "include",
      });

      const jsonResponse = await response.json();

      if (response.ok) {
        setPerformances((prev) => [...prev, jsonResponse.data]);
        setNewPerformance({
          artist_id: 0,
          stage_id: 0,
          start_time: "",
          end_time: "",
          date: "",
        });
      } else {
        const errors = jsonResponse.errors;
        if (Array.isArray(errors)) {
          setErrorMessage(errors.map((err) => `${err.msg}`).join(", "));
        } else if (jsonResponse.error) {
          setErrorMessage(jsonResponse.error);
        } else {
          setErrorMessage("Ocorreu um erro inesperado.");
        }
        openErrorModal();
        setTimeout(() => {
          closeErrorModal();
        }, 5000);
      }
    } catch (error) {
      console.error("Error adding performance:", error);
    }
  };

  const updatePerformance = async () => {
    if (editedPerformance.performance_id) {
      const combinedStartTime = `${editedPerformance.date}T${editedPerformance.start_time}`;
      const combinedEndTime = `${editedPerformance.date}T${editedPerformance.end_time}`;

      const performanceToSubmit = {
        ...editedPerformance,
        start_time: combinedStartTime,
        end_time: combinedEndTime,
      };

      try {
        const response = await fetch(
          `${apiUrl}/api/performance/${editedPerformance.performance_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(performanceToSubmit),
            credentials: "include",
          }
        );

        const jsonResponse = await response.json();

        if (response.ok) {
          setPerformances((prev) =>
            prev.map((performance) =>
              performance.performance_id === jsonResponse.data.performance_id
                ? jsonResponse.data
                : performance
            )
          );
          closeEditModal();
        } else {
          const errors = jsonResponse.errors;
          if (Array.isArray(errors)) {
            setErrorMessage(errors.map((err) => `${err.msg}`).join(", "));
          } else if (jsonResponse.error) {
            setErrorMessage(jsonResponse.error);
          } else {
            setErrorMessage("Ocorreu um erro inesperado.");
          }
          openErrorModal();
          setTimeout(() => {
            closeErrorModal();
          }, 5000);
        }
      } catch (error) {
        console.error("Error updating performance:", error);
      }
    }
  };

  const deletePerformance = async (performanceId: number) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/performance/${performanceId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const jsonResponse = await response.json();

      if (response.ok) {
        setPerformances((prev) =>
          prev.filter(
            (performance) => performance.performance_id !== performanceId
          )
        );
      } else {
        const errors = jsonResponse.errors;
        if (Array.isArray(errors)) {
          setErrorMessage(errors.map((err) => `${err.msg}`).join(", "));
        } else if (jsonResponse.error) {
          setErrorMessage(jsonResponse.error);
        } else {
          setErrorMessage("Ocorreu um erro inesperado.");
        }
        openErrorModal();
        setTimeout(() => {
          closeErrorModal();
        }, 5000);
      }
    } catch (error) {
      console.error("Error deleting performance:", error);
    }
  };

  const openEditModal = (performance: Performance) => {
    setEditedPerformance(performance);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setEditedPerformance({});
    setIsModalOpen(false);
  };

  const openErrorModal = () => {
    setIsErrorModalOpen(true);
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

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
      const [year, month, day] = date.split("T")[0].split("-");
      return `${day}/${month}/${year}`;
    } else if (date instanceof Date) {
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
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

  const performancesEditionListClasses = "";
  const divAddPerformanceClasses =
    "w-full max-w-4xl p-4 my-5 mx-auto text-center flex flex-col space-y-4";
  const labelAddPerformanceClasses = "inline-flex";
  const selectAddPerformanceClasses = "h-10 w-3/5";
  const inputDateAddPerformanceClasses = "h-10 w-2/5";
  const buttonAddPerformanceClasses =
    "text-xl md:text-xl px-3 py-2 mx-auto ml-auto shadow";
  const liClasses = "flex items-center my-4";
  const pClasses = "text-left";
  const buttonEditPerformanceClasses =
    "text-xl md:text-xl px-3 py-2 mx-3 shadow mt-5 mb-5";
  const buttonRemovePerformanceClasses =
    "text-xl md:text-xl px-3 py-2 mx-3 shadow mt-5 mb-5";
  const divButtonsClasses = "flex justify-end w-full";
  const selectEditPerformanceClasses = "h-10 w-3/5";
  const inputDateEditPerformanceClasses = "h-10 w-2/5";
  const buttonSaveEditPerformanceClasses =
    "text-xl md:text-xl px-6 py-4 mx-auto ml-auto bg-orange-700";

  return (
    <div
      {...rest}
      className={twMerge(performancesEditionListClasses, className)}
    >
      <div
        className={twMerge(
          divAddPerformanceClasses,
          divAddPerformanceClassName
        )}
      >
        <label
          htmlFor="artist_id"
          className={twMerge(
            labelAddPerformanceClasses,
            labelAddPerformanceClassName
          )}
        >
          Artista:
        </label>
        <select
          id="artist_id"
          name="artist_id"
          value={newPerformance.artist_id}
          onChange={handleAddPerformanceChange}
          className={twMerge(
            selectAddPerformanceClasses,
            selectAddPerformanceClassName
          )}
        >
          <option value={0}>Selecione um artista</option>
          {artists.map((artist) => (
            <option key={artist.artist_id} value={artist.artist_id}>
              {artist.name}
            </option>
          ))}
        </select>

        <label
          htmlFor="stage_id"
          className={twMerge(
            labelAddPerformanceClasses,
            labelAddPerformanceClassName
          )}
        >
          Palco:
        </label>
        <select
          id="stage_id"
          name="stage_id"
          value={newPerformance.stage_id ?? ""}
          onChange={handleAddPerformanceChange}
          className={twMerge(
            selectAddPerformanceClasses,
            selectAddPerformanceClassName
          )}
        >
          <option value="">Selecione um palco</option>
          {stages.map((stage) => (
            <option key={stage.stage_id} value={stage.stage_id}>
              {stage.name}
            </option>
          ))}
        </select>

        <label
          htmlFor="start_time"
          className={twMerge(
            labelAddPerformanceClasses,
            labelAddPerformanceClassName
          )}
        >
          Hora de Início:
        </label>
        <input
          id="start_time"
          type="time"
          name="start_time"
          value={newPerformance.start_time as string}
          onChange={handleAddPerformanceChange}
          className={twMerge(
            inputDateAddPerformanceClasses,
            inputDateAddPerformanceClassName
          )}
        />

        <label
          htmlFor="end_time"
          className={twMerge(
            labelAddPerformanceClasses,
            labelAddPerformanceClassName
          )}
        >
          Hora de Término:
        </label>
        <input
          id="end_time"
          type="time"
          name="end_time"
          value={newPerformance.end_time as string}
          onChange={handleAddPerformanceChange}
          className={twMerge(
            inputDateAddPerformanceClasses,
            inputDateAddPerformanceClassName
          )}
        />

        <label
          htmlFor="date"
          className={twMerge(
            labelAddPerformanceClasses,
            labelAddPerformanceClassName
          )}
        >
          Data:
        </label>
        <input
          id="date"
          type="date"
          name="date"
          value={newPerformance.date as string}
          onChange={handleAddPerformanceChange}
          className={twMerge(
            inputDateAddPerformanceClasses,
            inputDateAddPerformanceClassName
          )}
        />

        <button
          onClick={addPerformance}
          className={twMerge(
            buttonAddPerformanceClasses,
            buttonAddPerformanceClassName
          )}
        >
          Adicionar
        </button>
      </div>

      <ul>
        {performances.length > 0 ? (
          performances.map((performance) => (
            <li
              key={performance.performance_id}
              className={twMerge(liClasses, liClassName)}
            >
              <div>
                <p className={pClasses}>{formatDate(performance.date)}</p>
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
                <div className={divButtonsClasses}>
                  <button
                    onClick={() => openEditModal(performance)}
                    className={twMerge(
                      buttonEditPerformanceClasses,
                      buttonEditPerformanceClassName
                    )}
                  >
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M3 17.25V21h3.75l13.44-13.44-3.75-3.75L3 17.25zM20.7 7.7a1.25 1.25 0 0 0 0-1.77L18.07 3.15a1.25 1.25 0 0 0-1.77 0l-2.34 2.34 3.75 3.75 2.34-2.34z" />
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      deletePerformance(performance.performance_id)
                    }
                    className={twMerge(
                      buttonRemovePerformanceClasses,
                      buttonRemovePerformanceClassName
                    )}
                  >
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M6 2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1h5a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1.618l-.58 13.453a2 2 0 0 1-1.99 1.847H5.998a2 2 0 0 1-1.99-1.847L3.428 5H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h5V2zm2 0v1h10V2H8zm-6 3h15.278l.536 12.645a1 1 0 0 0 1 .91h.02a1 1 0 0 0 1-.91L21.5 5H5.5L2 5zm7 6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1 1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1 1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1z" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>Nenhuma performance encontrada.</p>
        )}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onClose={closeEditModal}
        innerDivClassName="w-full max-w-4xl p-4 my-5 mx-auto text-center flex flex-col space-y-4 bg-orange-500"
      >
        <select
          id="artist_id"
          name="artist_id"
          value={editedPerformance.artist_id}
          onChange={handleEditPerformanceChange}
          className={selectEditPerformanceClasses}
        >
          <option value={0}>Selecione um artista</option>
          {artists.map((artist) => (
            <option key={artist.artist_id} value={artist.artist_id}>
              {artist.name}
            </option>
          ))}
        </select>

        <select
          id="stage_id"
          name="stage_id"
          value={editedPerformance.stage_id ?? ""}
          onChange={handleEditPerformanceChange}
          className={selectEditPerformanceClasses}
        >
          <option value="">Selecione um palco</option>
          {stages.map((stage) => (
            <option key={stage.stage_id} value={stage.stage_id}>
              {stage.name}
            </option>
          ))}
        </select>

        <input
          id="start_time"
          type="time"
          name="start_time"
          value={editedPerformance.start_time as string}
          onChange={handleEditPerformanceChange}
          className={twMerge(
            inputDateEditPerformanceClasses,
            inputDateAddPerformanceClassName
          )}
        />

        <input
          id="end_time"
          type="time"
          name="end_time"
          value={editedPerformance.end_time as string}
          onChange={handleEditPerformanceChange}
          className={twMerge(
            inputDateEditPerformanceClasses,
            inputDateAddPerformanceClassName
          )}
        />

        <input
          id="date"
          type="date"
          name="date"
          value={editedPerformance.date as string}
          onChange={handleEditPerformanceChange}
          className={twMerge(
            inputDateEditPerformanceClasses,
            inputDateAddPerformanceClassName
          )}
        />

        <button
          onClick={updatePerformance}
          className={twMerge(buttonSaveEditPerformanceClasses)}
        >
          Salvar
        </button>
      </Modal>

      <Modal
        isOpen={isErrorModalOpen}
        onClose={closeErrorModal}
        innerDivClassName="w-full max-w-4xl p-4 my-5 mx-auto text-center flex flex-col space-y-4 bg-orange-500"
      >
        <p className="font-beiruti-english text-3xl text-amber-50">
          Erro(s): {errorMessage}
        </p>
      </Modal>
    </div>
  );
};
