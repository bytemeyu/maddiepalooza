import React from "react";
import { Header } from "./basics/header";
import { HeaderMaddieProps } from "../types/headerMaddie";
import { Link } from "react-router-dom";
//quando se utiliza o React Router para criar uma Single Page Application (SPA), você deve substituir as tags <a> pelo componente <Link> fornecido pelo React Router. link intercepta a navegação e, em vez de fazer uma nova solicitação HTTP para o servidor, ele manipula a navegação internamente utilizando a API de Histórico do navegador - isso resulta na mudança da URL sem recarregar a página inteira.

export const HeaderMaddie = ({ isAuthenticated = false, className, children, ...rest }: HeaderMaddieProps) => {
    return (
        <>
            <Header className="" h1ClassName="font-honk">
                <Link 
                    to="/" 
                    className={` ${isAuthenticated ? "pointer-events-none cursor-default" : ""}`}
                >
                    <span>Maddiepalooza</span>
                </Link>
            </Header>
        </>
    )
};