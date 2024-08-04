import React from "react";
import { NavProps } from "../../types/nav";
import { twMerge } from "tailwind-merge";

export const Nav = ({ ulClassName, liClassName, className, children, ...rest }: NavProps) => {
    const navClasses = "flex justify-center mx-60 my-5";
    //flex: Aplica o layout flexbox ao elemento, transformando-o em um contêiner flexível que permite alinhar e distribuir seus filhos de acordo com as propriedades flex.
    //justify-center: Centraliza os itens filhos horizontalmente dentro do contêiner flex.
    //mx-60: Aplica a margem horizontal (esquerda e direita) especificada.
    //my-5: Aplica a margem vertical (superior e inferior) especificada.
    const ulClasses = "flex justify-center space-x-4";
    //space-x-4: Adiciona um espaçamento horizontal de 1rem (16px) entre cada item filho direto.
    const liClasses = `text-xl md:text-2xl px-3 py-2`
    //text-xl: texto é definido como extra-grande (1.25rem) por padrão.
    //md:text-2xl: Em telas médias (768px) ou maiores, o tamanho do texto aumenta para extra-extra-grande (1.5rem).
    //px-3: Adiciona um preenchimento horizontal de 0.75rem em ambos os lados do elemento, criando espaço interno ao redor do texto.
    //py-2: Adiciona um preenchimento vertical.
 
    return (
        <nav {...rest} className={twMerge(navClasses, className)}>
            <ul className={twMerge(ulClasses, ulClassName)}>
                {React.Children.map(children, (child, index) => (
                    <li key={index} className={twMerge(liClasses, liClassName)}>
                        {child}
                    </li>
                ))}
                {/*React.Children.map é um utilitário fornecido pelo React para iterar sobre os children passados a um componente. ele recebe dois parâmetros, os elementos filhos em si e a função de callback que processa e renderiza cada filho.*/}
                {/*liClassName é uma nova propriedade que coloquei na interface de nav, para poder adicionar classes tailwind para li no home.tsx*/}
            </ul>
        </nav>
    )
}