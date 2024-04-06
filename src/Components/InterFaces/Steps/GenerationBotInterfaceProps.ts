import {CPS} from "@/Components/Types/CPS";

export interface GenerationBotInterfaceProps {
    nextStep: () => void;
    prevStep: () => void;
    stepData: CPS | null;
    updateStepData: (key: any, value: any) => void;
    addToStepData:  (fullname : string, location : string) => void;
    setGenerationBot: (generationbot : any) => void;
}