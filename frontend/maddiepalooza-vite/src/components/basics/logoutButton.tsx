import React from "react";
import { LogoutButtonProps } from "../../types/logoutButton";
import { twMerge } from "tailwind-merge";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";

export const LogoutButton = (props: LogoutButtonProps) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const logoutButtonClasses = 'text-xl md:text-2xl px-3 py-2 cursor-pointer mx-20 ml-auto';

    return (
        <button onClick={handleLogout} {...props} className={twMerge(logoutButtonClasses, props.className)}>
            {props.children}
        </button>
    )
}