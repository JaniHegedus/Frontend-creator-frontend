import React, {useState} from 'react';
import axios from 'axios';
import { useAuth } from '@/Components/Contexts/AuthContext';
import Link from "next/link";
import Button from "@/Components/Common/Button";
import {useModal} from "@/Components/Contexts/ModalContext";
import Login from "@/app/Login/Login";
import Register from "@/app/Register/Register";
import ConfirmModal from "@/Components/Modals/ConfirmModal";
import UserProfile from "@/app/Profile/UserProfile";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const Navbar = () => {
    const { user, setUser, userEmail, setUserEmail } = useAuth();
    const { openModal } = useModal(); // Destructure openModal function
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const openConfirmModal = () => setIsConfirmModalOpen(true);
    const closeConfirmModal = () => setIsConfirmModalOpen(false);
    const handleLoginClick = () => {
        openModal(<Login/>); // Replace with actual login form component
    };
    const handleProfileClick = ()=> {
            openModal(<UserProfile/>)
    }
    const handleConfirm = async () => {
        // Logic to execute when confirmed
        setUser(null)
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
    return (
        <div className="flex flex-row w-1/3 justify-center">
            <div className="flex justify-between items-center py-1 px-2 bg-gray-500 dark:bg-gray-700 sticky top-0 border-2 border-blue-500 dark:border-blue-800 rounded-md mr-3 dark:text-gray-300">
                <Link href="/"> Home </Link>
            </div>
            <div className="flex justify-between items-center py-1 px-2 bg-gray-500 dark:bg-gray-700 sticky top-0 border-2 border-blue-500 dark:border-blue-800 rounded-md mr-3 dark:text-gray-300">
                <Link href="/api"> Api </Link>
            </div>
            <div className="flex justify-between items-center py-1 px-2 bg-gray-500 dark:bg-gray-700 sticky top-0 border-2 border-blue-500 dark:border-blue-800 rounded-md mr-3 dark:text-gray-300">
                <Link href="/CodeEditor"> Code Editor </Link>
            </div>
            <div className="flex justify-between items-center py-1 px-2 bg-gray-500 dark:bg-gray-700 sticky top-0 border-2 border-blue-500 dark:border-blue-800 rounded-md mr-3 dark:text-gray-300">
                <Link href="/PageCreator"> Page Creator </Link>
            </div>
            {
                user ?
                    ( // If there is a user object, render the span with the username
                        <>
                            <Button label={user.username} onClick={handleProfileClick}/>
                            <Button label="Logout" onClick={openConfirmModal}/>
                            <ConfirmModal
                                isOpen={isConfirmModalOpen}
                                onClose={closeConfirmModal}
                                onConfirm={handleConfirm}
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
