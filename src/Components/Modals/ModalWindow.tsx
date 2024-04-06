import React, { FunctionComponent } from 'react';
import {ModalProps} from "@/Components/InterFaces/Modals/ModalProps";

const ModalWindow: FunctionComponent<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 overflow-y-auto h-full w-full z-50" id="my-modal">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/3 shadow-lg rounded-md bg-white dark:bg-gray-700">
                <div className="flex justify-between items-center pb-3">
                    <button onClick={onClose} className="modal-close cursor-pointer z-50">
                        <svg className="fill-current text-gray-900 dark:text-gray-100" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 18 18">
                            <path d="M12.45 11.414L11.414 12.45 9 10.036 6.586 12.45 5.55 11.414 7.964 9 5.55 6.586 6.586 5.55 9 7.964 11.414 5.55 12.45 6.586 10.036 9z" />
                        </svg>
                    </button>
                </div>
                <div className="mt-2 px-7 py-3">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ModalWindow;
