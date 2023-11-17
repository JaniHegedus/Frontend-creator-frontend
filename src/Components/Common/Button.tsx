import React from 'react';

interface ButtonPropsWithLabel {
    label: string;
    content?: React.ReactNode | null;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
}

interface ButtonPropsWithContent {
    label?: string | null;
    content?: React.ReactNode;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
}

type ButtonProps = ButtonPropsWithLabel | ButtonPropsWithContent;

const Button: React.FC<ButtonProps> = ({ label, content, onClick, disabled }) => {
    return (
        <button
            className="flex justify-between items-center py-1 px-2 bg-gray-500 dark:bg-gray-700 sticky top-0 border-2 border-blue-500 dark:border-blue-800 rounded-md mr-3 dark:text-gray-300 hover:bg-blue-400  dark:hover:bg-blue-800"
            onClick={onClick}
            disabled={disabled}
        >{label ? <span>{label}</span> : content ? content : null}
        </button>
    );
}

export default Button;
