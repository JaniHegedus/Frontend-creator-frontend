"use client"
import React, { useEffect, useState } from "react";
import Dropdown from '@/Components/Common/Dropdown';
import Button from "@/Components/Common/Button";
import {LanguageSelectorProps} from "@/InterFaces/Steps/LanguageSelectorProps";
import {Option} from "@/InterFaces/Steps/Option";

const LanguageSelector = ({ nextStep, prevStep, updateLanguage, language }: LanguageSelectorProps) => {
    const [selectedProgrammingLanguage, setSelectedProgrammingLanguage] = useState<string | null>(language.programming);
    const [selectedStyleLanguage, setSelectedStyleLanguage] = useState<string | null>(language.style);
    const [isDisabled, setIsDisabled] = useState(true);

    const programmingLanguages : Option[] = [
        { label: 'HTML', value: 'html' },
        { label: 'HTML + JavaScript', value: 'html+javascript' },
        { label: 'HTML + TypeScript', value: 'html+typescript' },
        { label: 'React (JSX)', value: 'react_jsx' },
        { label: 'React (TSX)', value: 'react_tsx' },
        // Add more as needed
    ];

    const styleLanguages : Option[] = [
        { label: 'CSS', value: 'css' },
        { label: 'SASS', value: 'sass' },
        { label: 'Tailwind CSS', value: 'tailwindcss' },
        // Add more as needed
    ];

    useEffect(() => {
        // Enable the Next button if both selections have been made
        setIsDisabled(!(selectedProgrammingLanguage && selectedStyleLanguage));
    }, [selectedProgrammingLanguage, selectedStyleLanguage]);

    useEffect(() => {
        // Auto-update based on prop changes, ensuring reselection upon navigation
        setSelectedProgrammingLanguage(language.programming);
        setSelectedStyleLanguage(language.style);
    }, [language]);

    const handleSelectProgrammingLanguage = (option: any) => {
        setSelectedProgrammingLanguage(option.value);
        updateLanguage(option.value, selectedStyleLanguage);
    };

    const handleSelectStyleLanguage = (option: any) => {
        setSelectedStyleLanguage(option.value);
        updateLanguage(selectedProgrammingLanguage, option.value);
    };

    return (
        <div className="space-y-4">
            <Dropdown
                options={programmingLanguages}
                onSelect={handleSelectProgrammingLanguage}
                placeholder="Select a Programming Language"
                color="primary"
                // You might need to adjust Dropdown to accept a selected value prop for auto-selection
                selectedValue={selectedProgrammingLanguage}
            />
            <div className="relative z-10">
                <Dropdown
                    options={styleLanguages}
                    onSelect={handleSelectStyleLanguage}
                    placeholder="Select a Style Language"
                    color="primary"
                    selectedValue={selectedStyleLanguage}
                />
            </div>
            <div className="flex justify-between items-center w-full px-4">
                <Button onClick={prevStep} label="Previous" color="secondary"/>
                <Button onClick={nextStep} label="Next" color="secondary" disabled={isDisabled}/>
            </div>
        </div>
    );
};

export default LanguageSelector;
