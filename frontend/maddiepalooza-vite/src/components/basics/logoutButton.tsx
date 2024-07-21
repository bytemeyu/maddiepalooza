import { LogoutButtonProps } from "../../types/logoutButton";
import { twMerge } from "tailwind-merge";
import { useAuth } from "../../contexts/authContext";

export const LogoutButton = (props: LogoutButtonProps) => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    const logoutButtonClasses = 'px-4 py-2 ml-auto bg-pink-500 text-white border-none cursor-pointer';

    return (
        <button onClick={handleLogout} {...props} className={twMerge(logoutButtonClasses, props.className)}>
            {props.children}
        </button>
    )
}