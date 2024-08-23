import React, { useState, useEffect } from "react";
import { Stage } from "../types/stage";
import { twMerge } from "tailwind-merge";
import { StagesEditionListProps } from "../types/stagesEditionList";
import { Modal } from "./basics/modal";

export const StagesEditionList = ({
  divAddStageClassName,
  labelAddStageClassName,
  inputAddStageClassName,
  inputLocationAddStageClassName,
  buttonAddStageClassName,
  liClassName,
  buttonEditStageClassName,
  buttonRemoveStageClassName,
  className,
  children,
  ...rest
}: StagesEditionListProps) => {
  const [stages, setStages] = useState<Stage[]>([]);
  const [newStage, setNewStage] = useState<Partial<Stage>>({
    name: "",
    location: "",
    capacity: undefined,
  });
  const [editedStage, setEditedStage] = useState<Partial<Stage>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStages() {
      try {
        const response = await fetch("http://localhost:3000/api/stage");
        const jsonResponse = await response.json();
        if (jsonResponse.success && Array.isArray(jsonResponse.data)) {
          setStages(jsonResponse.data as Stage[]);
        } else {
          console.warn(
            "No stages found or unexpected data structure:",
            jsonResponse.data
          );
          setStages([]);
        }
      } catch (error) {
        console.error("Error fetching stages:", error);
        setStages([]);
      }
    }

    fetchStages();
  }, []);

  const addStage = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/stage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStage),
        credentials: "include",
      });

      const jsonResponse = await response.json();

      if (response.ok) {
        setStages((prev) => [...prev, jsonResponse.data]);
        setNewStage({ name: "", location: "", capacity: null });
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
      console.error("Error adding stage:", error);
    }
  };

  const updateStage = async () => {
    if (editedStage.stage_id) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/stage/${editedStage.stage_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editedStage),
            credentials: "include",
          }
        );

        const jsonResponse = await response.json();

        if (response.ok) {
          setStages((prev) =>
            prev.map((stage) =>
              stage.stage_id === jsonResponse.data.stage_id
                ? jsonResponse.data
                : stage
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
        console.error("Error updating stage:", error);
      }
    }
  };

  const deleteStage = async (stageId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/stage/${stageId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const jsonResponse = await response.json();

      if (response.ok) {
        setStages((prev) => prev.filter((stage) => stage.stage_id !== stageId));
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
      console.error("Error deleting stage:", error);
    }
  };

  const handleAddStageChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewStage((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditStageChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedStage((prev) => ({ ...prev, [name]: value }));
  };

  const openEditModal = (stage: Stage) => {
    setEditedStage(stage);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setEditedStage({});
    setIsModalOpen(false);
  };

  const openErrorModal = () => {
    setIsErrorModalOpen(true);
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const stagesEditionListClasses = "";
  const divAddStageClasses =
    "w-full max-w-4xl p-4 my-5 mx-auto text-center flex flex-col space-y-4";
  const labelAddStageClasses = "inline-flex";
  const inputAddStageClasses = "h-10 w-2/5";
  const inputLocationAddStageClasses = "h-10 w-4/5";
  const buttonAddStageClasses =
    "text-xl md:text-xl px-3 py-2 mx-auto ml-auto shadow";
  const liClasses = "flex items-center my-4";
  const pClasses = "text-left";
  const buttonEditStageClasses =
    "text-xl md:text-xl px-3 py-2 mx-3 shadow mt-5 mb-5";
  const buttonRemoveStageClasses =
    "text-xl md:text-xl px-3 py-2 mx-3 shadow mt-5 mb-5";
  const divButtonsClasses = "flex justify-end w-full";
  const inputEditStageClasses = "h-10 w-2/5";
  const inputLocationEditStageClasses = "h-10 w-4/5";

  const buttonSaveEditStageClasses =
    "font-anton-sc-regular text-xl md:text-xl px-6 py-4 mx-auto ml-auto bg-orange-700";

  return (
    <div {...rest} className={twMerge(stagesEditionListClasses, className)}>
      <div className={twMerge(divAddStageClasses, divAddStageClassName)}>
        <label
          htmlFor="name"
          className={twMerge(labelAddStageClasses, labelAddStageClassName)}
        >
          Nome do Palco:
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={newStage.name}
          onChange={handleAddStageChange}
          className={twMerge(inputAddStageClasses, inputAddStageClassName)}
        />
        <label
          htmlFor="location"
          className={twMerge(labelAddStageClasses, labelAddStageClassName)}
        >
          Localização:
        </label>
        <input
          id="location"
          type="text"
          name="location"
          value={newStage.location}
          onChange={handleAddStageChange}
          className={twMerge(
            inputLocationAddStageClasses,
            inputLocationAddStageClassName
          )}
        />
        <label
          htmlFor="capacity"
          className={twMerge(labelAddStageClasses, labelAddStageClassName)}
        >
          Capacidade:
        </label>
        <input
          type="number"
          name="capacity"
          value={newStage.capacity ?? ""}
          //?? "": Se newStage.capacity for null ou undefined, o operador ?? retornará o valor à direita, que é uma string vazia "". Caso contrário, retornará o valor de newStage.capacity.
          onChange={handleAddStageChange}
          className={twMerge(inputAddStageClasses, inputAddStageClassName)}
        />
        <button
          onClick={addStage}
          className={twMerge(buttonAddStageClasses, buttonAddStageClassName)}
        >
          Adicionar
        </button>
      </div>

      <ul>
        {stages.length > 0 ? (
          stages.map((stage) => (
            <li
              key={stage.stage_id}
              className={twMerge(liClasses, liClassName)}
            >
              <div>
                <p className={pClasses}>{stage.name}</p>
                <p className={pClasses}>{stage.location}</p>
                <p className={pClasses}>{stage.capacity}</p>
                <div className={divButtonsClasses}>
                  <button
                    onClick={() => openEditModal(stage)}
                    className={twMerge(
                      buttonEditStageClasses,
                      buttonEditStageClassName
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
                    onClick={() => deleteStage(stage.stage_id)}
                    className={twMerge(
                      buttonRemoveStageClasses,
                      buttonRemoveStageClassName
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
          <p>Nenhum palco encontrado.</p>
        )}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onClose={closeEditModal}
        innerDivClassName="w-full max-w-4xl p-4 my-5 mx-auto text-center flex flex-col space-y-4 bg-orange-500"
      >
        <input
          type="text"
          name="name"
          value={editedStage.name || ""}
          onChange={handleEditStageChange}
          className={inputEditStageClasses}
        />
        <textarea
          name="location"
          value={editedStage.location || ""}
          onChange={handleEditStageChange}
          className={inputLocationEditStageClasses}
        />
        <input
          type="text"
          name="capacity"
          value={editedStage.capacity || ""}
          onChange={handleEditStageChange}
          className={inputEditStageClasses}
        />
        <button onClick={updateStage} className={buttonSaveEditStageClasses}>
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
