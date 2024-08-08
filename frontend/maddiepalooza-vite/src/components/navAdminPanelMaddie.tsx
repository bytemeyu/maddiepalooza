import React from "react";
import { Nav } from "./basics/nav";
import { Link } from "react-router-dom";
//quando se utiliza o React Router para criar uma Single Page Application (SPA), você deve substituir as tags <a> pelo componente <Link> fornecido pelo React Router. link intercepta a navegação e, em vez de fazer uma nova solicitação HTTP para o servidor, ele manipula a navegação internamente utilizando a API de Histórico do navegador - isso resulta na mudança da URL sem recarregar a página inteira.

export const NavAdminPanelMaddie = () => {
    return (
        <>  
            <Nav className="" liClassName="font-anton-sc-regular text-amber-50 hover:bg-orange-500">
                <Link to="/adminpanel/performances" className=""><span>shows</span></Link>
                <Link to="/adminpanel/artists"><span>artistas</span></Link>
                <Link to="/adminpanel/stages"><span>palcos</span></Link>
                <Link to="/contact"><span>contato</span></Link>
            </Nav>
        </>
    )
};