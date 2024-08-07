import React, { useEffect } from "react";
import { HeaderMaddie } from "../components/headerMaddie";
import { NavAdminPanelMaddie } from "../components/navAdminPanelMaddie";
import { Section } from "../components/basics/section";
import { useAuth } from "../contexts/authContext";
import { LogoutButton } from "../components/basics/logoutButton";
import { FooterMaddie } from "../components/footerMaddie";

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
            <HeaderMaddie isAuthenticated={isAuthenticated} />
            
            <NavAdminPanelMaddie />

            <Section className="">
                <p className="font-beiruti-english text-3xl text-amber-50">Bem-vindo ao painel de administração!</p>
                <p className="font-beiruti-english text-3xl text-amber-50">Clique, no menu de navegação, na área que deseja editar.</p>
                <p className="font-beiruti-english text-3xl text-amber-50">A saber: "Shows", "Artistas", "Palcos".</p>
                <p className="font-beiruti-english text-3xl text-amber-50">Clique em "Usuários" para visualizar e editar os usuários do sistema.</p>
            </Section>

            <LogoutButton className="font-beiruti-english bg-orange-500">Sair</LogoutButton>

           <FooterMaddie isAuthenticated={isAuthenticated} />
        </>
    )
};