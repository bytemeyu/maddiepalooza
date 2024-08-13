import React, { createContext, useState, useContext } from "react";
import { AuthContextProps } from "../types/authContext";
import { AuthProviderProps } from "../types/authProvider";
import { Modal } from "../components/basics/modal";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = (props: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [authError, setAuthError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const login = async (username: string, password: string) => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    username, 
                    password 
                }),
                credentials: 'include' 
                //inclui cookies na resposta (?)
            });
    
            const data = await response.json();

            if (response.ok) {
                setIsAuthenticated(true);
                setAuthError(null);
                console.log('Login bem-sucedido');
            } else {
                setIsAuthenticated(false);
                setAuthError(data.message || 'Credenciais inválidas');                
                console.log('Credenciais inválidas:', data.error);

                setIsModalOpen(true);
                setTimeout(() => {
                    setIsModalOpen(false);
                }, 3000);
            }
        } catch (error) {
            setIsAuthenticated(false);
            setAuthError('Erro de autenticação');
            console.error('Erro de autenticação:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const logout = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/logout', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include' 
                //inclui cookies na requisição
            });

            if (response.ok) {
                setIsAuthenticated(false);
                setAuthError(null);
                console.log('Logout bem-sucedido');
            } else {
                console.error('Erro ao fazer logout');
            }
        } catch (error) {
            console.error('Erro de logout:', error);
        }
    };

    return (
        <>
            <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
                {props.children}
            </AuthContext.Provider>
        
            <Modal isOpen={isModalOpen} onClose={closeModal} innerDivClassName='w-full max-w-4xl p-4 my-5 mx-auto text-center flex flex-col space-y-4 bg-pink-500'>
                <p className="font-beiruti-english text-3xl text-amber-50">Usuário e/ou senha inválidos. Tente novamente.</p>
            </Modal>
        </>
    );

    //nesse return: <AuthContext.Provider> é um componente especial fornecido pelo React quando você cria um contexto com createContext (ele 'tem o nome' que você usou ao definir a constante de createContext). Esse, especificamente, veio do AuthContext que criei anteriormente usando createContext, portanto 'chama-se' AuthContext. value é uma prop do AuthContext.Provider, que define o valor do contexto que será fornecido para os componentes consumidores, ou seja, qualquer componente dentro do provedor pode acessar esse valor usando, nesse caso, useContext(AuthContext). children é uma prop especial que contém todos os componentes filhos que foram passados para este componente. Ele renderiza os componentes filhos dentro do AuthContext.Provider, o que permite que qualquer componente dentro dessa árvore possa acessar o valor do contexto fornecido.
};

export const useAuth = (): AuthContextProps => {
    //isso é uma função  que encapsula a lógica para acessar o contexto de autenticação, simplificando o acesso ao contexto de autenticação em componentes funcionais.
    const context = useContext(AuthContext);
    //chama useContext com AuthContext para obter o valor atual do contexto. context agora contém o valor fornecido por AuthContext.Provider se o componente estiver dentro de um AuthProvider (?).
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    //garante que o hook useAuth só seja usado dentro de um AuthProvider.
    return context;
    //Retorna o valor do contexto (context) se ele não for undefined. Ou seja, permite que o componente que usa useAuth acesse o estado de autenticação (isAuthenticated), a função de login (login) e a função de logout (logout).
};

