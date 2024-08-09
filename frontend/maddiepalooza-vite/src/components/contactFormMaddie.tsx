import React from "react";
import { ContactForm } from "./basics/contactForm";

export const ContactFormMaddie = () => {
    return (
        <>
            <ContactForm nameLabel='Nome:' emailLabel='E-mail:' messageLabel="Mensagem" className='bg-pink-500' nameDivClassName='' nameLabelClassName='font-beiruti-english text-xl text-amber-50' nameInputClassName='font-beiruti-english text-xl text-gray-900' 
            emailDivClassName='' emailLabelClassName='font-beiruti-english text-xl text-amber-50' emailInputClassName='font-beiruti-english text-xl text-gray-900' messageDivClassName='' messageLabelClassName='font-beiruti-english text-xl text-amber-50' messageTextareaClassName= 'font-beiruti-english text-xl text-gray-900' submitDivClassName='' submitButtonClassName='bg-pink-500 hover:bg-orange-500 text-amber-50 font-anton-sc-regular text-xl'/>
        </>
    )
};