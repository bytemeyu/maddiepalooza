import React from "react";
import { ModalProps } from "../../types/modal";
import { twMerge } from "tailwind-merge";

export const Modal = ({ isOpen, onClose, className, children }: ModalProps) => {
    if (!isOpen) return null;

    const outerDivClasses = "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50";
    const innerDivClasses = "bg-white p-4 relative";
    const buttonClasses = "absolute top-2 right-3 text-black";
    
    return (
        <div className={twMerge(outerDivClasses, className)}>
          <div className={twMerge(innerDivClasses, className)}>
            <button onClick={onClose} className={twMerge(buttonClasses, className)}>X</button>
            {children}
          </div>
        </div>
    );
}