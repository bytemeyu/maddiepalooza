import { ComponentProps } from "react";

export interface NavProps extends ComponentProps<'nav'> {
    ulClassName?: string;
    liClassName?: string;
};