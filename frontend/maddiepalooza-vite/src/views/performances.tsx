import React from "react";
import { HeaderMaddie } from "../components/headerMaddie";
import { NavMaddie } from "../components/navMaddie";
import { Section } from "../components/basics/section";
import { FooterMaddie } from "../components/footerMaddie";
import { Link } from "react-router-dom";

export const Performances = () => {
    return (
        <>
            <HeaderMaddie />
            
            <NavMaddie />

            <Section className="">
                <p className="font-beiruti-english text-3xl text-amber-50">[Shows]</p>
            </Section>

           <FooterMaddie />
        </>
    )
};