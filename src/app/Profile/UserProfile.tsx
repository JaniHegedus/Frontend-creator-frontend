"use client"
// pages/UserProfile.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "@/Components/Contexts/AuthContext";
import Button from "@/Components/Common/Button";
import Link from "next/link";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    // Add state for form inputs
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserData = async () => {
            // Make sure we have a token available
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found. User is not logged in.');
                setLoading(false);
                return;
            }

            try {
                // You should replace '/userinfo' with the actual endpoint for your user data
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/userinfo`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                // Set the user data on successful fetch
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch user data.');
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleUpdateProfile = async (field:any, value:any) => {
        if (!token) {
            setError('You must be logged in to update your profile.');
            return;
        }
        const payload = {
            user: {
                [field]: value,
            }
        };
        // @ts-ignore
        try {
            // @ts-ignore
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user["id"]}/userinfo`, payload, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            // Update your local user state or do whatever is needed post update
            // @ts-ignore
            setUser(prevState => ({ ...prevState, [field]: value }));
            alert(field.toUpperCase()+" set successfully")
        } catch (error) {
            // @ts-ignore
            setError(error.response?.data?.error || 'An error occurred while updating the profile.');
        }
    };
    // Frontend code
    const handleGitHubLogin = () => {
        const githubClientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
        const redirectUri = `http://localhost:3000/auth/github`;

        window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirectUri}&scope=read:user`;
    };

    if (loading) {
        return <div>Loading user profile...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const removeGithub = async () =>{
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/github/remove`,
            // @ts-ignore
            {email:user["email"]},
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    }

    return (
        <div className="flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <h1 className="mb-6 text-3xl font-bold text-center text-gray-900 dark:text-white">User Profile</h1>

                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative dark:bg-red-700 dark:border-red-900 dark:text-red-200" role="alert">{error}</div>}

                {user && (
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-800">
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Username: {user["username"]}</label>
                            <input
                                type="text"
                                id="username"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                placeholder="New username"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            />
                            <button
                                onClick={() => handleUpdateProfile('username', newUsername)}
                                type="button"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-blue-600 dark:hover:bg-blue-800 mt-3"
                            >
                                Change Username
                            </button>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Email: {user["email"]}</label>
                            <input
                                type="email"
                                id="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                placeholder="New email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            />
                            <button
                                onClick={() => handleUpdateProfile('email', newEmail)}
                                type="button"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-blue-600 dark:hover:bg-blue-800 mt-3"
                            >
                                Change Email
                            </button>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Password: *****</label>
                            <input
                                type="password"
                                id="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            />
                            <label htmlFor="passwordConfirmation" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Confirm Password:</label>
                            <input
                                type="password"
                                id="passwordConfirmation"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm New password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                required
                            />
                            <button
                                onClick={() => {
                                    if(newPassword==confirmPassword)
                                    {
                                        handleUpdateProfile("password",newPassword)
                                    }
                                    else{
                                        setError('Passwords do not match');
                                    }
                                }
                            }
                                type="button"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-blue-600 dark:hover:bg-blue-800 mt-3"
                            >
                                Change Password
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            {user["github_uid"] ? (
                                <>
                                    <p className="text-gray-700 dark:text-white"><Link href={`https://github.com/${user["github_nickname"]}`}>GitHub</Link> Connected</p>
                                    <Button label={"Remove"} onClick={removeGithub}/>
                                </>
                            ) : (
                                <button
                                    onClick={handleGitHubLogin}
                                    type="button"
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:hover:bg-gray-800"
                                >
                                    Connect to GitHub
                                </button>
                            )}
                        </div>
                    </form>
                )}
            </div>
        </div>
    );

};

export default UserProfile;
