import React from "react";
import { HeaderMaddie } from "../components/headerMaddie";
import { NavMaddie } from "../components/navMaddie";
import { Section } from "../components/basics/section";
import { FooterMaddie } from "../components/footerMaddie";
import { ArtistsList } from "../components/artistsList";
import { Link } from "react-router-dom";

export const Artists = () => {
    return (
       <>
            <HeaderMaddie />
            
            <NavMaddie />

            <Section className="">
                <ArtistsList className="" liClassName="font-beiruti-english text-2xl text-amber-50" />
            </Section>

            <FooterMaddie />
        </>
    )
};
