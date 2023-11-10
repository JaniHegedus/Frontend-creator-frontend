// AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

type AuthContextType = {
    data: UserType | null; // Now user is of type UserType or null
    setData: (userData: UserType | null) => void; // setUser accepts UserType or null
};
type UserType = {
    id: (number | undefined | null);
    email: (string | undefined | null);
    username: (string | undefined | null);
    github_uid: (string | null);
    github_nickname: (string | null);
    github_repos: (Array<string> | null);
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [userEmail, setUserEmail] = useState<string | null>(() => {
        // Get the stored email from localStorage
        const savedEmail = localStorage.getItem('userEmail');
        return savedEmail ? savedEmail : null;
    });
    const [data, setData] = useState<{id:number | undefined | null; email: string | undefined | null; username: string | undefined | null; github_uid: string|null; github_nickname:string|null; github_repos: Array<string>|null } | null>(() => {
        // Get the stored user data from localStorage
        const savedUser = localStorage.getItem('user');
        if (!savedUser || savedUser === "undefined") {
            return null;
        }

        try {
            return JSON.parse(savedUser);
        } catch (e) {
            console.error("Error parsing savedUser:", e);
            return null;
        }
    });

    const handleSetUser = (userData: {id:number | undefined | null; email: string | undefined | null; username: string | undefined | null; github_uid: string|null; github_nickname:string|null; github_repos: Array<string>|null} | null) => {
        setData(userData);
        // Store the user data in localStorage
        if (userData) {
            localStorage.setItem('user', JSON.stringify(userData));
        } else {
            localStorage.removeItem('user');
        }
    };
    return (
        <AuthContext.Provider value={{
            data,                   // Pass the user state
            setData: handleSetUser, // Pass the setUser function you've defined
        }}>
            {children}
        </AuthContext.Provider>
    );
};