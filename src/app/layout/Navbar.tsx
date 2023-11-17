import React, {useState} from 'react';
import axios from 'axios';
import { useAuth } from '@/Components/Contexts/AuthContext';
import Button from "@/Components/Common/Button";
import {useModal} from "@/Components/Contexts/ModalContext";
import Login from "@/app/Login/Login";
import Register from "@/app/Register/Register";
import ConfirmModal from "@/Components/Modals/ConfirmModal";
import PBar from "@/app/layout/ProfileBar";
import NavItem from "@/Components/Common/NavItem";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const Navbar = () => {
    const { data, setData } = useAuth();
    const { openModal } = useModal(); // Destructure openModal function
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [, setIsConfirmed] = useState(false);

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
        { href: "/api", Name: "Api"},
        { href: "/CodeEditor", Name:"Code Editor" },
        { href: "/PageCreator", Name: "Page Creator"},
    ];
    return (
        <div className="flex flex-row w-1/3 justify-center">
            {menuItems.map((item, index) => (
                <NavItem href={item.href} Name={item.Name} key={index}/>
            ))}
            {
                data ?
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
                    ) : (
                        <>
                            {/* If not logged in, show login and register buttons */}
                            <Button label="Login" onClick={handleLoginClick} />
                            <Button label="Register" onClick={handleRegisterClick} />
                        </>
                    ) // If user is null, render nothing
            }

        </div>
    );
}

export default Navbar;
