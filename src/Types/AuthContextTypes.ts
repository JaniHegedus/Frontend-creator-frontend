export type AuthContextType = {
    data: UserType | null;
    setData: (userData: UserType | null) => void;
    loading: boolean; // Include loading in context type
};

export type UserType = {
    id: (number | undefined | null);
    email: (string | undefined | null);
    username: (string | undefined | null);
    github_uid?: (string | null);
    github_nickname?: (string | null);
    github_repos?: (Array<string> | null);
    Creation_Process_State?: CPS | null;
};
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
