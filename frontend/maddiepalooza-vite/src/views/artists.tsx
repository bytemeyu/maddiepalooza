import React from "react";
import { Header } from "../components/basics/header";
import { Nav } from "../components/basics/nav";
import { Section } from "../components/basics/section";
import { Footer } from "../components/basics/footer";
import { ArtistsList } from "../components/artistsList";
import { Link } from "react-router-dom";

export const Artists = () => {
    return (
       <>
            <Header className="" h1ClassName="font-honk">Maddiepalooza</Header>
            
            <Nav className="" liClassName="font-anton-sc-regular text-amber-50 hover:bg-pink-500">
                <Link to="/performances" className=""><span>shows</span></Link>
                <Link to="/artists"><span>artistas</span></Link>
                <Link to="/stages"><span>palcos</span></Link>
                <Link to="/home"><span>contato</span></Link>
            </Nav>

            <Section className="">
                <ArtistsList className="" liClassName="font-beiruti-english text-2xl text-amber-50" />
            </Section>

            <Footer className="" liClassName="font-beiruti-english text-amber-50" pClassName="font-beiruti-english text-lg text-amber-50" companyName='bytemeyu' currentYear='2024'>
                <Link to="/home"><span className="text-xl">Sobre nós</span></Link>
                <Link to="/home"><span className="text-xl">Política de privacidade</span></Link>
                <Link to="/home"><span className="text-xl">Contato</span></Link>
                <Link to="/adminpanel"><span className="text-xl">Painel de Administração</span></Link>
            </Footer>
        </>
    )
};
