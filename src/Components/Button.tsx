import React from 'react';

interface ButtonProps {
    label: string;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className, disabled }) => {
    return (
        <button
            className={`py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 dark:bg-blue-900 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
}

export default Button;
