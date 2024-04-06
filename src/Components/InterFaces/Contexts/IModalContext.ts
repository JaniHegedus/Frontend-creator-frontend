import {ReactNode} from "react";

export interface IModalContext {
    isModalOpen: boolean;
    modalContent: ReactNode | null;
    openModal: (content: ReactNode, onClose?: () => void) => void;
    closeModal: () => void;
}