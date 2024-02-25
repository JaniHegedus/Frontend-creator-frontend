import React from "react";
import Button from "@/Components/Common/Button";

interface GenerationBotInterfaceProps {
    nextStep: () => void;
    prevStep: () => void;
}

const GenerationBotInterface = ({nextStep, prevStep}:GenerationBotInterfaceProps) =>  {
    return(
        <>
            <div>
                <Button onClick={prevStep} label="Previous" color="secondary" className="w-1"/>
                <Button onClick={nextStep} label="Next" color="secondary" className="w-1"/>
            </div>
        </>
    )
}
export default GenerationBotInterface