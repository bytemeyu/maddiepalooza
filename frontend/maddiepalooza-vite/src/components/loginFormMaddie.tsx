import React from "react";
import { LoginForm } from "../components/basics/loginForm";

export const LoginFormMaddie = () => {
    return (
        <>
            <LoginForm usernameLabel='Usuário:' passwordLabel='Senha:' className='bg-pink-500' usernameDivClassName='' usernameLabelClassName='font-beiruti-english text-xl text-amber-50' usernameInputClassName='font-beiruti-english text-xl text-gray-900' passwordDivClassName='' passwordLabelClassName='font-beiruti-english text-xl text-amber-50' passwordInputClassName='font-beiruti-english text-xl text-gray-900' submitDivClassName='' submitButtonClassName='bg-pink-500 hover:bg-orange-500 text-amber-50 font-anton-sc-regular text-xl'/>
        </>
    )
};