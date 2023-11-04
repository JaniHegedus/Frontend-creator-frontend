// AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

type AuthContextType = {
    user: UserType | null; // Now user is of type UserType or null
    setUser: (userData: UserType | null) => void; // setUser accepts UserType or null
    userEmail: string | null; // If you still need a separate userEmail property
    setUserEmail: (email: string | null) => void; // Function to set userEmail
};
type UserType = {
    email: string;
    username: string;
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
    const [user, setUser] = useState<{ email: string; username: string } | null>(() => {
        // Get the stored user data from localStorage
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const handleSetUserEmail = (email: string | null) => {
        setUserEmail(email);
        // Store the email in localStorage
        if (email) {
            localStorage.setItem('userEmail', email);
        } else {
            localStorage.removeItem('userEmail');
        }
    };

    const handleSetUser = (userData: { email: string; username: string } | null) => {
        setUser(userData);
        // Store the user data in localStorage
        if (userData) {
            localStorage.setItem('user', JSON.stringify(userData));
        } else {
            localStorage.removeItem('user');
        }
    };

    return (
        <AuthContext.Provider value={{
            user,                   // Pass the user state
            setUser: handleSetUser, // Pass the setUser function you've defined
            userEmail,              // Pass the userEmail state
            setUserEmail: handleSetUserEmail, // Pass the setUserEmail function you've defined
        }}>
            {children}
        </AuthContext.Provider>
    );
};