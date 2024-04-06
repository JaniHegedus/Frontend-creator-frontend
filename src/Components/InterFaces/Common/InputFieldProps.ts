export interface InputFieldProps {
    id?: string;
    type: string;
    value?: any;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    required?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
}