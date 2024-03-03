import React, {createContext, useState, useContext, ReactNode, useEffect, SetStateAction} from 'react';
import {CPS} from "@/Components/CPS";

type AuthContextType = {
    data: UserType | null;
    setData: (userData: UserType | null) => void;
    loading: boolean; // Include loading in context type
};
type UserType = {
    id: (number | undefined | null);
    email: (string | undefined | null);
    username: (string | undefined | null);
    github_uid?: (string | null);
    github_nickname?: (string | null);
    github_repos?: (Array<string> | null);
    Creation_Process_State?: CPS | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children } : AuthProviderProps) => {
    const [data, setData] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true); // New loading state

    useEffect(() => {
        const savedUserData = localStorage.getItem('user');
        if (savedUserData && savedUserData !== "undefined") {
            try {
                setData(JSON.parse(savedUserData));
            } catch (e) {
                console.error("Error parsing savedUser:", e);
            }
        }
        setLoading(false); // Set loading to false after checking local storage
    }, []);

    const handleSetUser = (userData: UserType | null) => {
        setData(userData);
        if (userData) {
            localStorage.setItem('user', JSON.stringify(userData));
        } else {
            localStorage.removeItem('user');
        }
    };

    return (
        <AuthContext.Provider value={{ data, setData: handleSetUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};