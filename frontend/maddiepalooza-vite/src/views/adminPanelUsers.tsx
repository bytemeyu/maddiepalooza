import React, { useEffect } from "react";
import { HeaderMaddie } from "../components/headerMaddie.tsx";
import { NavAdminPanelMaddie } from "../components/navAdminPanelMaddie.tsx";
import { Section } from "../components/basics/section.tsx";

import { useAuth } from "../contexts/authContext.tsx";
import { LogoutButton } from "../components/basics/logoutButton.tsx";
import { FooterMaddie } from "../components/footerMaddie.tsx";

export const AdminPanelUsers = () => {
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        document.body.style.backgroundColor = isAuthenticated ? '#696969' : '';

        return () => {
            document.body.style.backgroundColor = '';
        };
    }, [isAuthenticated]);

    return (
        <>
            <HeaderMaddie isAuthenticated={isAuthenticated} />
            
            <NavAdminPanelMaddie />

            <Section className="">
                <p className="font-beiruti-english text-3xl text-amber-50">[AdminPanel Usuários]</p>
            </Section>

            <LogoutButton className="font-beiruti-english bg-orange-500">Sair</LogoutButton>

           <FooterMaddie isAuthenticated={isAuthenticated} />
        </>
    )
};
