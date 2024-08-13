import React from "react";
import { HeaderMaddie } from "../components/headerMaddie";
import { NavMaddie } from "../components/navMaddie";
import { Section } from "../components/basics/section";
import { FooterMaddie } from "../components/footerMaddie";

export const Home = () => {
    return (
        <>
            <HeaderMaddie />
            
            <NavMaddie />

            <Section className="">
                <img src="../../public/images/pexels-mark-angelo-sampan-738078-1587927.jpg" alt="fotografia de pessoas levantando as mãos em um show"></img>
            </Section>

           <FooterMaddie />
        </>
    )
};