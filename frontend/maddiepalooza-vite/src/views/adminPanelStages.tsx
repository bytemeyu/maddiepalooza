import React, { useEffect } from "react";
import { HeaderMaddie } from "../components/headerMaddie";
import { NavAdminPanelMaddie } from "../components/navAdminPanelMaddie.tsx";
import { Section } from "../components/basics/section";

import { useAuth } from "../contexts/authContext";
import { LogoutButton } from "../components/basics/logoutButton";
import { FooterMaddie } from "../components/footerMaddie";

export const AdminPanelStages = () => {
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        document.body.style.backgroundColor = isAuthenticated ? '#696969' : '';

        return () => {
            document.body.style.backgroundColor = '';
        };
    }, [isAuthenticated]);

    return (
        <>
            <HeaderMaddie />
            
            <NavAdminPanelMaddie />

            <Section className="">
                <p className="font-beiruti-english text-3xl text-amber-50">[AdminPanel Palcos]</p>
            </Section>

            <LogoutButton className="font-beiruti-english bg-orange-500">Sair</LogoutButton>

           <FooterMaddie />
        </>
    )
};