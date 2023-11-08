import { createContext, useContext, useState, ReactNode } from 'react';
import ModalWindow from "@/Components/Modals/ModalWindow";

interface IModalContext {
    isModalOpen: boolean;
    modalContent: ReactNode | null;
    openModal: (content: ReactNode) => void;
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

    const openModal = (content: ReactNode) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent(null);
    };

    return (
        <ModalContext.Provider value={{ isModalOpen, modalContent, openModal, closeModal }}>
            {children}
            {isModalOpen && <ModalWindow isOpen={isModalOpen} onClose={closeModal}>{modalContent}</ModalWindow>}
        </ModalContext.Provider>
    );
};
