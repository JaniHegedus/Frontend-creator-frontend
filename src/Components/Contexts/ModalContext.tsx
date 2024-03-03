import React, { createContext, useContext, useState, ReactNode } from 'react';
import ModalWindow from "@/Components/Modals/ModalWindow";

interface IModalContext {
    isModalOpen: boolean;
    modalContent: ReactNode | null;
    openModal: (content: ReactNode, onClose?: () => void) => void;
    closeModal: () => void;
}

const defaultState = {
    isModalOpen: false,
    modalContent: null,
    openModal: () => {},
    closeModal: () => {},
};

const ModalContext = createContext<IModalContext>(defaultState);

export const useModal = () => useContext(ModalContext);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<ReactNode | null>(null);
    const [onCloseCallback, setOnCloseCallback] = useState<(() => void) | null>(null); // Store the onClose callback

    const openModal = (content: ReactNode, onClose?: () => void) => {
        setModalContent(content);
        setIsModalOpen(true);
        setOnCloseCallback(() => onClose); // Set the onClose callback
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent(null);
        if (onCloseCallback) {
            onCloseCallback(); // Execute the onClose callback if present
            setOnCloseCallback(null); // Reset the onClose callback
        }
    };

    return (
        <ModalContext.Provider value={{ isModalOpen, modalContent, openModal, closeModal }}>
            {children}
            {isModalOpen && <ModalWindow isOpen={isModalOpen} onClose={closeModal}>{modalContent}</ModalWindow>}
        </ModalContext.Provider>
    );
};
