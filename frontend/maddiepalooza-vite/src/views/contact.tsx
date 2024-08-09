import React from "react";
import { HeaderMaddie } from "../components/headerMaddie";
import { NavMaddie } from "../components/navMaddie";
import { Section } from "../components/basics/section";
import { ContactFormMaddie } from "../components/contactFormMaddie";
import { FooterMaddie } from "../components/footerMaddie";

export const Contact = () => {
    return (
        <>
            <HeaderMaddie />
            
            <NavMaddie />

            <Section className="">
                <ContactFormMaddie />
            </Section>

           <FooterMaddie />
        </>
    )
};