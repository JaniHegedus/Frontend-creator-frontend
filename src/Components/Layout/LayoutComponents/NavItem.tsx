import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const NavItem = ({ href, Name }: { href: string; Name: string }) => {
    const [isActive, setIsActive] = useState(false);


    useEffect(() => {
        // Function to check if the href matches the current pathname
        const checkActive = () => {
            // Ensure we are in the browser environment
            if (typeof window !== "undefined") {
                setIsActive(window.location.pathname === href);
            }
        };

        // Check immediately on mount
        checkActive();

        // Set up the interval to check active state
        const intervalId = setInterval(checkActive, 1000); // check every 1000ms (1 second)

        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, [href]);

    const activeClass = "bg-blue-500 dark:bg-blue-800";
    const inactiveClass = "bg-gray-500 dark:bg-gray-700";

    return (
        <div
            className={`flex items-center justify-center py-1 px-2 ${
                isActive ? activeClass : inactiveClass
            } sticky top-0 border-2 border-blue-500 dark:border-blue-800 rounded-md mr-3 dark:text-gray-300 hover:bg-blue-400 dark:hover:bg-blue-800 w-full text-center`}
        >
            <Link href={href} passHref>
                {Name}
            </Link>
        </div>
    );
};

export default NavItem;