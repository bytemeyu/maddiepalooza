import React, { useState} from "react";
import { ContactFormProps } from "../../types/contactForm";
import { twMerge } from "tailwind-merge";

export const ContactForm = ({nameDivClassName, nameLabelClassName, nameInputClassName, emailDivClassName, emailLabelClassName, emailInputClassName, messageDivClassName, messageLabelClassName, messageTextareaClassName, submitDivClassName, submitButtonClassName, nameLabel, emailLabel, messageLabel, className, children, ...rest }: ContactFormProps) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        //(simulação) VOLTAR AQUIII (pra implementar real)!!!:
        console.log('Form submitted:', { name, email, message });
        setName('');
        setEmail('');
        setMessage('');
    };
    
    const formClasses = 'w-full max-w-md p-10 my-10 mx-auto text-center';
    const nameDivClasses = 'mb-4';
    const nameLabelClasses = 'block mb-2';
    const nameInputClasses = 'w-full py-2 px-3 leading-tight focus:outline-none';
    const emailDivClasses = 'mb-4';
    const emailLabelClasses = 'block mb-2';
    const emailInputClasses = 'w-full py-2 px-3 leading-tight focus:outline-none';
    const messageDivClasses = 'mb-4';
    const messageLabelClasses = 'block mb-2';
    const messageTextareaClasses = 'w-full h-32 py-2 px-3 leading-tight focus:outline-none';
    const submitDivClasses = 'mt-6';
    const submitButtonClasses = 'py-2 px-4 focus:outline-none';

    return (
        <form onSubmit={handleSubmit} {...rest} className={twMerge(formClasses, className)}>
            <div className={twMerge(nameDivClasses, nameDivClassName)}>
                <label htmlFor="name" className={twMerge(nameLabelClasses, nameLabelClassName)}>
                    {nameLabel}
                </label>
                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className={twMerge(nameInputClasses, nameInputClassName)} />
            </div>
            <div className={twMerge(emailDivClasses, emailDivClassName)}>
                <label htmlFor="email" className={twMerge(emailLabelClasses, emailLabelClassName)}>
                    {emailLabel}
                </label>
                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className={twMerge(emailInputClasses, emailInputClassName)} />
            </div>
            <div className={twMerge(messageDivClasses, messageDivClassName)}>
                <label htmlFor="message" className={twMerge(messageLabelClasses, messageLabelClassName)}>
                    {messageLabel}
                </label>
                <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} required className={twMerge(messageTextareaClasses, messageTextareaClassName)} />
            </div>
            <div className={twMerge(submitDivClasses, submitDivClassName)}>
                <button type="submit" className={twMerge(submitButtonClasses, submitButtonClassName)}>
                    Enviar
                </button>
            </div>
        </form>
    )
}