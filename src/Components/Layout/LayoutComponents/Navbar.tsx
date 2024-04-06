import React, {useState} from 'react';
import axios from 'axios';
import { useAuth } from '@/Components/Contexts/AuthContext';
import Button from "@/Components/Common/Button";
import {useModal} from "@/Components/Contexts/ModalContext";
import Login from "@/Components/UserAuth/Login";
import Register from "@/Components/UserAuth/Register";
import ConfirmModal from "@/Components/Modals/ConfirmModal";
import PBar from "@/Components/Layout/LayoutComponents/ProfileBar";
import NavItem from "@/Components/Layout/LayoutComponents/NavItem";
import {FiMenu} from "react-icons/fi";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const Navbar = () => {
    const { data, setData } = useAuth();
    const { openModal } = useModal(); // Destructure openModal function
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [, setIsConfirmed] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    const openConfirmModal = () => setIsConfirmModalOpen(true);
    const closeConfirmModal = () => setIsConfirmModalOpen(false);
    const handleLoginClick = () => {
        openModal(<Login/>); // Replace with actual login form component
    };
    const handleConfirm = async () => {
        // Logic to execute when confirmed
        setData(null)
        try {
            // Call your API endpoint to destroy the session
            await axios.delete(`${backendUrl}/logout`);

            // Clear user information from context and local storage
            setIsConfirmed(true);
            localStorage.removeItem('user');     // Remove the user from local storage
            localStorage.removeItem('userEmail'); // Remove the userEmail from local storage
            localStorage.removeItem('token'); // Remove the token from local storage
            setData(null); // Remove the user from context
            // After logging out, redirect to the home page or login page
            window.location.href = '/';
        } catch (error) {
            console.error('Logout failed', error);
            // Optionally, handle errors here (e.g., display an error message)
        }
        closeConfirmModal();
    };
    const handleRegisterClick = () => {
        openModal(<Register/>); // Replace with actual register form component
    };
    const menuItems = [
        { href: "/", Name: "Home"},
        { href: "/Tutorial", Name: "Tutorial"},
        { href: "/Creator", Name:"Get Started" }
    ];
    const setVisibility = () => {
        if (menuVisible) {
            setMenuVisible(false);
        }else {
            setMenuVisible(true);
        }
    };
    return (
        <div className="flex items-center justify-end w-full">
            <div
                className={`flex flex-col w-auto ${menuVisible ? "block" : "hidden"} md:flex md:flex-row md:items-center md:w-auto`}>
                {menuVisible && menuItems.map((item, index) => (
                    <NavItem href={item.href} Name={item.Name} key={index}/>
                ))}
                {menuVisible && data ?
                    ( // If there is a user object, render the span with the username
                        <>
                            <PBar/>
                            <Button label="Logout" onClick={openConfirmModal}/>
                            <ConfirmModal
                                isOpen={isConfirmModalOpen}
                                onClose={closeConfirmModal}
                                onConfirm={handleConfirm}
                                message="Do you really want to perform this action? You will need to log in again."
                            />
                        </>
                    ) : menuVisible ? (
                            <>
                                {/* If not logged in, show login and register buttons */}
                                <Button label="Login" onClick={handleLoginClick}/>
                                <Button label="Register" onClick={handleRegisterClick}/>
                            </>
                        ) // If user is null, render nothing
                        : (<> </>)
                }
            </div>
            <Button content={<FiMenu size={24}/>} onClick={() => {
                setVisibility()
            }}/>
        </div>
    );
}
export default Navbar;
