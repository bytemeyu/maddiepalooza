import React from "react";
import { ModalProps } from "../../types/modal";
import { twMerge } from "tailwind-merge";

export const Modal = ({ isOpen, onClose, className, children, innerDivClassName }: ModalProps) => {
    if (!isOpen) return null;

    const outerDivClasses = "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50";
    const innerDivClasses = "bg-white p-4 relative";

    const handleOuterClick = () => {
        onClose();
    };

    const handleInnerClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className={twMerge(outerDivClasses, className)} onClick={handleOuterClick}>
          <div className={twMerge(innerDivClasses, innerDivClassName)} onClick={handleInnerClick}>
            {children}
          </div>
        </div>
    );
}
