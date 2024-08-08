import { ComponentProps } from "react";

export interface HeaderMaddieProps extends ComponentProps<'header'> {
    isAuthenticated?: boolean;
};