import React, { useState, useEffect } from "react";
import { User } from "../types/user";
import { twMerge } from "tailwind-merge";
import { UsersEditionListProps } from "../types/usersEditionList";
import { Modal } from "./basics/modal";
import { useAuth } from "../contexts/authContext";

export const UsersEditionList = ({
  divAddUserClassName,
  labelAddUserClassName,
  inputAddUserClassName,
  inputRoleAddUserClassName,
  buttonAddUserClassName,
  liClassName,
  buttonEditUserClassName,
  buttonRemoveUserClassName,
  className,
  children,
  ...rest
}: UsersEditionListProps) => {
  const { isAuthenticated, currentUser } = useAuth();
  //checa se o usuário está autenticado e obtém o papel do usuário atual do contexto de autenticação

  if (!isAuthenticated || !currentUser) {
    return <p>Você não está autenticado.</p>;
  }
  // Verifica se o currentUser é nulo

  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<Partial<User>>({
    email: "",
    username: "",
    password: "",
    role: currentUser.role === "producer" ? "assistant" : "", // Define o papel padrão dependendo do papel do usuário
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:3000/api/users", {
          method: "GET",
          credentials: "include",
        });
        const jsonResponse = await response.json();
        setUsers(jsonResponse.data as User[]);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  const addUser = async () => {
    if (newUser.password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      openErrorModal();
      return;
    }

    if (currentUser.role === "producer" && newUser.role !== "assistant") {
      setErrorMessage("Produtores só podem criar Assistentes.");
      openErrorModal();
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
        credentials: "include",
      });

      const jsonResponse = await response.json();

      if (response.ok) {
        setUsers((prev: User[]) => [...prev, jsonResponse.data]);
        setNewUser({
          email: "",
          username: "",
          password: "",
          role: currentUser.role === "producer" ? "assistant" : "",
        });
        setConfirmPassword("");
      } else {
        handleErrors(jsonResponse);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const updateUser = async () => {
    if (editedUser.user_id) {
      if (currentUser.role === "producer") {
        if (
          editedUser.role === "webadmin" ||
          (editedUser.role === "producer" &&
            editedUser.user_id !== currentUser.user_id)
        ) {
          setErrorMessage(
            "Produtores só podem alterar seu próprio perfil ou Assistentes."
          );
          openErrorModal();
          return;
        }
      } else if (
        currentUser.role === "assistant" &&
        editedUser.role !== "assistant"
      ) {
        setErrorMessage("Assistentes só podem alterar outros Assistentes.");
        openErrorModal();
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${editedUser.user_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editedUser),
            credentials: "include",
          }
        );

        const jsonResponse = await response.json();

        if (response.ok) {
          setUsers((prev: User[]) =>
            prev.map((user) =>
              user.user_id === jsonResponse.data.user_id
                ? jsonResponse.data
                : user
            )
          );
          closeEditModal();
        } else {
          handleErrors(jsonResponse);
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  const deleteUser = async (userId: number) => {
    const userToDelete = users.find((user) => user.user_id === userId);

    if (!userToDelete) {
      setErrorMessage("Usuário não encontrado.");
      openErrorModal();
      return;
    }

    if (currentUser.role === "producer" && userToDelete.role !== "assistant") {
      setErrorMessage("Produtores só podem deletar Assistentes.");
      openErrorModal();
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${userId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const jsonResponse = await response.json();

      if (response.ok) {
        setUsers((prev: User[]) =>
          prev.filter((user) => user.user_id !== userId)
        );
      } else {
        handleErrors(jsonResponse);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAddUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const openEditModal = (user: User) => {
    setEditedUser(user);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setEditedUser({});
    setIsModalOpen(false);
  };

  const openErrorModal = () => {
    setIsErrorModalOpen(true);
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const handleErrors = (jsonResponse: any) => {
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
  };

  const usersEditionListClasses = "";
  const divAddUserClasses =
    "w-full max-w-4xl p-4 my-5 mx-auto text-center flex flex-col space-y-4";
  const labelAddUserClasses = "inline-flex";
  const inputAddUserClasses = "h-10 w-2/5";
  const inputRoleAddUserClasses = "h-10 w-2/5";
  const buttonAddUserClasses =
    "text-xl md:text-xl px-3 py-2 mx-auto ml-auto shadow";
  const liClasses = "flex items-center my-4";
  const pClasses = "text-left";
  const buttonEditUserClasses =
    "text-xl md:text-xl px-3 py-2 mx-3 shadow mt-5 mb-5";
  const buttonRemoveUserClasses =
    "text-xl md:text-xl px-3 py-2 mx-3 shadow mt-5 mb-5";
  const divButtonsClasses = "flex justify-end w-full";
  const inputEditUserClasses = "h-10 w-2/5";
  const inputRoleEditUserClasses = "h-10 w-2/5";
  const buttonSaveEditUserClasses =
    "font-anton-sc-regular text-xl md:text-xl px-6 py-4 mx-auto ml-auto bg-orange-700";

  return (
    <div {...rest} className={twMerge(usersEditionListClasses, className)}>
      <div className={twMerge(divAddUserClasses, divAddUserClassName)}>
        <label
          htmlFor="email"
          className={twMerge(labelAddUserClasses, labelAddUserClassName)}
        >
          Email:
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleAddUserChange}
          className={twMerge(inputAddUserClasses, inputAddUserClassName)}
        />
        <label
          htmlFor="username"
          className={twMerge(labelAddUserClasses, labelAddUserClassName)}
        >
          Username:
        </label>
        <input
          type="text"
          name="username"
          value={newUser.username}
          onChange={handleAddUserChange}
          className={twMerge(inputAddUserClasses, inputAddUserClassName)}
        />
        <label
          htmlFor="password"
          className={twMerge(labelAddUserClasses, labelAddUserClassName)}
        >
          Senha:
        </label>
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleAddUserChange}
          className={twMerge(inputAddUserClasses, inputAddUserClassName)}
        />
        <label
          htmlFor="confirmPassword"
          className={twMerge(labelAddUserClasses, labelAddUserClassName)}
        >
          Confirmar Senha:
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={twMerge(inputAddUserClasses, inputAddUserClassName)}
        />
        {currentUser.role !== "assistant" && (
          <>
            <label
              htmlFor="role"
              className={twMerge(labelAddUserClasses, labelAddUserClassName)}
            >
              Role:
            </label>
            <select
              name="role"
              value={newUser.role}
              onChange={handleAddUserChange}
              className={twMerge(
                inputRoleAddUserClasses,
                inputRoleAddUserClassName
              )}
              disabled={
                currentUser.role === "producer" && newUser.role !== "assistant"
              }
            >
              {currentUser.role === "webadmin" && (
                <>
                  <option value="webadmin">Web Admin</option>
                  <option value="producer">Producer</option>
                </>
              )}
              <option value="assistant">Assistant</option>
            </select>
          </>
        )}
        <button
          onClick={addUser}
          className={twMerge(buttonAddUserClasses, buttonAddUserClassName)}
        >
          Adicionar
        </button>
      </div>

      <ul>
        {users && users.length > 0 ? (
          users.map((user) => (
            <li key={user.user_id} className={twMerge(liClasses, liClassName)}>
              <div>
                <p className={pClasses}>{user.username}</p>
                <p className={pClasses}>{user.email}</p>
                <p className={pClasses}>{user.role}</p>
                <div className={divButtonsClasses}>
                  <button
                    onClick={() => openEditModal(user)}
                    className={twMerge(
                      buttonEditUserClasses,
                      buttonEditUserClassName
                    )}
                    disabled={
                      (currentUser.role === "producer" &&
                        (user.role === "webadmin" ||
                          (user.role === "producer" &&
                            user.user_id !== currentUser.user_id))) ||
                      (currentUser.role === "assistant" &&
                        user.role !== "assistant")
                    }
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteUser(user.user_id)}
                    className={twMerge(
                      buttonRemoveUserClasses,
                      buttonRemoveUserClassName
                    )}
                    disabled={
                      currentUser.role === "producer" &&
                      user.role !== "assistant"
                    }
                  >
                    Remover
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>Nenhum usuário encontrado.</p>
        )}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onClose={closeEditModal}
        innerDivClassName="w-full max-w-4xl p-4 my-5 mx-auto text-center flex flex-col space-y-4 bg-orange-500"
      >
        <input
          type="text"
          name="username"
          value={editedUser.username || ""}
          onChange={handleEditUserChange}
          className={inputEditUserClasses}
        />
        <input
          type="email"
          name="email"
          value={editedUser.email || ""}
          onChange={handleEditUserChange}
          className={inputEditUserClasses}
        />
        <select
          name="role"
          value={editedUser.role}
          onChange={handleEditUserChange}
          className={inputRoleEditUserClasses}
          disabled={
            (currentUser.role === "producer" &&
              (editedUser.role === "webadmin" ||
                (editedUser.role === "producer" &&
                  editedUser.user_id !== currentUser.user_id))) ||
            (currentUser.role === "assistant" &&
              editedUser.role !== "assistant")
          }
        >
          {currentUser.role === "webadmin" && (
            <>
              <option value="webadmin">Web Admin</option>
              <option value="producer">Producer</option>
            </>
          )}
          <option value="assistant">Assistant</option>
        </select>
        <button onClick={updateUser} className={buttonSaveEditUserClasses}>
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
