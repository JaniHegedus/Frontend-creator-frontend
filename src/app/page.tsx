"use client"
import React, {useEffect, useState} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Button from "@/Components/Common/Button";
import { useAuth } from "@/Components/Contexts/AuthContext";

export default function Home() {
    const [theme, setTheme] = useState(localStorage.getItem('themeE') === 'monokai')
    const { setData } = useAuth();
    const [HEROImage, setHEROImage] =useState("/CodeEditor_Dark.jpg");
    useEffect(() => {
        // Safely access localStorage and update theme state
        const storedTheme = localStorage.getItem('themeE');
        setTheme(storedTheme === 'monokai');

        // Update HEROImage based on the theme
        setHEROImage(theme ? "./CodeEditor_Dark.jpg" : "./CodeEditor_Light.jpg");
    }, [theme]); // Depend on theme state to re-run this effect

    const handleClick = () => {
        // Clear user-related information from local storage and reset user state
        localStorage.clear();
        setData(null);
    };
    return (
        <div className="flex flex-col min-h-screen bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white h-12">

            {/* Hero Section with Image */}
            <div className="flex justify-between items-center bg-gray-300 dark:bg-gray-700 p-10">
                <div className="max-w-xl ml-10">
                    <h1 className="text-6xl font-bold mb-4">Create your own website for free!</h1>
                    <p className="mb-6">You can create an amazing FrontEnd with FC in just minutes. Join our users and build one yourself.</p>
                    <ul className="mb-6">
                        <li>Now with the AI website builder!</li>
                        <li>Have text content written for you</li>
                        <li>Update relevant images to your site</li>
                    </ul>
                    <Button label="Get started for free" onClick={() => {}} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition ease-in-out duration-300"/>
                </div>
                <div>
                    <img src={HEROImage} alt="Hero" className="hidden lg:block rounded-lg shadow-lg"/>
                </div>
            </div>

            {/* Features Section */}
            <div className="px-10 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <div
                    className="max-w-md mx-auto bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg border-2 border-amber-100 dark:border-gray-600 m-2">
                    <h3 className="text-2xl font-bold mb-2">AI Generation</h3>
                    <p className="text-sm">Let Ai Generate your page while you lean back.</p>
                </div>
                <div
                    className="max-w-md mx-auto bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg border-2 border-amber-100 dark:border-gray-600 m-2">
                    <h3 className="text-2xl font-bold mb-2">Multiple pages</h3>
                    <p className="text-sm">You can create as many pages as you wish, and save them on our page.</p>
                </div>
                <div
                    className="max-w-md mx-auto bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg border-2 border-amber-100 dark:border-gray-600 m-2">
                    <h3 className="text-2xl font-bold mb-2">Open to customization</h3>
                    <p className="text-sm">Customize every bit of the page!</p>
                </div>
                <div
                    className="max-w-md mx-auto bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg border-2 border-amber-100 dark:border-gray-600 m-2">
                    <h3 className="text-2xl font-bold mb-2">Choose the language</h3>
                    <p className="text-sm">We let you decide what the perfect programming language is for your own
                        project!</p>
                </div>

                <div
                    className="max-w-md mx-auto bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg border-2 border-amber-100 dark:border-gray-600 m-2">
                    <h3 className="text-2xl font-bold mb-2">Github Integration</h3>
                    <p className="text-sm">Your created pages can be directly exported to your github repositories!</p>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="bg-gray-300 dark:bg-gray-700 p-10">
                <h2 className="text-3xl font-bold text-center mb-6">How It Works</h2>
                <div className="max-w-2xl mx-auto">
                    <p className="mb-3">Step 1: Sign up for free.</p>
                    <p>Step 2: Choose a template or start from scratch.</p>
                    <p>Step 3: Upload a visualized idea.</p>
                    <p>Step 4: Change page generation Lables.</p>
                    <p>Step 5: Edit your code.</p>
                    <p>fc</p>
                </div>
            </div>
        </div>
    );
}
