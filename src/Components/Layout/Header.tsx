import React, { useState, useEffect } from 'react';
import Navbar from "@/Components/Layout/LayoutComponents/Navbar";

const Header = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlHeaderVisibility = () => {
        // Determine the current scroll direction
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
            // Scrolling down
            setIsVisible(false);
        } else {
            // Scrolling up
            setIsVisible(true);
        }
        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        // Add scroll event listener
        window.addEventListener('scroll', controlHeaderVisibility);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('scroll', controlHeaderVisibility);
        };
    }, [lastScrollY]); // Depend on lastScrollY to capture the latest scroll position


    return (
        <header className={`flex justify-center items-center p-4 bg-gray-400 dark:bg-gray-800 sticky w-full top-0 z-50 transition-opacity duration-300 text-center ${!isVisible ? 'opacity-0' : 'opacity-100'}`}>
            <span className="text-xl sm:text-2xl font-bold dark:text-gray-300">Frontend Creator</span>
            <Navbar/>
        </header>
    );
};

export default Header;
