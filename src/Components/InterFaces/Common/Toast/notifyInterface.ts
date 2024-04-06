export interface notifyInterface {
    position?: "top-right" | "bottom-left";
    delay?: number;
    progressBar?: boolean;
    type?: "default" | "success" | "warning" | "error";
    label?: string;
    text?: string;
}
