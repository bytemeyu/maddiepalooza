import { ComponentProps } from "react";

export interface FooterProps extends ComponentProps<'footer'> {
    liClassName?: string;
    pClassName?: string;
    companyName?: string;
    currentYear?: string;
}