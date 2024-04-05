"use client"
import React, {useEffect, useState} from 'react';

const TutorialPage = () => {
    const [theme, setTheme] = useState<boolean>()
    const [storedTheme, setStoredTheme] = useState<string | null>();
    useEffect(() => {
        if(localStorage.getItem('themeE'))
        {
            setTheme(localStorage.getItem('themeE') === 'monokai');
        }
    }, []);
    const [DIR, setDIR] = useState("Light")
    // You can add state and functions here if needed
    useEffect(() => {
        if(localStorage.getItem('themeE')){
            setStoredTheme( localStorage.getItem('themeE'));
        }

        // Safely access localStorage and update theme state
        setTheme(storedTheme === 'monokai');

        // Update HEROImage based on the theme
        setDIR(theme ? "Dark" : "Light");
    }, [theme]); // Depend on theme state to re-run this effect
    return (
        <div className="flex flex-col bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white">
            {/* Hero Section */}
            <div className="flex justify-center items-center bg-gray-300 dark:bg-gray-700 p-12 pb-1">
                <h1 className="text-5xl font-bold mb-6">Build Your Site with Ease</h1>
            </div>
            <div  className="flex justify-center items-center bg-gray-300 dark:bg-gray-700 p-1">
                <img src={"/Frontend_Creator.png"} alt="Hero" className="rounded-lg shadow-lg w-10 h-10"/>
            </div>

            {/* How It Works Section */}
            <div className="bg-gray-300 dark:bg-gray-700 p-10">
                <h2 className="text-3xl font-bold text-center mb-6">How It Works</h2>
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center">
                        <img src={`./${DIR}/Project-Initer.png`} alt="Init" className="w-60 h-40 mb-4"/>
                        <p>Init your Project.</p>
                    </div>
                    {/* Step 2 */}
                    <div className="flex flex-col items-center">
                        <img src={`./${DIR}/Image Editor.png`} alt="Upload or create" className="w-60 h-40 mb-4"/>
                        <p>Upload a picture or start from scratch.</p>
                    </div>
                    {/* Step 3 */}
                    <div className="flex flex-col items-center">
                        <img src={`./${DIR}/Language.png`} alt="Customize" className="w-60 h-40 mb-4"/>
                        <p>Chose Generation Languages.</p>
                    </div>
                    {/* Step 4 */}
                    <div className="flex flex-col items-center">
                        <img src={`./${DIR}/Project Summarry.png`} alt="Deploy" className="w-60 h-40 mb-4"/>
                        <p>Summarize your project details and send to bot.</p>
                    </div>

                    {/* Step 5 */}
                    <div className="flex flex-col items-center">
                        <img src={`./${DIR}/Code Editor.png`} alt="Code" className="w-60 h-40 mb-4"/>
                        <p>Edit your code.</p>
                    </div>
                    {/* Step  6*/}
                    <div className="flex flex-col items-center">
                        <img src={`./${DIR}/Export.png`} alt="Deploy" className="w-60 h-40 mb-4"/>
                        <p>Push to git, download, or keep it on the server.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorialPage;
