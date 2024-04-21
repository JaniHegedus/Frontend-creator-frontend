"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "@/Components/Contexts/AuthContext";
import Button from "@/Components/Common/Button";
import Link from "next/link";
import ConfirmModal from "@/Components/Modals/ConfirmModal";
import Loading from "@/Components/Common/Loading";
import Inputfield from "@/Components/Common/Inputfield";

const UserProfile = () => {
    const user = useAuth();
    const { setData } = useAuth();
    let token: string| null;
    if(typeof localStorage != undefined)
        token = localStorage.getItem('token');
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
    const [isRemoveConfirmModalOpen, setIsRemoveConfirmModalOpen] = useState(false);
    const [,setIsDeleteConfirmed] = useState(false);
    const [,setIsRemoveConfirmed] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const openDeleteConfirmModal = () => setIsDeleteConfirmModalOpen(true);
    const openRemoveConfirmModal = () => setIsRemoveConfirmModalOpen(true);
    const closeDeleteConfirmModal = () => setIsDeleteConfirmModalOpen(false);
    const closeRemoveConfirmModal = () => setIsRemoveConfirmModalOpen(false);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const githubClientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;

    useEffect(() => {

        const fetchUserData = async () => {
            if (!token) {
                setError('No token found. User is not logged in.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${backendUrl}/userinfo`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.info(response.data);
                const userdata = response.data;
                setData({
                    id: userdata.id,
                    email: userdata.email,
                    username: userdata.username,
                    github_uid: userdata.github_uid,
                    github_nickname: userdata.github_nickname,
                    github_repos: userdata.github_repos,
                });
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    setError('Session Expired. You have to log in again.');
                    localStorage.removeItem('token')
                    setData(null);
                } else {
                    setError('Failed to fetch user data.');
                    setData(null);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [error]); // Only re-run the effect if 'token' changes

    const handleConfirmAccountDelete = async () => {
        // Logic to execute when confirmed
        if (!token) {
            setError('No token found. User is not logged in.');
            setLoading(false);
            return;
        }
        try {
            // You should replace '/userinfo' with the actual endpoint for your user data
            await axios.delete(`${backendUrl}/user/delete`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setIsDeleteConfirmed(true);
            if (localStorage){
                localStorage.removeItem('user');     // Remove the user from local storage
                localStorage.removeItem('userEmail'); // Remove the userEmail from local storage
                localStorage.removeItem('token'); // Remove the token from local storage

            }
            // After logging out, redirect to the home page or login page
            if (typeof window !== 'undefined')
                window.location.href = '/';
        } catch (error) {
            setError('Failed to delete user.');
            setLoading(false);
        }
        closeDeleteConfirmModal();
    };
    const handleUpdateProfile = async (field:any, value:any) => {
        if (field === "username") {
            if (!user.loading) {
                try {
                    const formData = new FormData();
                    formData.append("username", user.data?.username || value);
                    formData.append("new_directory", value);

                    // Attempt to modify the directory first
                    await axios.post(`${backendUrl}/user_file/modify_storage`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    // If directory modification is successful, proceed to update the username
                    const payload = {
                        user: {
                            [field]: value,
                        }
                    };

                    await axios.patch(`${backendUrl}/user/modify`, payload, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    // Assuming setData updates the state related to user info
                    // @ts-ignore
                    setData(prevState => ({ ...prevState, [field]: value }));
                    if (localStorage)
                        localStorage.setItem('user', JSON.stringify({ ...user, [field]: value })); // Ensure the local storage is updated correctly

                    let fieldname = field.charAt(0).toUpperCase() + field.slice(1);
                    setSuccess(`${fieldname} set successfully`);
                } catch (error) {
                    console.error(error);
                    // @ts-ignore
                    setError(error.response?.data?.error || 'An error occurred while updating the profile.');
                    setLoading(false);
                }
            }
        } else {
            // Handle other fields if needed
            try {
                const payload = {
                    user: {
                        [field]: value,
                    }
                };

                await axios.patch(`${backendUrl}/user/modify`, payload, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                // @ts-ignore
                setData(prevState => ({ ...prevState, [field]: value }));
                if (localStorage)
                    localStorage.setItem('user', JSON.stringify({ ...user, [field]: value }));

                let fieldname = field.charAt(0).toUpperCase() + field.slice(1);
                setSuccess(`${fieldname} set successfully`);
            } catch (error) {
                console.error(error);
                // @ts-ignore
                setError(error.response?.data?.error || 'An error occurred while updating the profile.');
                setLoading(false);
            }
        }

    };
    const handleGitHubLogin = () => {
        const redirectUri = `${backendUrl}:3000/auth/github`;
        if (typeof window !== 'undefined')
            window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirectUri}&scope=read:user`;
    };

    if (loading) {
        return (
            <Loading/>
        );
    }



    const handleConfirmRemoveGithub = async () => {
        if (!token) {
            setError('No token found. User is not logged in.');
            setLoading(false);
            return;
        }
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/github/remove`,
            // @ts-ignore
            {email: user.data?.email},
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
        setData({id:user.data?.id,email:user.data?.email,username:user.data?.username,github_uid:null,github_nickname:null,github_repos:null})
        if (localStorage)
            localStorage.setItem('user', JSON.stringify(user));
        setIsRemoveConfirmed(true);
        closeRemoveConfirmModal();
    }
    return (
        <div className="flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <h1 className="mb-6 text-3xl font-bold text-center text-gray-900 dark:text-white">
                    User Profile
                </h1>

                {error && <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative dark:bg-red-700 dark:border-red-900 dark:text-red-200"
                    role="alert">{error}</div>}
                {success && <div
                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative dark:bg-green-700 dark:border-green-900 dark:text-red-200"
                    role="alert">{success}</div>}

                {user && (
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-800">
                        <div className="mb-4">
                            <label htmlFor="username"
                                   className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Username: {user.data?.username}</label>
                            <Inputfield
                                type="username"
                                id="username"
                                value={newUsername}
                                onChange={setNewUsername}
                                placeholder="New username"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            />
                            <Button
                                onClick={() => handleUpdateProfile('username', newUsername)}
                                label="Change Username"
                                color={"secondary"}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email"
                                   className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Email: {user.data?.email}</label>
                            <Inputfield
                                type="email"
                                id="email"
                                value={newEmail}
                                onChange ={setNewEmail}
                                placeholder="New email"
                                />
                            <Button
                                onClick={() => handleUpdateProfile('email', newEmail)}
                                label="Change Email Address"
                                color={"secondary"}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password"
                                   className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Password:
                                *****</label>
                            <Inputfield
                                type="password"
                                id="password"
                                value={newPassword}
                                onChange={setNewPassword}
                                placeholder="New password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            />
                            <label htmlFor="passwordConfirmation"
                                   className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Confirm
                                Password:</label>
                            <Inputfield
                                type="password"
                                id="passwordConfirmation"
                                value={confirmPassword}
                                onChange={setConfirmPassword}
                                placeholder="Confirm New password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                required
                            />
                            <Button
                                onClick={() => {
                                    if (newPassword == confirmPassword) {
                                        handleUpdateProfile("password", newPassword)
                                    } else {
                                        setError('Passwords do not match');
                                    }
                                }
                                }
                                label="Change Password"
                                color={"secondary"}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            {user.data?.github_uid ? (
                                <>
                                    <p className="text-gray-700 dark:text-white"><Link
                                        href={`https://github.com/${user.data?.github_nickname}`}>GitHub</Link> Connected
                                    </p>
                                    <Button label={"Remove"} onClick={openRemoveConfirmModal} color={"secondary"}/>
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
                        <Button label="Delete Account" onClick={openDeleteConfirmModal} color={"secondary"}/>
                    </form>
                )}
                <ConfirmModal
                    isOpen={isDeleteConfirmModalOpen}
                    onClose={closeDeleteConfirmModal}
                    onConfirm={handleConfirmAccountDelete}
                    message="Do you really want to perform this action? You will need to create a profile again."
                />
                <ConfirmModal
                    isOpen={isRemoveConfirmModalOpen}
                    onClose={closeRemoveConfirmModal}
                    onConfirm={handleConfirmRemoveGithub}
                    message="Do you really want to perform this action? You will need to reconnect Github."
                />
            </div>
        </div>
    );

};

export default UserProfile;
