import React from 'react';
import {ConfirmModalProps} from "@/Components/InterFaces/Modals/ConfirmModalProps";

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, message,noNo }) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-200 dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-90 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-xl max-w-sm mx-auto">
                <h2 className="text-gray-900 dark:text-white text-lg font-bold mb-4">Are you sure?</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
                <div className="flex justify-between">
                    {noNo ?(

                        <>
                            <button
                                onClick={() => {handleConfirm}}
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
                            >
                                OK
                            </button>
                        </>
                        )
                        :(<>
                            <button
                                onClick={onClose}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
                            >
                                No
                            </button>
                            <button
                                onClick={() => {handleConfirm}}
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
                            >
                                Yes
                            </button>
                        </>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
