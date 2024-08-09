import { ComponentProps } from "react";

export interface ContactFormProps extends ComponentProps<'form'> {
    nameDivClassName?: string; 
    nameLabelClassName?: string; 
    nameInputClassName?: string; 
    emailDivClassName?: string;
    emailLabelClassName?: string; 
    emailInputClassName?: string;
    messageDivClassName?: string;
    messageLabelClassName?: string; 
    messageTextareaClassName?: string;
    submitDivClassName?: string; 
    submitButtonClassName?: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
}