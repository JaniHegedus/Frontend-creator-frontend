"use client";
import './globals.css'
import React, { useEffect, useState, useRef } from "react";
import Navbar from "@/app/layout/Navbar";
import Button from "@/Components/Common/Button";
import {ToastContainer} from "react-toastify";
import { AuthProvider } from '@/Components/Contexts/AuthContext';
import {ModalProvider} from "@/Components/Contexts/ModalContext";
import {NotifyMessage} from "@/Components/Common/ToastNotification/Notification";
import Head from 'next/head';

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
            const queryParams = new URLSearchParams(window.location.search);
            const error = queryParams.get('error');
            if (error) {
                const errorMessage = decodeURIComponent(error);
                NotifyMessage('error', 'Error', errorMessage);
                // Set the ref to true after showing the notification
                hasShownNotification.current = true;
            }
        }
    }, []);

    function toggleDarkMode() {
        const html = document.documentElement;
        const currentMode = html.classList.contains('dark');
        let theme = ""
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
        // @ts-ignore
        <html class={darkmode ? "dark" : ""}>
            <head>
                <title>Your Page Title</title>
                <link rel="icon" type="image/png" sizes="32x32" href="/Frontend_Creator.png" />
                {/* Additional sizes as needed */}
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                {/* Apple Touch Icon for iOS devices */}
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                {/* Manifest for PWA */}
                <link rel="manifest" href="/site.webmanifest" />
            </head>
            <AuthProvider>
                <ModalProvider>
                    <body className="font-sans bg-white text-black dark:bg-slate-900 dark:text-gray-600">
                    <ToastContainer position="top-right"/>
                    <header className="flex justify-between items-center p-4 bg-gray-400 dark:bg-gray-800 sticky top-0 z-50">
                        <span className="text-2xl font-bold dark:text-gray-300">Frontend Creator</span>
                        <Navbar />
                    </header>
                    <div className="center-content flex justify-center items-center h-[calc(100vh-2rem-60px)]">
                        {children}
                    </div>

                    <div className="footer flex justify-between items-center p-4 bg-gray-400 dark:bg-gray-800 fixed bottom-0 w-full dark:text-gray-300">
                        <span>Hegedüs János 2023 © All rights reserved.</span>
                        <div className="theme-toggle cursor-pointer">
                            <div className="theme-toggle cursor-pointer">
                                <Button
                                    label={darkmode ? "Light mode" : "Dark mode"}
                                    onClick={toggleDarkMode}
                                />
                            </div>
                        </div>
                    </div>
                    </body>
                </ModalProvider>
            </AuthProvider>
        </html>
    );
}
