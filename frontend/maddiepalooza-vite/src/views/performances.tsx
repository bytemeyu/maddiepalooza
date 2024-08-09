import React from "react";
import { HeaderMaddie } from "../components/headerMaddie";
import { NavMaddie } from "../components/navMaddie";
import { Section } from "../components/basics/section";
import { PerformancesList } from "../components/performancesList";
import { FooterMaddie } from "../components/footerMaddie";
import { Link } from "react-router-dom";

export const Performances = () => {
    return (
        <>
            <HeaderMaddie />
            
            <NavMaddie />

            <Section className="">
                <PerformancesList className="" liClassName="font-beiruti-english text-2xl text-amber-50" />
            </Section>

           <FooterMaddie />
        </>
    )
};