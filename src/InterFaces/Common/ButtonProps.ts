import React from "react";

export interface ButtonPropsWithLabel {
    label: string;
    content?: React.ReactNode | null;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
    color?: 'primary' | 'secondary';
}

export interface ButtonPropsWithContent {
    label?: string | null;
    content?: React.ReactNode;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
    color?: 'primary' | 'secondary' | "list";
}