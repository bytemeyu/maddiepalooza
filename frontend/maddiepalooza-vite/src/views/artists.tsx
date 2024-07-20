import React from "react";
import { Header } from "../components/basics/header";
import { Nav } from "../components/basics/nav";
import { Section } from "../components/basics/section";
import { Footer } from "../components/basics/footer";
import { ArtistsList } from "../components/artistsList";

export const Artists = () => {
    return (
       <>
            <Header className="" h1ClassName="font-honk">Maddiepalooza</Header>
            
            <Nav className="" liClassName="font-anton-sc-regular text-amber-50 hover:bg-pink-500">
                <a href="http://localhost:5173/performances" className=""><span>shows</span></a>
                <a href="http://localhost:5173/artists"><span>artistas</span></a>
                <a href="http://localhost:5173/stages"><span>palcos</span></a>
                <a href="http://localhost:5173/home"><span>contato</span></a>
            </Nav>

            <Section className="">
                <ArtistsList className="" liClassName="font-beiruti-english text-2xl text-amber-50" />
            </Section>

            <Footer className="" liClassName="font-beiruti-english text-amber-50" pClassName="font-beiruti-english text-lg text-amber-50" companyName='bytemeyu' currentYear='2024'>
                <a href="http://localhost:5173/home"><span className="text-xl">Sobre nós</span></a>
                <a href="http://localhost:5173/home"><span className="text-xl">Política de privacidade</span></a>
                <a href="http://localhost:5173/home"><span className="text-xl">Contato</span></a>
                <a href="http://localhost:5173/adminpanel"><span className="text-xl">Painel de Administração</span></a>
            </Footer>
        </>
    )
};
