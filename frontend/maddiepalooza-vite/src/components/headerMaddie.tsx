import React from "react";
import { Header } from "./basics/header";
import { Link } from "react-router-dom";
//quando se utiliza o React Router para criar uma Single Page Application (SPA), você deve substituir as tags <a> pelo componente <Link> fornecido pelo React Router. link intercepta a navegação e, em vez de fazer uma nova solicitação HTTP para o servidor, ele manipula a navegação internamente utilizando a API de Histórico do navegador - isso resulta na mudança da URL sem recarregar a página inteira.

export const HeaderMaddie = () => {
    return (
        <>
            <Header className="" h1ClassName="font-honk">
                <Link to="/"><span>Maddiepalooza</span></Link>
            </Header>
        </>
    )
};