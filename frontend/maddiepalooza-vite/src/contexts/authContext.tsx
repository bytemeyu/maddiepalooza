import React, { createContext, useState, useContext } from "react";
import { AuthContextProps } from "../types/authContext";
import { AuthProviderProps } from "../types/authProvider";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = (props: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

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
                })
            });
    
            if (response.ok) {
                setIsAuthenticated(true);
                console.log('Login bem-sucedido');
            } else {
                setIsAuthenticated(false);
                const data = await response.json();
                console.log('Credenciais inválidas:', data.message);
            }
        } catch (error) {
            setIsAuthenticated(false);
            console.error('Erro de autenticação:', error);
        }
    };

    const logout = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/logout', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setIsAuthenticated(false);
                console.log('Logout bem-sucedido');
            } else {
                console.error('Erro ao fazer logout');
            }
        } catch (error) {
            console.error('Erro de logout:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {props.children}
        </AuthContext.Provider>
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

