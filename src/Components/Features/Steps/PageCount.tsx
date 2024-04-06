"use client"
import React, { useEffect, useState } from "react";
import Button from "@/Components/Common/Button";
import Inputfield from "@/Components/Common/Inputfield";
import Dropdown from "@/Components/Common/Dropdown";
import {PageCountProps} from "@/Components/InterFaces/Steps/PageCountProps";
import {Option} from "@/Components/InterFaces/Steps/Option";

const PageCount = ({ nextStep, pageCount, setPageCount, disabled }: PageCountProps) => {
    const [isDisabled, setIsDisabled] = useState(true);
    // State to manage the visibility of the custom input field directly
    const [isCustomSelected, setIsCustomSelected] = useState(false);
    const [customPageCount, setCustomPageCount] = useState('4');
    const [dropdownValue, setDropdownValue] = useState<any>();

    useEffect(() => {
        // @ts-ignore
        if(pageCount<4)
        {
            setDropdownValue(pageCount)
        }
        setIsDisabled(pageCount === null);
        // @ts-ignore
        setIsCustomSelected(pageCount > 3 || pageCount === null);
        // @ts-ignore
        setCustomPageCount(pageCount);
        // Initialize customPageCount based on pageCount if it's for a custom value
        // @ts-ignore
        if (pageCount > 3) {
            // @ts-ignore
            setCustomPageCount(pageCount.toString());
        } else {
            setCustomPageCount(''); // Reset if pageCount is not custom
        }
    }, [pageCount]);

    const pageCounts: Option[] = [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: 'Custom', value: "X" }, // Keeping "X" for UI purposes, not as a state value
    ];

    const handleSelectPageCount = (option: Option) => {
        if (option.value === "X") {
            setDropdownValue("X")
            setIsCustomSelected(true); // Directly manage custom input visibility
            setPageCount(4); // Indicate a custom value is being entered
        } else {
            setDropdownValue(option.value)
            setIsDisabled(false);
            setIsCustomSelected(false); // Hide custom input when a predefined option is selected
            setPageCount(option.value);
        }
    };

    const handleCustomNumberChange = (value: string) => {
        const numberValue = parseInt(value, 10);
        // Allow setting custom number only when isCustomSelected is true
        if (isCustomSelected && !isNaN(numberValue) && numberValue > 3) {
            setPageCount(numberValue); // Update pageCount with valid custom number
            setCustomPageCount(value); // Reflect the input value directly
            setIsDisabled(false);
        } else {
            // Resetting or handling invalid input
            setPageCount(null);
            setCustomPageCount('');
        }
    };

    return (
        <div className="space-y-4">
            <Dropdown
                options={pageCounts}
                onSelect={handleSelectPageCount}
                placeholder="Select a Page Number"
                color="primary"
                // Reflects "Custom" if custom is selected or value is greater than options
                selectedValue={dropdownValue}
            />
            {(isCustomSelected && pageCount) && (
                <Inputfield
                    type="number"
                    id="customPageCount"
                    value={customPageCount}
                    onChange={handleCustomNumberChange}
                    placeholder="Enter custom page count"
                    required
                    min={4}
                    max={10}
                />
            )}
            <div className="flex justify-between items-center w-full px-4">
                <Button onClick={nextStep} label="Next" color="secondary" disabled={isDisabled || disabled} />
            </div>
        </div>
    );
};

export default PageCount;
