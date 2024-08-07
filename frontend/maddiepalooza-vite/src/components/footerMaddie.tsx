import React from "react";
import { Footer } from "./basics/footer";
import { Link } from "react-router-dom";
//quando se utiliza o React Router para criar uma Single Page Application (SPA), você deve substituir as tags <a> pelo componente <Link> fornecido pelo React Router. link intercepta a navegação e, em vez de fazer uma nova solicitação HTTP para o servidor, ele manipula a navegação internamente utilizando a API de Histórico do navegador - isso resulta na mudança da URL sem recarregar a página inteira.

export const FooterMaddie = () => {
    return (
        <>
            <Footer className="" liClassName="font-beiruti-english text-amber-50" pClassName="font-beiruti-english text-lg text-amber-50" companyName='bytemeyu' currentYear='2024'>
                <Link to="/aboutus"><span className="text-xl">Sobre nós</span></Link>
                <Link to="/privacypolicy"><span className="text-xl">Política de privacidade</span></Link>
                <Link to="/contact"><span className="text-xl">Contato</span></Link>
                <Link to="/adminpanel"><span className="text-xl">Painel de Administração</span></Link>
            </Footer>
        </>
    )
};