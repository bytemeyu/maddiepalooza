import React, { useEffect } from "react";
import { Header } from "../components/basics/header";
import { Nav } from "../components/basics/nav";
import { Section } from "../components/basics/section";
import { Footer } from "../components/basics/footer";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { LogoutButton } from "../components/basics/logoutButton";

export const AdminPanel = () => {
    const { isAuthenticated } = useAuth();
    //(?) ver depois

    useEffect(() => {
        document.body.style.backgroundColor = isAuthenticated ? '#696969' : '';
        //se o usuário estiver autenticado, a cor do body fica diferente.

        return () => {
            document.body.style.backgroundColor = '';
            //ao desmontar o componente ou deslogar desfaz a modificação.
        };
    }, [isAuthenticated]);

    return (
        <>
            <Header className="" h1ClassName="font-honk">Maddiepalooza</Header>
            
            <Nav className="" liClassName="font-anton-sc-regular text-amber-50 hover:bg-orange-500">
                <Link to="/adminpanel/performances" className=""><span>shows</span></Link>
                <Link to="/adminpanel/artists"><span>artistas</span></Link>
                <Link to="/adminpanel/stages"><span>palcos</span></Link>
                <Link to="/home"><span>contato</span></Link>
            </Nav>

            <Section className="">
                <p className="font-beiruti-english text-3xl text-amber-50">Bem-vindo ao painel de administração!</p>
                <p className="font-beiruti-english text-3xl text-amber-50">Clique, no menu de navegação, na área que deseja editar.</p>
                <p className="font-beiruti-english text-3xl text-amber-50">A saber: Shows, Artistas, Palcos.</p>
            </Section>

            <LogoutButton className="font-beiruti-english text-amber-50 bg-orange-500">Sair</LogoutButton>

            <Footer className="" liClassName="font-beiruti-english text-amber-50" pClassName="font-beiruti-english text-lg text-amber-50" companyName='bytemeyu' currentYear='2024'>
                <Link to="/home"><span className="text-xl">Sobre nós</span></Link>
                <Link to="/home"><span className="text-xl">Política de privacidade</span></Link>
                <Link to="/home"><span className="text-xl">Contato</span></Link>
                <Link to="/adminpanel"><span className="text-xl">Painel de Administração</span></Link>
            </Footer>
        </>
    )
};