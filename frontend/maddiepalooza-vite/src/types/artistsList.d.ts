import { ComponentProps } from "react";

export interface ArtistsListProps extends ComponentProps<'div'> {
    artistsListClasses?: string;
    liClassName?: string;
    imgClassName?: string;
}