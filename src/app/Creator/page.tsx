"use client";

import React, { useState } from "react";
import { useAuth } from "@/Components/Contexts/AuthContext";
import FrontPageDesigner from "@/Components/Features/Steps/FrontPageDesigner";
import LanguageSelector from "@/Components/Features/Steps/LanguageSelector";
import ExportOptions from "@/Components/Features/Steps/ExportOptions";
import GenerationBotInterface from "@/Components/Features/Steps/GenerationBotInterface";
import ImageEditor from "@/Components/Features/Steps/ImageEditor";
import EditorPage from "@/Components/Features/Steps/editor";

const Creator = () => {
    const user = useAuth();
    // State to keep track of the current step
    const [step, setStep] = useState(1);

    // Handler to move to the next step
    const nextStep = () => {
        setStep(prevStep => prevStep + 1);
    };

    // Handler to move to the previous step
    const prevStep = () => {
        setStep(prevStep => Math.max(prevStep - 1, 1));
    };

    return (
        <div className={"flex justify-center container mx-auto px-4 text-center items-center align-middle w-screen"}>
            <div className={"my-10"}>
                {/* Conditional rendering based on the step */}
                {step === 1 && (
                    <div>
                        <h2 className={"text-lg font-bold mb-4"}>Step 1: Choose Layout</h2>
                        <FrontPageDesigner nextStep={nextStep} />
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h2 className={"text-lg font-bold mb-4"}>Step 2: Preview and Edit Image</h2>
                        <ImageEditor nextStep={nextStep} prevStep={prevStep} />
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <h2 className={"text-lg font-bold mb-4"}>Step 3: Choose Language</h2>
                        <LanguageSelector nextStep={nextStep} prevStep={prevStep} />
                    </div>
                )}

                {step === 4 && (
                    <div>
                        <h2 className={"text-lg font-bold mb-4"}>Step 4: Send to Generation Bot</h2>
                        <GenerationBotInterface nextStep={nextStep} prevStep={prevStep} />
                    </div>
                )}

                {step === 5 && (
                    <div>
                        <h2 className={"text-lg font-bold mb-4"}>Step 5: Edit in Code</h2>
                        <EditorPage nextStep={nextStep} prevStep={prevStep} />
                    </div>
                )}

                {step === 6 && (
                    <div>
                        <h2 className={"text-lg font-bold mb-4"}>Step 6: Export</h2>
                        <ExportOptions prevStep={prevStep} />
                    </div>
                )}
            </div>
        </div>
    );
};
export default Creator;