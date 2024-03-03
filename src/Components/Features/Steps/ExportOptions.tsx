import React, {useState} from "react";
import Button from "@/Components/Common/Button";
import Dropdown from "@/Components/Common/Dropdown";

interface ExportOptionsProps {
    prevStep: () => void;
    done?: boolean;
    afterExport: () => void;
    selectedExportOption: string;
    updateExportOption: (value: string) => void; // Callback to update the export option in the parent state
}


const ExportOptions = ({
                           prevStep,
                           done,
                           afterExport,
                           selectedExportOption,
                           updateExportOption
                       }: ExportOptionsProps) => {
    const exportOptions = [
        { label: 'Download', value: 'download' },
        { label: 'Github', value: 'github' },
        { label: 'Cloud', value: 'cloud' },
        // Add more as needed
    ];

    const handleSelectExportOptions = (option: any) => {
        updateExportOption(option.value); // Use the provided callback to update
        console.log('Selected export option:', option.label);
    };

    return (
        <>
            <div>
                <Dropdown
                    options={exportOptions}
                    onSelect={handleSelectExportOptions}
                    placeholder="Select an Export option"
                    color="primary"
                    selectedValue={selectedExportOption}
                />
            </div>
            <div className="flex justify-between items-center w-full px-4">
                <Button onClick={prevStep} label="Previous" color="secondary"/>
                {done && <Button onClick={afterExport} label="Done" color="secondary"/>}
            </div>
        </>
    );
};

export default ExportOptions