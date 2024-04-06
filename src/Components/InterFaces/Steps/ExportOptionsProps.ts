export interface ExportOptionsProps {
    prevStep: () => void;
    done?: boolean;
    afterExport: (() => void);
    selectedExportOption: string;
    updateExportOption: (value: string) => void; // Callback to update the export option in the parent state
}