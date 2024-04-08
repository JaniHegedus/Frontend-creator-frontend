export interface ProjectIniterProps {
    nextStep: () => void;
    setPageCount: (pagecount:any) => void;
    pageCount: any;
    setProject: (projectName: string, projectDescription: string) => void;
    project: {
        projectName: string | null,
        projectDescription: string | null
    }
}