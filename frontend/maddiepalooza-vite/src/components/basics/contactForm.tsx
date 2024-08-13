import React, { useState} from "react";
import { ContactFormProps } from "../../types/contactForm";
import { twMerge } from "tailwind-merge";
import { Modal } from "./modal";

export const ContactForm = ({nameDivClassName, nameLabelClassName, nameInputClassName, emailDivClassName, emailLabelClassName, emailInputClassName, messageDivClassName, messageLabelClassName, messageTextareaClassName, submitDivClassName, submitButtonClassName, nameLabel, emailLabel, messageLabel, className, children, ...rest }: ContactFormProps) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        //e.preventDefault();
        //se esse preventDefault estiver sendo chamado, o Formsubmit não funciona!
        //console.log('Form submitted:', { name, email, message });
        setIsModalOpen(true);
        setTimeout(() => {
            setIsModalOpen(false);
        }, 2000);
        
        //setName('');
        //setEmail('');
        //setMessage('');
        //nada disso será usado, pois o Formsubmit vai redirecionar para a página de contato novamente quando enviar o e-mail, ou seja, o campo, com o redirecionamento, já ficará limpo.
    };

    const closeModal = () => {
        setIsModalOpen(false);
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
        <>
            <form 
                onSubmit={handleSubmit} 
                //como eu implementei o Formsubmit, a função handleSubmit vai ficar encarregada só de limpar os campos e abrir o modal de envio do e-mail (por meio do action e do post aqui do form).
                action="https://formsubmit.co/ad004c7ef67de78ee8b4cada58033bc8" method="POST"
                //para não ter que expor meu e-mail no "https://formsubmit.co/meuemail@email.com", estou usando a random-like string
                {...rest} 
                className={twMerge(formClasses, className)}
            >
                {/*configurações do Formsubmit:*/}
                <input type="hidden" name="_captcha" value="false" />
                {/*por mais que não seja recomendado, desabilitei o recaptcha para não ter que ser redirecionada para outra página ao enviar o formulário. vou ativar o campo honey:*/}
                <input type="text" name="_honey" className="hidden" />
                <input type="hidden" name="_next" value="http://localhost:5173/contact" />
                <input type="hidden" name="_subject" value="Formulário de contato Maddiepalooza ;)" />
                <input type="hidden" name="_autoresponse" value="Sua mensagem para contato com o Maddiepalooza foi recebida." />

                <div className={twMerge(nameDivClasses, nameDivClassName)}>
                    <label htmlFor="name" className={twMerge(nameLabelClasses, nameLabelClassName)}>
                        {nameLabel}
                    </label>
                    <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} required className={twMerge(nameInputClasses, nameInputClassName)} />
                </div>
                <div className={twMerge(emailDivClasses, emailDivClassName)}>
                    <label htmlFor="email" className={twMerge(emailLabelClasses, emailLabelClassName)}>
                        {emailLabel}
                    </label>
                    <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required className={twMerge(emailInputClasses, emailInputClassName)} />
                </div>
                <div className={twMerge(messageDivClasses, messageDivClassName)}>
                    <label htmlFor="message" className={twMerge(messageLabelClasses, messageLabelClassName)}>
                        {messageLabel}
                    </label>
                    <textarea id="message" name="message" value={message} onChange={e => setMessage(e.target.value)} required className={twMerge(messageTextareaClasses, messageTextareaClassName)} />
                </div>
                <div className={twMerge(submitDivClasses, submitDivClassName)}>
                    <button type="submit" className={twMerge(submitButtonClasses, submitButtonClassName)}>
                        Enviar
                    </button>
                </div>
            </form>

            <Modal isOpen={isModalOpen} onClose={closeModal} innerDivClassName='w-full max-w-4xl p-4 my-5 mx-auto text-center flex flex-col space-y-4 bg-pink-500'>
                <p className="font-beiruti-english text-3xl text-amber-50">Sua mensagem está sendo enviada, não feche ou mude de página até que o formulário apresente os campos em branco. Isso significará que sua mensagem foi direcionada através do serviço Formsubmit com sucesso.</p>
            </Modal>
        </>
    )
}



//esse envio de formulário via Formsubmit não está tão liso, mas vai ser assim por enquanto... será que vale mais a pena eu implementar o Formsubmit usando o preventDefault com fetch (ao invés do action)?