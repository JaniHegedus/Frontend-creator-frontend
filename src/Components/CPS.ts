export type CPS = {
    project: {
        projectName: string | null,
        projectDescription: string | null
    },
    pageCount: number | null,
    imageEdit: Record<string, unknown>, // Using Record type for a more precise definition than {}
    language: {
        programming: string | null,
        style: string | null
    },
    generationBot: string | null,
    codeEdit: string | null,
    exportOptions: string | null,
};
