import React from "react";
import Button from "@/Components/Common/Button";

interface GenerationBotInterfaceProps {
    nextStep: () => void;
    prevStep: () => void;
}

const GenerationBotInterface = ({nextStep}: GenerationBotInterfaceProps, {prevStep}:GenerationBotInterfaceProps) =>  {
    return(
        <>
            <div>
                <Button onClick={prevStep} label="Previous" color="primary" className="w-1"/>
                <Button onClick={nextStep} label="next" color="primary" className="w-1"/>
            </div>
        </>
    )
}
export default GenerationBotInterface