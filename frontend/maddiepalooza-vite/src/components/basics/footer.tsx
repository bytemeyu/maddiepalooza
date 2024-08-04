import React from "react";
import { FooterProps } from "../../types/footer";
import { twMerge } from "tailwind-merge";

export const Footer = ({ ulClassName, liClassName, pClassName, currentYear, companyName, className, children, ...rest }: FooterProps) => {
    const footerClasses = "py-6";
    // py-6: Aplica um preenchimento vertical de 1.5rem (24px) no topo e na base do footer.

    const ulClasses = "flex justify-center space-x-4";
    // flex: Aplica o layout flexbox ao elemento, permitindo alinhar os itens horizontalmente.
    // justify-center: Centraliza os itens filhos horizontalmente dentro do contêiner flex.
    // space-x-4: Adiciona um espaçamento horizontal de 1rem (16px) entre cada item filho direto.

    const liClasses = "text-lg hover:underline";
    // text-lg: Define o tamanho do texto como grande (1.125rem).
    // hover:underline: Sublinha o texto quando o usuário passa o mouse sobre ele.

    const pClasses = "text-center mt-4";

    return (
        <footer {...rest} className={twMerge(footerClasses, className)}>
            <ul className={twMerge(ulClasses, ulClassName)}>
                {React.Children.map(children, (child, index) => (
                    <li key={index} className={twMerge(liClasses, liClassName)}>
                        {child}
                    </li>
                ))}
            </ul>
            <p className={twMerge(pClasses, pClassName)}>&copy; {currentYear} {companyName} - Todos os direitos reservados</p>
        </footer>
    );
};