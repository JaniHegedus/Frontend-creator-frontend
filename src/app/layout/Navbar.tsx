import React from 'react';
import axios from 'axios';
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
import { useAuth } from '@/Components/AuthContext';
import Link from "next/link";
import Button from "@/Components/Button";
const Navbar = () => {
    const { user, setUser, userEmail, setUserEmail } = useAuth();
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
                            <span className="flex justify-between items-center py-1 px-2 bg-gray-500 dark:bg-gray-700 sticky top-0 border-2 border-blue-500 dark:border-blue-800 rounded-md mr-3 dark:text-gray-300">
                                {user.username} {/* Display the username */}
                            </span>
                            <Button className="flex justify-between items-center py-1 px-2 bg-gray-500 dark:bg-gray-700 sticky top-0 border-2 border-blue-500 dark:border-blue-800 rounded-md mr-3 dark:text-gray-300" label="Logout" onClick={async () => {
                                try {
                                    // Call your API endpoint to destroy the session
                                    await axios.delete(`${backendUrl}/logout`);

                                    // Clear user information from context and local storage
                                    setUser(null);         // Clear the user from context
                                    setUserEmail(null);    // Clear the userEmail from context
                                    localStorage.removeItem('user');     // Remove the user from local storage
                                    localStorage.removeItem('userEmail'); // Remove the userEmail from local storage

                                    // After logging out, redirect to the home page or login page
                                    window.location.href = '/Login';
                                } catch (error) {
                                    console.error('Logout failed', error);
                                    // Optionally, handle errors here (e.g., display an error message)
                                }
                            }}/>
                        </>
                    ) : (
                        <>
                            <Link className="flex justify-between items-center py-1 px-2 bg-gray-500 dark:bg-gray-700 sticky top-0 border-2 border-blue-500 dark:border-blue-800 rounded-md mr-3 dark:text-gray-300" href={"/Login"}>Login</Link>
                            <Link className="flex justify-between items-center py-1 px-2 bg-gray-500 dark:bg-gray-700 sticky top-0 border-2 border-blue-500 dark:border-blue-800 rounded-md mr-3 dark:text-gray-300" href={"/Register"}>Register</Link>
                        </>
                    ) // If user is null, render nothing
            }

        </div>
    );
}

export default Navbar;
