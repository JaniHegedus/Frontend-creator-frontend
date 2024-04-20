"use client"
import React, {createContext, useState, useContext, useEffect} from 'react';
import {AuthContextType, UserType} from "@/Types/AuthContextTypes";
import {AuthProviderProps} from "@/InterFaces/Contexts/AuthProviderProps";
import ConfirmModal from "@/Components/Modals/ConfirmModal";
import axios from "axios";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children } : AuthProviderProps) => {

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const [data, setData] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true); // New loading state
    const [isErrorConfirmModalOpen, setIsErrorConfirmModalOpen] = useState(false);
    const openErrorConfirmModal = () => setIsErrorConfirmModalOpen(true);
    const [error, setError] = useState('');
    const closeErrorConfirmModal = () => setIsErrorConfirmModalOpen(false);

    useEffect(() => {
        const checkTOKEN = async () => {
            let token: string| null;
            if(typeof localStorage != undefined)
                token = localStorage.getItem('token');
            // @ts-ignore
            if (token) {
                //console.info("Checking TOKEN")
                try {
                    await axios.get(`${backendUrl}/token`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    })
                } catch (error) {
                    if (axios.isAxiosError(error) && error.response?.status === 401) {
                        setError('Session Expired. You have to log in again.');
                        token=null;
                        setData(null);
                    } else {
                        setError('Failed to validate token.');
                        token=null;
                        setData(null);
                    }
                    openErrorConfirmModal();
                }
            }
        }
        // Run checkTOKEN immediately when component mounts
        checkTOKEN();
        // Set up the interval to run checkTOKEN every 10 minutes
        const intervalId = setInterval(checkTOKEN, 600000); // 600,000 ms = 10 minutes
        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);


    const handleConfirmErrorModal = () =>{
        console.info("click")
        localStorage.removeItem('token')
        closeErrorConfirmModal();
        if (typeof window !== 'undefined')
            window.location.href = "/";
    }

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
        <AuthContext.Provider value={{data, setData: handleSetUser, loading}}>
            {children}
            <ConfirmModal
                isOpen={isErrorConfirmModalOpen}
                onClose={closeErrorConfirmModal}
                onConfirm={handleConfirmErrorModal}
                message={error}
                noNo={true}
            />
        </AuthContext.Provider>
    );
};