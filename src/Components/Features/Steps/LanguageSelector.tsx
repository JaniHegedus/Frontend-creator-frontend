import React from "react";
import Button from "@/Components/Common/Button";

interface LanguageSelectorProps {
    nextStep: () => void;
    prevStep: () => void;
}

const LanguageSelector = ({nextStep}: LanguageSelectorProps, {prevStep}:LanguageSelectorProps) =>  {
    return(
        <>
            <div>
                <Button onClick={prevStep} label="Previous" color="primary" className="w-1"/>
                <Button onClick={nextStep} label="next" color="primary" className="w-1"/>
            </div>
        </>
    )
}
export default LanguageSelector