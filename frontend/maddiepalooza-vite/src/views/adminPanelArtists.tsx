import React, { useEffect } from "react";
import { HeaderMaddie } from "../components/headerMaddie";
import { NavAdminPanelMaddie } from "../components/navAdminPanelMaddie.tsx";
import { Section } from "../components/basics/section";
import { ArtistsEditionList } from "../components/artistsEditionList.tsx";
import { useAuth } from "../contexts/authContext";
import { LogoutButton } from "../components/basics/logoutButton";
import { FooterMaddie } from "../components/footerMaddie";

export const AdminPanelArtists = () => {
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
                <ArtistsEditionList
                    className="font-beiruti-english text-2xl" 
                    divAddArtistClassName="bg-orange-500"
                    labelAddArtistClassName=""
                    inputAddArtistClassName=""
                    textareaAddArtistClassName=""
                    inputUrlAddArtistClassName=""
                    buttonAddArtistClassName="font-beiruti-english text-xl md:text-2xl px-6 py-4 bg-orange-700"
                    liClassName="font-beiruti-english text-2xl"
                    buttonEditArtistClassName="font-anton-sc-regular bg-orange-500 px-2 py-1"
                    buttonRemoveArtistClassName="font-anton-sc-regular bg-orange-500 px-2 py-1"
                />
            </Section>

            <LogoutButton className="font-beiruti-english bg-orange-500">Sair</LogoutButton>

           <FooterMaddie isAuthenticated={isAuthenticated} />
        </>
    )
};