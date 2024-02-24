import React, { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import {FaWrench, FaBriefcase, FaFolder} from 'react-icons/fa';
import Button from "@/Components/Common/Button";
import {useAuth} from "@/Components/Contexts/AuthContext";

const PBar = () => {
    const { data} = useAuth()
    // State to handle the visibility of the dropdown
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    // Ref for the dropdown to handle clicks outside
    const dropdownRef = useRef(null);

    // Handle clicking outside the dropdown to close it
    useEffect(() => {
        function handleClickOutside(event:any) {
            // @ts-ignore
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownVisible(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const menuItems = [
        { icon: <FaWrench />, label: "Change User Info", path: "/Profile" },
        { icon: <FaBriefcase />, label: "Github", path: "/Github" },
        { icon: <FaFolder/>, label: "My Files", path: "/MyFiles" }
    ];
    const setVisible = () => {
        if (isDropdownVisible) {
            setIsDropdownVisible(false);
        }else {
            setIsDropdownVisible(true);
        }
    }

    return (
        <>
            <Button label={data?.username ?? " "} onClick={() => setVisible()}/>
            <div className="relative">
                {/* Dropdown menu */}
                {isDropdownVisible && (
                    <div className="relative">
                        {/* Dropdown menu */}
                        {isDropdownVisible && (
                            <div className="absolute right-0.5 top-10 mt-2 bg-blue-400 dark:bg-blue-800" style={{perspective: '1500px'}}>
                                <ul className="list-none p-0">
                                    {menuItems.map((item, index) => (
                                        <li className="text-black dark:text-gray-400 relative w-60 h-12 mb-2 bg-gray-400 shadow-lg transition-transform duration-500 origin-center-left transform dark:bg-gray-800 hover:bg-blue-400  dark:hover:bg-blue-800"
                                            key={index} style={{transformOrigin: 'center left'}}>
                                            <Link href={item.path} className="flex items-center p-2">
                                                <div className="flex items-center justify-center w-12 mr-2">
                                                    {item.icon}
                                                </div>
                                                <div className="flex-grow">
                                                    {item.label}
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                )}
            </div>

        </>
    );
};

export default PBar;
