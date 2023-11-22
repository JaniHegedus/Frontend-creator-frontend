import React from 'react';

interface ButtonPropsWithLabel {
    label: string;
    content?: React.ReactNode | null;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
    color?: 'primary' | 'secondary';
}

interface ButtonPropsWithContent {
    label?: string | null;
    content?: React.ReactNode;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
    color?: 'primary' | 'secondary' | "list";
}

type ButtonProps = ButtonPropsWithLabel | ButtonPropsWithContent;

const Button: React.FC<ButtonProps> = ({ label, content, onClick, disabled ,color}) => {
    const className = color === 'secondary'
        ? "bg-blue-500 hover:bg-blue-700 text-white dark:text-gray-900 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-blue-900 dark:hover:bg-blue-600 mt-3"
        : color ==="list" ?  "py-1 px-2 bg-gray-500 dark:bg-gray-700 top-0 border-2 border-blue-500 dark:border-blue-800 rounded-md mr-3 dark:text-gray-300 hover:bg-blue-400 dark:hover:bg-blue-800"
            : "flex justify-between items-center py-1 px-2 bg-gray-500 dark:bg-gray-700 sticky top-0 border-2 border-blue-500 dark:border-blue-800 rounded-md mr-3 dark:text-gray-300 hover:bg-blue-400 dark:hover:bg-blue-800";

    return (
        <button
            className={className}
            onClick={onClick}
            disabled={disabled}
        >
            {label ? <span>{label}</span> : content}
        </button>
    );
}

export default Button;
