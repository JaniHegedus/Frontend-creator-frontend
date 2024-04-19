"use client";
import './globals.css'
import React, { useEffect, useState, useRef } from "react"
import {ToastContainer} from "react-toastify";
import { AuthProvider } from '@/Components/Contexts/AuthContext';
import {ModalProvider} from "@/Components/Contexts/ModalContext";
import {NotifyMessage} from "@/Components/Common/ToastNotification/Notification";
import Header from "@/Components/Layout/Header";
import Footer from "@/Components/Layout/Footer";

export default function RootLayout({ children }: {children: React.ReactNode})
{
    const hasShownNotification = useRef(false);
    const [darkmode, setDarkmode] = useState(true);
    useEffect(() => {
        // Use the key 'theme' to get the stored theme
        setDarkmode(localStorage.getItem("theme") === "dark");
        if (hasShownNotification.current) {
            return;
        }

        if (typeof window !== 'undefined') {
            let queryParams = new URLSearchParams(window.location.search);
            // @ts-ignore
            const error = queryParams.get('error');
            if (error) {
                const errorMessage = decodeURIComponent(error);
                NotifyMessage('error', 'Error', errorMessage);
                // Set the ref to true after showing the notification
                hasShownNotification.current = true;
            }
        }
    }, []);
    useEffect(() => {
        // Change the class on the html element
        const html = document.documentElement;
        if (darkmode) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }, [darkmode]); // Re-run when darkmode changes

    function toggleDarkMode() {
        const html = document.documentElement;
        const currentMode = html.classList.contains('dark');
        if (currentMode) {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light'); // Use the key 'theme' to store the theme
            localStorage.setItem('themeE', 'chrome'); // Use the key 'theme' to store the theme
            setDarkmode(false);
        } else {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark'); // Use the key 'theme' to store the theme
            localStorage.setItem('themeE', 'monokai'); // Use the key 'theme' to store the theme
            setDarkmode(true);
        }
    }

    return (
        <html>
            <head>
                <title>Frontend Creator</title>
            </head>
            <AuthProvider>
                <ModalProvider>
                    <body className="font-sans bg-blue-100 text-black dark:bg-slate-900 dark:text-gray-600">
                        <ToastContainer position="top-right"/>
                            <Header/>
                            <div className="center-content flex justify-center items-center mb-20">
                                {children}
                            </div>
                        <Footer darkMode={darkmode} toggleDarkMode={toggleDarkMode}/>
                    </body>
                </ModalProvider>
            </AuthProvider>
        </html>
    );
}
