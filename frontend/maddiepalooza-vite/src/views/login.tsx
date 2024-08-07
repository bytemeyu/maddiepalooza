import React from "react";
import { HeaderMaddie } from "../components/headerMaddie";
import { NavMaddie } from "../components/navMaddie";
import { Section } from "../components/basics/section";
import { LoginFormMaddie } from "../components/loginFormMaddie";
import { FooterMaddie } from "../components/footerMaddie";

export const Login = () => {
    return (
        <>
            <HeaderMaddie />
            
            <NavMaddie />

            <Section className="">
                <LoginFormMaddie />
            </Section>

           <FooterMaddie />
        </>
    )
};