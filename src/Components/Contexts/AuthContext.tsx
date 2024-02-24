import React, {createContext, useState, useContext, ReactNode, useEffect} from 'react';

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
    // Initialize state without localStorage access
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [data, setData] = useState<UserType | null>(null);

    useEffect(() => {
        // Safely access localStorage after component mounts
        const savedEmail = localStorage.getItem('userEmail');
        setUserEmail(savedEmail ? savedEmail : null);

        const savedUserData = localStorage.getItem('user');
        if (savedUserData && savedUserData !== "undefined") {
            try {
                setData(JSON.parse(savedUserData));
            } catch (e) {
                console.error("Error parsing savedUser:", e);
            }
        }
    }, []);
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