import React from "react";
import { HeaderMaddie } from "../components/headerMaddie";
import { NavMaddie } from "../components/navMaddie";
import { Section } from "../components/basics/section";
import { FooterMaddie } from "../components/footerMaddie";

export const AboutUs = () => {
    return (
        <>
            <HeaderMaddie />
            
            <NavMaddie />

            <Section className="">
                <p className="font-beiruti-english text-3xl text-amber-50">[Sobre nós]</p>
            </Section>

           <FooterMaddie />
        </>
    )
};