import { HeaderProps } from "../../types/header";
import { twMerge } from "tailwind-merge";

export const Header = (props: HeaderProps) => {
    const headerClasses = "w-full max-w-4xl p-4 my-5 mx-auto";
    //w-full faz o elemento se expandir para ocupar 100% da largura do seu contêiner pai. enquanto max-w-4xl coloca um limite superior nessa expansão, garantindo que o elemento não se torne demasiado largo em telas grandes.
    //p-4 aplica um padding interno uniforme ao redor de todo o conteúdo interno do elemento.
    //my-5 aplica uma margem vertical (superior e inferior) uniforme.
    //mx-auto plica margens automáticas no eixo horizontal, o que centraliza o elemento no contêiner pai.
    const h1Classes = "text-center w-full text-6xl md:text-8xl h-auto";
    //text-6xl com md:text-8xl usa um recurso de design responsivo do Tailwind que faz com que em telas menores, o texto seja 6xl, e em telas médias ou maiores, seja 8xl.
    //h-auto define a altura do elemento para ajustar automaticamente ao conteúdo. Isso significa que a altura do elemento cresce ou diminui com base no tamanho do conteúdo interno, garantindo que todo o conteúdo seja visível sem cortes ou overflow.

    return (
        <header {...props} className={twMerge(headerClasses, props.className)}>
            <h1 className={twMerge(h1Classes, props.h1ClassName)}>
                {props.children}
            </h1>
        </header>
    )
}