export interface PageCountProps {
    nextStep: () => void;
    pageCount: number | null;
    setPageCount: any;
    disabled: boolean;
}