import React, { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import { FaWrench, FaBriefcase } from 'react-icons/fa';

const PBar = () => {
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
    ];

    return (
        <div className="relative">
            {/* Trigger button */}
            <button onClick={() => setIsDropdownVisible(!isDropdownVisible)}>
                { /* User's name and trigger icon here */ }
            </button>

            {/* Dropdown menu */}
            {isDropdownVisible && (
                <div className="menu-3d-container absolute left-0 mt-2" ref={dropdownRef}>
                    <ul className="menu-3d bg-white shadow-lg rounded">
                        {menuItems.map((item, index) => (
                            <li className="menu-item-3d" key={index}>
                                <Link href={item.path}>
                                    <a className="flex items-center p-2 hover:bg-gray-100">
                                        <div className="menu-item-icon">{item.icon}</div>
                                        <div className="menu-item-label">{item.label}</div>
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PBar;
