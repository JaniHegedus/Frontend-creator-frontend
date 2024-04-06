"use client";

import React, {useEffect, useState} from "react";
import { useAuth } from "@/Components/Contexts/AuthContext";
import LanguageSelector from "@/Components/Features/Steps/LanguageSelector";
import ExportOptions from "@/Components/Features/Steps/ExportOptions";
import GenerationBot from "@/Components/Features/Steps/GenerationBot";
import ImageEditor from "@/Components/Features/Steps/ImageEditor";
import EditorPage from "@/Components/Features/Steps/EditorPage";
import ConfirmModal from "@/Components/Modals/ConfirmModal";
import ProjectIniter from "@/Components/Features/Steps/ProjectIniter";
import Button from "@/Components/Common/Button";
import {useModal} from "@/Components/Contexts/ModalContext";
import DownloadSummary from "@/Components/Features/Steps/DownloadSummarry";
import {CPS} from "@/Components/Types/AuthContextTypes";

const Creator = () => {
    const user = useAuth();
    const { setData } =useAuth()
    const [error, setError] = useState('');
    const [step, setStep] = useState(1);
    const [done, setDone] = useState(false)
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const closeConfirmModal = () => setIsConfirmModalOpen(false);
    const [isDisabled, setIsDisabled] = useState(true)
    const [recent, setRecent] = useState<boolean>(false)
    const {openModal} = useModal();

    const [stepData, setStepData] = useState<CPS>({
        project: {
            projectName: null,
            projectDescription: null
        },
        pageCount: null,
        imageEdit: {},
        language: {
            programming: null,
            style: null
        },
        generationBot: null,
        codeEdit: null,
        exportOptions: null,
    });

    useEffect(() => {
        if(stepData)
        {
            setIsDisabled(false)
        }
    }, [stepData]);

    useEffect(() => {   //In case anything changes that is influencing the generation regeneration is possible!
        updateStepData('generationBot', false);
    }, [stepData.project, stepData.language,stepData.pageCount,stepData.imageEdit]);

    useEffect(() => {
        if (!user.loading && user.data === null) {
            setIsConfirmModalOpen(true);
            setError("You have to log in to begin creating!");
        }
        else {
            if(user.data?.Creation_Process_State === null || user.data?.Creation_Process_State === undefined)
            {
                setRecent(false);
            }
            else{
                setRecent(true);
            }
        }
    }, [user.loading, user.data]);

    const updateStepData = (key :any , value : any) => {
        setStepData(prevData => ({
            ...prevData,
            [key]: value,
        }));
    };

    const addToStepData = (key: any, subKey: any, value: any) => {
        setStepData((prevData) => ({
            ...prevData,
            [key]: {
                // @ts-ignore
                ...prevData[key],
                [subKey]: value, // This sets or updates the subKey with the new value
            },
        }));
    };


    const handleConfirm = () =>{
        window.location.href = "/"
    }


    // Handler to move to the next step
    const nextStep = () => {
        setStep(prevStep => prevStep + 1);
    };

    // Handler to move to the previous step
    const prevStep = () => {
        setStep(prevStep => Math.max(prevStep - 1, 1));
    };
    const afterExport = () =>{
        openModal(<DownloadSummary stepData={stepData}/>, onModalClose)
    }
    const onModalClose = () =>{
        setDone(true);
    }
    const handleSaveCurrent = () => {
        if (!user.loading) {
            const updatedUser =
                {
                    id:user.data?.id,
                    email:user.data?.email,
                    username:user.data?.username,
                    github_uid:user.data?.github_uid,
                    github_nickname:user.data?.github_nickname,
                    github_repos:user.data?.github_repos,
                    Creation_Process_State: stepData
                };
            setData(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        }
    };

    const handleLoadRecent = () => {
        if(user.data?.Creation_Process_State)
            setStepData(user.data?.Creation_Process_State);
    };
    const handleDeleteRecent = () => {
        if (!user.loading) {
            const updatedUser =
                {
                    id:user.data?.id,
                    email:user.data?.email,
                    username:user.data?.username,
                    github_uid:user.data?.github_uid,
                    github_nickname:user.data?.github_nickname,
                    github_repos:user.data?.github_repos,
                    Creation_Process_State: null
                };
            setData(updatedUser);
        }
    };
    const afterDone = () => {
        setStep(1);
        setDone(false);
        setStepData({
            project: {
                projectName: null,
                    projectDescription: null
            },
            pageCount: null,
                imageEdit: {},
            language: {
                programming: null,
                    style: null
            },
            generationBot: null,
                codeEdit: null,
                exportOptions: null,
        }
    )
    };
    return (
        <>
            <div className="flex flex-col justify-center items-center min-h-screen">
                <div className="w-full flex-1 overflow-auto p-4"> {/* Allow for padding and scrolling */}

                    {/* Conditional rendering based on the step */}

                    {step === 1 && (
                        <div>
                            <h2 className={"text-lg font-bold mb-4 pt-4"}>Step {step}: Project Name and Details</h2>
                            <ProjectIniter
                                project={stepData.project}
                                setProject={(projectName, projectDescription) => updateStepData('project', {
                                    projectName,
                                    projectDescription
                                })}
                                nextStep={nextStep}
                                pageCount={stepData.pageCount}
                                setPageCount={(newPageCount: any) => updateStepData('pageCount', newPageCount)}
                            />

                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <h2 className={"text-lg font-bold mb-4 pt-4"}>Step {step}: Preview and Edit Image</h2>
                            <ImageEditor
                                nextStep={nextStep}
                                prevStep={prevStep}
                                addToStepData={(fullname, location) => addToStepData('imageEdit', fullname, location)}
                            />
                        </div>
                    )}

                    {step === 3 && (
                        <div>
                            <h2 className={"text-lg font-bold mb-4 pt-4"}>Step {step}: Choose Language</h2>
                            <LanguageSelector
                                nextStep={nextStep}
                                prevStep={prevStep}
                                updateLanguage={(programming, style) => updateStepData('language', {
                                    programming,
                                    style
                                })}
                                language={stepData.language} // Ensure you're passing the current language selections if this is intended
                            />
                        </div>
                    )}

                    {step === 4 && (
                        <div>
                            <h2 className={"text-lg font-bold mb-4 pt-4"}>Step {step}: Send to Generation Bot</h2>
                            <GenerationBot
                                nextStep={nextStep}
                                prevStep={prevStep}
                                stepData={stepData}
                                updateStepData={updateStepData}
                                addToStepData={(fullname, location) => addToStepData('imageEdit', fullname, location)}
                                setGenerationBot={(newGenerationBotresponse: any) => updateStepData('generationBot', newGenerationBotresponse)}
                            />
                        </div>
                    )}

                    {step === 5 && (
                        <div>
                            <h2 className={"text-lg font-bold mb-4 pt-4"}>Step {step}: Edit in Code</h2>
                            <EditorPage nextStep={nextStep} prevStep={prevStep} stepData={stepData}/>
                        </div>
                    )}

                    {step === 6 && (
                        <div>
                            <h2 className={"text-lg font-bold mb-4 pt-4"}>Step 6: Export</h2>
                            <ExportOptions
                                prevStep={prevStep}
                                done={done}
                                afterExport={done ? afterDone : afterExport}
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
            {recent && (
                <>
                    <div className={"fixed bottom-24 left-5 rounded ="}>
                        <Button
                            onClick={handleLoadRecent}
                            label={"Load Previous"}
                            color={"primary"}/>
                    </div>
                    <div className={"fixed top-24 left-5 rounded ="}>
                        <Button
                            onClick={handleDeleteRecent}
                            label={"Delete Previous"}
                            color={"primary"}/>
                    </div>
                </>

            )}
            <div className={"fixed bottom-24 right-5 rounded ="}>
                <Button onClick={handleSaveCurrent}
                        label={"Save Current"}
                        disabled={isDisabled}
                        color={"primary"}/>
            </div>
        </>
    );
};
export default Creator;