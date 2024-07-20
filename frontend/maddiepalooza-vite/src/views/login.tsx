import React from "react";
import { Header } from "../components/basics/header";
import { Nav } from "../components/basics/nav";
import { Section } from "../components/basics/section";
import { Footer } from "../components/basics/footer";
import { LoginForm } from "../components/basics/loginForm";
import { Link } from "react-router-dom";

export const Login = () => {
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
                <LoginForm className='bg-pink-500' usernameDivClassName='' usernameLabelClassName='font-beiruti-english text-xl text-amber-50' usernameInputClassName='font-beiruti-english text-xl text-gray-900' passwordDivClassName='' passwordLabelClassName='font-beiruti-english text-xl text-amber-50' passwordInputClassName='font-beiruti-english text-xl text-gray-900' submitDivClassName='' submitButtonClassName='bg-pink-500 hover:bg-orange-500 text-amber-50 font-anton-sc-regular text-xl'/>
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