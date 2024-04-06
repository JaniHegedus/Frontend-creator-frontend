import {UserType} from "@/Components/Types/UserType";

export type AuthContextType = {
    data: UserType | null;
    setData: (userData: UserType | null) => void;
    loading: boolean; // Include loading in context type
};