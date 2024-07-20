import { ComponentProps } from "react";

export interface LoginFormProps extends ComponentProps<'form'> {
    usernameDivClassName?: string; 
    usernameLabelClassName?: string; 
    usernameInputClassName?: string; 
    passwordDivClassName?: string;
    passwordLabelClassName?: string; 
    passwordInputClassName?: string;
    submitDivClassName?: string; 
    submitButtonClassName?: string;
}