import { ComponentProps } from "react";

export interface FooterProps extends ComponentProps<'footer'> {
    ulClassName?: string;
    liClassName?: string;
    pClassName?: string;
    currentYear?: string;
    companyName?: string;
}