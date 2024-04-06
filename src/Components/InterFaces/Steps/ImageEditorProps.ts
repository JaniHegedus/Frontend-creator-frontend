export interface ImageEditorProps {
    nextStep: () => void;
    prevStep: () => void;
    addToStepData:  (fullname : string, location : string) => void;
}