import React, { useEffect, useState} from "react";
import Button from "@/Components/Common/Button";
import {CPS} from "@/Components/CPS";
import {useModal} from "@/Components/Contexts/ModalContext";
import MyFiles from "@/Components/Features/MyFiles";


interface GenerationBotInterfaceProps {
    nextStep: () => void;
    prevStep: () => void;
    stepData: CPS | null;
    updateStepData: (key: any, value: any) => void;
    addToStepData:  (fullname : string, location : string) => void;
}
type SelectedFile = {
    name: string;
    path: string;
}

const GenerationBotInterface = ({nextStep,addToStepData, updateStepData, stepData, prevStep}:GenerationBotInterfaceProps) =>  {
    const {openModal} = useModal();
    const [isAddDisabled, setIsAddDisabled] = useState(true)
    const [isRemoveDisabled, setIsRemoveDisabled] = useState(true)
    const [selected, setSelected] = useState<SelectedFile | null | undefined>(null)
    const [selectable, setSelectable] = useState<number | null>()
    const [success, setSuccess] = useState('')
    const [isSent, setIsSent] = useState<boolean | undefined>()
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        if(stepData?.pageCount && stepData.imageEdit)
        {
            setSelectable((stepData?.pageCount)-(Object.keys(stepData?.imageEdit).length))
            if(selectable && selectable>0)
                if(stepData?.pageCount!==stepData?.imageEdit?.length)
                {
                    setIsAddDisabled(false)
                }
            else {
                setIsAddDisabled(true);
            }
        }
    }, [stepData, selectable]);
    const addMore = () => {
        openModal(<MyFiles setSelected={setSelected} selectable={selectable} />);
    };
    useEffect(() => {
        if (stepData?.imageEdit) {
            const imageCount = Object.keys(stepData.imageEdit).length;
            if (imageCount > 1) {
                //console.log("There are more than one image.");
                setIsRemoveDisabled(false);
            } else {
                //console.log("There is one or no image.");
                setIsRemoveDisabled(true);
            }
        }
    }, [stepData]);


    useEffect(() => {
        if(selected && selected.name!=null)
        {
            addToStepData(selected.name, selected.path);
            setSuccess("File Added");
        }
    }, [selected]);
    const removeOne = (itemName : any) => {
        if (stepData && stepData.imageEdit) {
            const updatedImages = {...stepData.imageEdit};
            delete updatedImages[itemName];
            updateStepData('imageEdit', updatedImages);
        }
    };
    const sendToGenerate = () => {
        setIsLoading(true);
        setIsSent(true);
    };
    return(
        <>
            <div className="flex flex-col text-gray-900 dark:text-white ">
                <div className="p-4 w-90vh h-60vh">
                    <h1 className="text-4xl font-bold mb-4">Current Settings:</h1>
                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 m-4">
                        <h2 className="text-2xl font-bold mb-2">Project:</h2>
                        <p><strong>Name:</strong> {stepData?.project.projectName || "Name"}</p>
                        <p><strong>Description:</strong> {stepData?.project.projectDescription || "-"}</p>
                        <p><strong>Page Count:</strong> {stepData?.pageCount || 0}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-4 m-4 relative justify-center">
                        <div className="flex justify-center items-center mb-4">
                            <h2 className="text-2xl font-bold p-2">Selected Pictures</h2>
                            <div className="pl-4">
                                <Button
                                    onClick={addMore}
                                    label={"+"}
                                    disabled={isAddDisabled}
                                    color={"secondary"}
                                />
                            </div>
                        </div>
                        <ul className="list-disc pl-5 pr-8 mt-8 max-h-52 overflow-y-auto">
                            {Object.keys(stepData?.imageEdit || {}).map((imageName) => (
                                <li key={imageName} className="flex justify-between items-center my-2 pr-4">
                                    {imageName}
                                    <Button
                                        onClick={() => removeOne(imageName)}
                                        label={"-"}
                                        color={"secondary"}
                                        disabled={isRemoveDisabled}
                                    />
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>
                <div className="flex justify-between items-center w-full px-4 py-4">
                    <Button
                        onClick={prevStep}
                        label="Previous"
                        color="secondary"
                    />
                    {isSent ?
                        (<Button
                            onClick={nextStep}
                            label="Next"
                            color="secondary"
                        />) : isLoading ?
                            (<Button
                                onClick={() => {}}
                                label="Loading ..."
                                color="secondary"
                                disabled={true}
                            />) :
                            (<Button
                                onClick={sendToGenerate}
                                label="Generate"
                                color="secondary"
                            />)
                    }

                </div>
            </div>

        </>
    )
}
export default GenerationBotInterface