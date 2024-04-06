export interface LanguageSelectorProps {
    nextStep: () => void;
    prevStep: () => void;
    updateLanguage: (programming: string | null, style: string | null) => void;
    language: {
        programming: string | null;
        style: string | null;
    };
}