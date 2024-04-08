import Button from "@/Components/Common/Button";
import React from "react";
import {FooterProps} from "@/InterFaces/Layout/FooterProps";


const Footer = ({darkMode, toggleDarkMode}:FooterProps) =>{
    return (
        <div
            className="footer flex justify-between items-center p-4 bg-gray-400 dark:bg-gray-800 fixed bottom-0 w-full dark:text-gray-300">
            <span>Hegedüs János 2024 © All rights reserved.</span>
            <div className="theme-toggle cursor-pointer">
                <div className="theme-toggle cursor-pointer">
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