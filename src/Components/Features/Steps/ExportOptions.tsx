import React from "react";
import Button from "@/Components/Common/Button";

interface ExportOptionsProps {
    prevStep: () => void;
}

const ExportOptions = ({prevStep}: ExportOptionsProps) =>  {
    return(
        <>
            <div>
                <Button onClick={prevStep} label="Previous" color="primary" className="w-1"/>
            </div>
        </>
    )
}
export default ExportOptions