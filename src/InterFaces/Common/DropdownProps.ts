import {Option} from "@/InterFaces/Steps/Option";

export interface DropdownProps {
    options: Option[];
    onSelect: (option: Option) => void; // onSelect now expects a function that takes an Option type as an argument
    className?: string;
    disabled?: boolean;
    color?: string;
    placeholder?: string;
    selectedValue?: any;
}