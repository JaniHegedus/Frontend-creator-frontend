import React, { FC, useState, useEffect } from 'react';

interface InputFieldProps {
    id?: string;
    type: string;
    value?: any;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    required?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
}

const Inputfield: FC<InputFieldProps> = ({
                                             id,
                                             type,
                                             value = '',
                                             onChange,
                                             placeholder,
                                             className = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600',
                                             required = false,
                                             min,
                                             max,
                                             minLength,
                                             maxLength,
                                         }) => {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (type === 'number') {
            const numValue = Number(value);
            if (min !== undefined && numValue < min) {
                setError(`Value must be at least ${min}.`);
                return;
            }
            if (max !== undefined && numValue > max) {
                setError(`Value must not exceed ${max}.`);
                return;
            }
        }
        if (type === 'text' && maxLength !== undefined && value.length === maxLength) {
            setError(`Maximum character limit of ${maxLength} reached.`);
            return;
        } else if (type === 'text') {
            if (minLength !== undefined && value.length < minLength) {
                setError(`Text must be at least ${minLength} characters long.`);
                return;
            }
            if (maxLength !== undefined && value.length > maxLength) {
                setError(`Text must be no longer than ${maxLength} characters.`);
                return;
            }
        }
        setError(null); // Clear error if none of the conditions are met
    }, [value, min, max, minLength, maxLength, type]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (type === 'text' && maxLength !== undefined && newValue.length > maxLength) {
            // Prevent updating the value if maxLength is reached/exceeded
            setError(`Maximum character limit of ${maxLength} reached.`);
        } else {
            onChange(newValue); // Update the value normally if within limits
        }
    };

    return (
        <>
            <input
                type={type}
                id={id}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className={`${className} ${error ? 'border-red-500' : ''}`}
                required={required}
                {...(type === 'number' && { min, max })}
                {...(type === 'text' && { minLength, maxLength })}
            />
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </>
    );
};

export default Inputfield;
