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
            className="flex justify-between items-center py-1 px-2 bg-gray-500 dark:bg-gray-700 sticky top-0 border-2 border-blue-500 dark:border-blue-800 rounded-md mr-3 dark:text-gray-300"
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
}

export default Button;
