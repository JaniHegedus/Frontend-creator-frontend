"use client"
import React, {useState, useRef, useEffect, FC} from 'react';
import Button from "@/Components/Common/Button";
interface Option {
    label: string;
    value:  any;
}
interface DropdownProps {
    options: Option[];
    onSelect: (option: Option) => void; // onSelect now expects a function that takes an Option type as an argument
    className?: string;
    disabled?: boolean;
    color?: string;
    placeholder?: string;
    selectedValue?: any;
}
const Dropdown: FC<DropdownProps> = ({
                                         options = [],
                                         onSelect = () => {},
                                         className = '',
                                         disabled = false,
                                         color = 'primary',
                                         placeholder = "Select an option",
                                         selectedValue, // Destructuring the new prop
                                     }) => {
    // Find the option that matches `selectedValue` to initialize `selectedOption`
    const initialSelectedOption = options.find(option => option.value === selectedValue) || null;

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(initialSelectedOption);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Update `selectedOption` if `selectedValue` changes
        const newSelectedOption = options.find(option => option.value === selectedValue) || null;
        setSelectedOption(newSelectedOption);
    }, [selectedValue, options]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (option: Option) => {
        // @ts-ignore
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option); // Propagate the selection to parent component if needed
    };


    const generateClassName = () => {
        switch (color) {
            case 'secondary':
                return "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
            case 'list':
                return "py-1 px-2 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded focus:outline-none focus:shadow-outline";
            default:
                return "py-2 px-4 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded focus:outline-none focus:shadow-outline";
        }
    };

    // @ts-ignore
    const buttonLabel = selectedOption ? selectedOption.label : placeholder;

    return (
        <div className={`${className} relative w-full`} ref={dropdownRef}>
            <Button
                color={"list"}
                onClick={() => setIsOpen(!isOpen)}
                disabled={disabled}
                label = {buttonLabel}

            />
            {isOpen && (
                <div className="absolute z-50 mt-1 w-full rounded-md shadow-lg bg-gray-300 dark:bg-gray-600 ring-1 ring-black ring-opacity-5 ">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                        {options.map((option, index) => (
                            <Button
                                key={index}
                                color={"list"}
                                onClick={() => handleSelect(option)} // <- Change applied here
                                label={option.label}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
