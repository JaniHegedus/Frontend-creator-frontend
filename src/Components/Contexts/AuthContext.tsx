import React, {createContext, useState, useContext, useEffect} from 'react';
import {AuthContextType, UserType} from "@/Types/AuthContextTypes";
import {AuthProviderProps} from "@/InterFaces/Contexts/AuthProviderProps";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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