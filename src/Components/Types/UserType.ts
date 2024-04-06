import {CPS} from "@/Components/Types/CPS";

export type UserType = {
    id: (number | undefined | null);
    email: (string | undefined | null);
    username: (string | undefined | null);
    github_uid?: (string | null);
    github_nickname?: (string | null);
    github_repos?: (Array<string> | null);
    Creation_Process_State?: CPS | null;
};