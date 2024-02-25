import React, { FC } from 'react';

interface InputFieldProps {
    id?: string;
    type: string;
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    required?: boolean;
    min?: number;
    max?: number;
}

const InputField: FC<InputFieldProps> = ({
                                             id,
                                             type,
                                             value,
                                             onChange,
                                             placeholder,
                                             className = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600',
                                             required = false,
                                             min = 1,
                                             max = 20
                                         }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        // For number type, ensure it's within the min and max range and it's an integer
        if (type === 'number') {
            const numberValue = parseInt(newValue, 10);
            if (numberValue >= min && numberValue <= max && Number.isInteger(numberValue)) {
                onChange(newValue);
            }
        } else {
            onChange(newValue);
        }
    };

    return (
        <input
            type={type}
            id={id}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={className}
            required={required}
            {...(type === 'number' && { min, max })}
        />
    );
};

export default InputField;
