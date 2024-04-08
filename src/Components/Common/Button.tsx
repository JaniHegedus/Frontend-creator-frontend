import React from 'react';
import {ButtonPropsWithContent, ButtonPropsWithLabel} from "@/InterFaces/Common/ButtonProps";

type ButtonProps = ButtonPropsWithLabel | ButtonPropsWithContent;

const Button: React.FC<ButtonProps> = ({ label, content, onClick, disabled, color }) => {
    const baseClasses = "font-bold rounded focus:outline-none focus:shadow-outline items-center text-center";
    const disabledClasses = "opacity-50 cursor-not-allowed";
    const hoverStyles = disabled ? "" : "hover:bg-opacity-75 hover:cursor-pointer";

    const colorClasses = {
        secondary: `py-1 px-2 bg-blue-500 hover:bg-blue-700 text-white dark:text-gray-900 dark:bg-blue-900 dark:hover:bg-blue-600 mt-3 ${baseClasses}`,
        list: `py-1 px-2 bg-gray-500 dark:bg-gray-700 border-2 border-blue-500 dark:border-blue-800 rounded-md mr-3 dark:text-gray-300 hover:bg-blue-400 dark:hover:bg-blue-800 ${baseClasses}`,
        primary: `flex justify-between py-1 px-2 bg-gray-500 dark:bg-gray-700 sticky top-0 border-2 border-blue-500 dark:border-blue-800 rounded-md mr-3 dark:text-gray-300 hover:bg-blue-400 dark:hover:bg-blue-800 ${baseClasses}`,
    };

    const className = `${colorClasses[color || 'primary']} ${disabled ? disabledClasses : hoverStyles}`;

    return (
        <button
            className={className + (disabled ? ' ' + disabledClasses : '')}
            onClick={!disabled ? onClick : undefined}
            disabled={disabled}
        >
            {label ? <span>{label}</span> : content}
        </button>
    );
};

export default Button;
