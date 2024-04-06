import React from 'react';
import Link from "next/link";
import {FaWrench, FaBriefcase, FaFolder} from 'react-icons/fa';
import Button from "@/Components/Common/Button";
import {useAuth} from "@/Components/Contexts/AuthContext";
import useAutoHide from "@/Components/Functions/AutoHide";

const PBar = () => {
    const { data} = useAuth()
    // State to handle the visibility of the dropdown
    // Ref for the dropdown to handle clicks outside
    const { isVisible, show, hide } = useAutoHide(5000); // Set the auto-hide time to 5000ms (5 seconds)
    const setVisible = () => {
        if (isVisible) {
            hide();
        } else {
            show();
        }
    };
    const menuItems = [
        { icon: <FaWrench />, label: "Change User Info", path: "/Profile" },
        { icon: <FaBriefcase />, label: "Github", path: "/Github" },
        { icon: <FaFolder/>, label: "My Files", path: "/MyFiles" }
    ];
    const menuItemsNoGithub = [
        { icon: <FaWrench />, label: "Change User Info", path: "/Profile" },
        { icon: <FaFolder/>, label: "My Files", path: "/MyFiles" }
    ]

    return (
        <>
            <Button label={data?.username ?? " "} onClick={() => setVisible()}/>
            <div className="relative">
                {/* Dropdown menu */}
                {isVisible && (
                    <div className="relative">
                        {/* Dropdown menu */}
                        <div className="absolute right-0.5 top-10 mt-2 bg-blue-400 dark:bg-blue-800" style={{perspective: '1500px'}}>
                                <ul className="list-none p-0">
                                    {data?.github_uid ?
                                        menuItems.map((item, index) => (
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
                                        ))
                                        :
                                        menuItemsNoGithub.map((item, index) => (
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
                                        ))
                                    }
                                </ul>
                            </div>
                        )
                    </div>

                )}
            </div>

        </>
    );
};

export default PBar;
