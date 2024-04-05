"use client"
import React, {useEffect, useState} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Button from "@/Components/Common/Button";
import { useAuth } from "@/Components/Contexts/AuthContext";
import FeatureCard from "@/Components/FeatureCard";

export default function Home() {
    const [theme, setTheme] = useState<boolean>()
    useEffect(() => {
        if(localStorage.getItem('themeE'))
        {
            setTheme(localStorage.getItem('themeE') === 'monokai');
        }
    }, []);

    const user = useAuth();
    const [HEROImage, setHEROImage] =useState("/CodeEditor_Dark.jpg");
    useEffect(() => {
        // Safely access localStorage and update theme state
        if(localStorage && localStorage.getItem('themeE'))
        {
            const storedTheme = localStorage.getItem('themeE');
            setTheme(storedTheme === 'monokai');

            // Update HEROImage based on the theme
            setHEROImage(theme ? "./CodeEditor_Dark.jpg" : "./CodeEditor_Light.jpg");
        }
    }, [theme]); // Depend on theme state to re-run this effect

    const handleGetStarted = () =>{
        if(user.data)
        {
            window.location.href = "/Creator"
        }else
        {
            window.location.href = "/UserAuth"
        }
    }
    return (
        <div className="flex flex-col bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white">

            {/* Hero Section with Image */}
            <div className="flex flex-col lg:flex-row justify-between items-center bg-gray-300 dark:bg-gray-700 p-4 lg:p-10">
                <div className="text-center lg:text-left lg:ml-10">
                    <h1 className="text-4xl lg:text-6xl font-bold mb-4">Create your own Frontend code base with Ai assist!</h1>
                    <p className="mb-6">You can create an amazing FrontEnd with FC in just minutes. Join our users and
                        build one yourself.</p>
                    <ul className="mb-6 text-left list-disc list-inside">
                        <li>Now with the AI website builder!</li>
                        <li>Have text content written for you</li>
                        <li>Update relevant images to your site</li>
                    </ul>
                    <button onClick={handleGetStarted}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition ease-in-out duration-300">Get
                        started for free
                    </button>
                </div>
                <div className="mt-6 lg:mt-0">
                    <img src={HEROImage} alt="Hero" className="mx-auto rounded-lg shadow-lg lg:block"/>
                </div>
            </div>

            {/* Features Section */}
            <div className="px-4 lg:px-10 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <FeatureCard title="AI Generation" description="Let Ai Generate your page while you lean back."/>
                <FeatureCard title="Multiple pages"
                             description="You can create as many pages as you wish, and save them on our page."/>
                <FeatureCard title="Open to customization" description="Customize every bit of the page!"/>
                <FeatureCard title="Choose the language"
                             description="We let you decide what the perfect programming language is for your own project!"/>
                <FeatureCard title="Github Integration"
                             description="Your created pages can be directly exported to your github repositories!"/>
            </div>
        </div>

    );
}
