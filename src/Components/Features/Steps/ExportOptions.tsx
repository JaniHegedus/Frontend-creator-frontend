import React, {useEffect, useState} from "react";
import Button from "@/Components/Common/Button";
import Dropdown from "@/Components/Common/Dropdown";
import Loading from "@/Components/Common/Loading";
import {useAuth} from "@/Components/Contexts/AuthContext";
import {ExportOptionsProps} from "@/Components/InterFaces/Steps/ExportOptionsProps";

const ExportOptions = ({
                           prevStep,
                           done,
                           afterExport,
                           selectedExportOption,
                           updateExportOption
                       }: ExportOptionsProps) =>
{
    const user = useAuth();
    const exportOptions = [
        { label: 'Download', value: 'download' },
        { label: 'Github', value: 'github' },
        { label: 'Cloud', value: 'cloud' },
        // Add more as needed
    ];

    const exportOptionsWithoutGithub = [
        { label: 'Download', value: 'download' },
        { label: 'Cloud', value: 'cloud' },
    ];

    const [isDisabled, setIsDisabled] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const handleSelectExportOptions = (option: any) => {
        updateExportOption(option.value); // Use the provided callback to update
        console.log('Selected export option:', option.label);
    };

    useEffect(() => {
        if(selectedExportOption)
            setIsDisabled(false);
        else
            setIsDisabled(true);
    }, [selectedExportOption]);

    const handleDone = () => {
        setIsLoading(true);
        afterExport();
    };
    return (
        <>
            {isLoading ? <Loading/>
                :
                <div>
                    <Dropdown
                        options={user.data?.github_uid ? exportOptions : exportOptionsWithoutGithub}
                        onSelect={handleSelectExportOptions}
                        placeholder="Select an Export option"
                        color="primary"
                        selectedValue={selectedExportOption}
                    />
            </div>
            }
            <div className="flex justify-between items-center w-full px-4">
                <Button onClick={prevStep} label="Previous" color="secondary"/>
                <Button onClick={handleDone} label={done ? "Done" : "Download"} color="secondary" disabled={isDisabled}/>
            </div>
        </>
    );
};

export default ExportOptions