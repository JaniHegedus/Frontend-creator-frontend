import React, { useState } from 'react';
import Button from "@/Components/Common/Button";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { FooterProps } from "@/InterFaces/Layout/FooterProps";

const Footer = ({ darkMode, toggleDarkMode }: FooterProps) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className="relative w-full mx-auto p-2 ">
            {/* Toggle button */}
            <div
                className={isVisible ? "cursor-pointer bg-gray-500 fixed bottom-32 left-2 z-50 rounded-lg border-amber-100 dark:border-gray-600": "cursor-pointer bg-gray-500 fixed bottom-2 left-2 z-50 rounded-lg border-amber-100 dark:border-gray-600"}
                onClick={toggleVisibility}
                aria-label={isVisible ? "Hide footer" : "Show footer"}
            >
                {isVisible ? <FaArrowDown size={30} /> : <FaArrowUp size={30}/>}
            </div>

            {/* Footer content */}
            <div className={` w-screen ${isVisible ? 'fixed bottom-0 transition-opacity duration-500 opacity-100' : 'fixed bottom-0 transition-opacity duration-500 opacity-0 pointer-events-none'}  bg-white dark:bg-gray-700 p-6 shadow-lg border-2 border-amber-100 dark:border-gray-600 text-black dark:text-white`}>
                <div className="flex justify-between items-center">
                    <div className="text-left">
                        <span>Hegedüs János 2024 © All rights reserved.</span>
                    </div>
                    <div className="theme-toggle cursor-pointer">
                        <Button
                            label={darkMode ? "Light mode" : "Dark mode"}
                            onClick={toggleDarkMode}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
