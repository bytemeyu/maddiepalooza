import React, { useState} from "react";
import { LoginFormProps } from "../../types/loginForm";
import { twMerge } from "tailwind-merge";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";

export const LoginForm = ({usernameDivClassName, usernameLabelClassName, usernameInputClassName, passwordDivClassName, passwordLabelClassName, passwordInputClassName, submitDivClassName, submitButtonClassName, ...rest }: LoginFormProps) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    //aqui os useState são usados para armazenar e gerenciar os valores de usuário e senha. Quando o usuário digita no campo de entrada, o evento onChange é disparado, então, a função setUsername é chamada dentro do onChange para atualizar o estado username com o novo valor digitado (idem com password).
    //Você pode pensar no useState e no onChange juntos como um mecanismo para lidar com eventos de entrada do usuário de forma semelhante ao addEventListener em JavaScript puro, mas com algumas diferenças importantes que fazem com que o React abstraia grande parte da complexidade envolvida na manipulação do DOM e do estado, permitindo que você se concentre mais na lógica da aplicação.

    const { login } = useAuth();
    //Estamos chamando o hook useAuth e desestruturando o valor retornado para obter a função login.

    const navigate = useNavigate();
    //(?) ver depois

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(username, password);
        navigate('/adminpanel');
    };
    //uma função assíncrona que chama login com username e password como argumentos.
    //(?) ver depois [foi modificada]
    
    const formClasses = 'w-full max-w-sm p-10 my-10 mx-auto text-center';
    const usernameDivClasses = 'mb-4';
    const usernameLabelClasses = 'block mb-2';
    const usernameInputClasses = 'w-full py-2 px-3 leading-tight focus:outline-none';
    const passwordDivClasses = 'mb-4';
    const passwordLabelClasses = 'block mb-2';
    const passwordInputClasses = 'w-full py-2 px-3 leading-tight focus:outline-none';
    const submitDivClasses = 'mt-6';
    const submitButtonClasses = 'py-2 px-4 focus:outline-none';

    return (
        <form onSubmit={handleLogin} {...rest} className={twMerge(formClasses, rest.className)}>
            <div className={twMerge(usernameDivClasses, usernameDivClassName)}>
                <label htmlFor="username" className={twMerge(usernameLabelClasses, usernameLabelClassName)}>
                    Usuário
                </label>
                <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} required className={twMerge(usernameInputClasses, usernameInputClassName)} />
                {/*value={username} no campo de entrada garante que o valor exibido no campo de entrada esteja sempre sincronizado com o valor da variável username no estado do componente. O fluxo é o seguinte: 1) username é inicializado como uma string vazia (''). 2) O valor do campo de entrada é definido por value={username} (que é uma string vazia inicialmente). 3) Quando o usuário digita algo no campo de entrada, o evento onChange é disparado. O manipulador de eventos onChange={e => setUsername(e.target.value)} é executado ('e' é um objeto de evento que é passado automaticamente para o manipulador de eventos quando o evento é disparado, portanto 'e.target.value' obtem o valor atual do campo de entrada e chama setUsername para atualizar o estado username com esse valor). Este manipulador pega o novo valor digitado (e.target.value) e chama setUsername com este novo valor. 4) setUsername atualiza o estado username, e o componente é re-renderizado com o novo valor. 5) Sincronização Contínua: O valor do campo de entrada é sempre sincronizado com o estado username.*/}
            </div>
            <div className={twMerge(passwordDivClasses, passwordDivClassName)}>
                <label htmlFor="password" className={twMerge(passwordLabelClasses, passwordLabelClassName)}>
                    Senha:
                </label>
                <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required className={twMerge(passwordInputClasses, passwordInputClassName)} />
            </div>
            <div className={twMerge(submitDivClasses, submitDivClassName)}>
                <button type="submit" className={twMerge(submitButtonClasses, submitButtonClassName)}>
                    Entrar
                </button>
            </div>
        </form>
    )
}