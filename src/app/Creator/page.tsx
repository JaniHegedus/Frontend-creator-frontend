"use client";

import React, {useEffect, useState} from "react";
import { useAuth } from "@/Components/Contexts/AuthContext";
import FrontPageDesigner from "@/Components/Features/Steps/FrontPageDesigner";
import LanguageSelector from "@/Components/Features/Steps/LanguageSelector";
import ExportOptions from "@/Components/Features/Steps/ExportOptions";
import GenerationBotInterface from "@/Components/Features/Steps/GenerationBotInterface";
import ImageEditor from "@/Components/Features/Steps/ImageEditor";
import EditorPage from "@/Components/Features/Steps/EditorPage";
import ConfirmModal from "@/Components/Modals/ConfirmModal";
import PageCount from "@/Components/Features/Steps/PageCount";

const Creator = () => {
    const user = useAuth();
    // State to keep track of the current step
    const [error, setError] = useState('');
    const [step, setStep] = useState(1);
    const [done, setDone] = useState(true)
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const closeConfirmModal = () => setIsConfirmModalOpen(false);
    const [pageCount, setPageCount] = useState(null);

    const [stepData, setStepData] = useState({
        pageCount: null,
        layout: null,
        imageEdit: null,
        language: { programming: null, style: null }, // Adjusted for language selections
        generationBot: null,
        codeEdit: null,
        exportOptions: null,
    });

    const updateStepData = (key :any , value : any) => {
        setStepData(prevData => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleConfirm = () =>{
        window.location.href = "/"
    }

    useEffect(() => {
        if (!user.loading && user.data == null) {
            setIsConfirmModalOpen(true);
            setError("You have to log in to begin creating!");
        }
    }, [user.loading, user.data]);

    // Debugging pageCount change
    useEffect(() => {
        console.log("Page count has been updated to:", stepData.pageCount);
    }, [stepData.pageCount]);

    // Debugging language change
    useEffect(() => {
        console.log("Language selection has been updated to:", stepData.language);
    }, [stepData.language]);

    useEffect(() => {
        console.log(stepData)
    }, [step]);

    // Handler to move to the next step
    const nextStep = () => {
        setStep(prevStep => prevStep + 1);
    };

    // Handler to move to the previous step
    const prevStep = () => {
        setStep(prevStep => Math.max(prevStep - 1, 1));
    };
    const afterExport = () =>{

    }
    return (
        <>
            <div className={"flex justify-center container mx-auto px-4 text-center items-center align-middle w-screen"}>
                <div className={"my-10"}>

                    {/* Conditional rendering based on the step */}
                    {step === 1 && (
                        <div>
                            <h2 className={"text-lg font-bold mb-4"}>Step {step}: Choose Page Count</h2>
                            <PageCount
                                nextStep={nextStep}
                                pageCount={stepData.pageCount}
                                setPageCount={(newPageCount : any) => updateStepData('pageCount', newPageCount)}
                            />

                        </div>
                    )}
                    {step === 2 && (
                        <div>
                            <h2 className={"text-lg font-bold mb-4"}>Step {step}: Choose Layout</h2>
                            <FrontPageDesigner nextStep={nextStep} prevStep={prevStep}/>
                        </div>
                    )}

                    {step === 3 && (
                        <div>
                            <h2 className={"text-lg font-bold mb-4"}>Step {step}: Preview and Edit Image</h2>
                            <ImageEditor nextStep={nextStep} prevStep={prevStep} />
                        </div>
                    )}

                    {step === 4 && (
                        <div>
                            <h2 className={"text-lg font-bold mb-4"}>Step {step}: Choose Language</h2>
                            <LanguageSelector
                                nextStep={nextStep}
                                prevStep={prevStep}
                                updateLanguage={(programming, style) => updateStepData('language', { programming, style })}
                                language={stepData.language} // Ensure you're passing the current language selections if this is intended
                            />
                        </div>
                    )}

                    {step === 5 && (
                        <div>
                            <h2 className={"text-lg font-bold mb-4"}>Step {step}: Send to Generation Bot</h2>
                            <GenerationBotInterface nextStep={nextStep} prevStep={prevStep} />
                        </div>
                    )}

                    {step === 6 && (
                        <div>
                            <h2 className={"text-lg font-bold mb-4"}>Step {step}: Edit in Code</h2>
                            <EditorPage nextStep={nextStep} prevStep={prevStep} />
                        </div>
                    )}

                    {step === 7 && (
                        <div>
                            <h2 className={"text-lg font-bold mb-4"}>Step 6: Export</h2>
                            <ExportOptions
                                prevStep={prevStep}
                                done={done}
                                afterExport={afterExport}
                                selectedExportOption={stepData.exportOptions || ''}
                                updateExportOption={(value) => updateStepData('exportOptions', value)}
                            />
                        </div>
                    )}
                </div>
            </div>
            <ConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={closeConfirmModal}
                onConfirm={handleConfirm}
                message={error}
                noNo={true}
            />
        </>
    );
};
export default Creator;