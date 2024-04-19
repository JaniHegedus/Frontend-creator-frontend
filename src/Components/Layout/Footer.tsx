import Button from "@/Components/Common/Button";
import React from "react";
import {FooterProps} from "@/InterFaces/Layout/FooterProps";


const Footer = ({darkMode, toggleDarkMode}:FooterProps) =>{
    return (
        <div
            className="max-w-md mx-auto bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg border-2 border-amber-100 dark:border-gray-600 m-2">
            <span>Hegedüs János 2024 © All rights reserved.</span>
            <div className="theme-toggle cursor-pointer">
                <div className="theme-toggle cursor-pointer justify-end">
                    <Button
                        label={darkMode ? "Light mode" : "Dark mode"}
                        onClick={toggleDarkMode}
                    />
                </div>
            </div>
        </div>
    );
}
export default Footer;