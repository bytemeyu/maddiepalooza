import React, { ReactNode } from "react";

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    children: ReactNode;
    innerDivClassName?: string;
}