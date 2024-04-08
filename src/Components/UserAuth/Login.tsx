"use client";
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from "@/Components/Contexts/AuthContext";
import Button from "@/Components/Common/Button";
import {useModal} from "@/Components/Contexts/ModalContext";
import PasswordReset from "@/Components/UserAuth/PasswordReset";
import Inputfield from "@/Components/Common/Inputfield";

const Login = () => {
    const [login, setLogin] = useState(''); // This can be email or username.
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const { openModal } = useModal(); // Destructure openModal function
    const { setData } = useAuth();

    const handleGitHubLogin = () => {
        const githubClientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
        const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
        const redirectUri = `${frontendUrl}/auth/github/callback`;
        if (typeof window !== 'undefined')
            window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirectUri}&scope=read:user`;
    };

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        setSuccess('');
        setError('');

        try {
            const response = await axios.post(`${backendUrl}/login`, {
                login: login, // Now 'login' can be an email or username.
                password: password
            });

            console.info(response.data);
            let userdata = response.data;
            console.info(userdata);
            setData({id:userdata["id"], email:userdata["email"],username:userdata["username"],github_uid:userdata["github_uid"],github_nickname:userdata["github_nickname"],github_repos:userdata["github_repos"]});

            localStorage.setItem('token', response.data.token);
            const { token } = response.data;
            localStorage.setItem('token', token);
            // Redirect to home page or dashboard
            setSuccess(`Login successful. Welcome ${response.data.username || response.data.email}!`);
            if (typeof window !== 'undefined')
                window.location.href = '/'; // Update this with your dashboard path
        } catch (err) {
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    const handleRecovery = () => {
        openModal(<PasswordReset/>)
    };
    return (
        <div className="flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <h1 className="mb-6 text-3xl font-bold text-center text-gray-900 dark:text-white">Login</h1>
                {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative dark:bg-green-700 dark:border-green-900 dark:text-green-200" role="alert">{success}</div>}
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative dark:bg-red-700 dark:border-red-900 dark:text-red-200" role="alert">{error}</div>}
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-800">
                    <div className="mb-4">
                        <label htmlFor="login" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Email/Username:</label>
                        <Inputfield
                            type="text"
                            id="login"
                            value={login}
                            onChange={setLogin}
                            placeholder="Email or Username"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Password:</label>
                        <Inputfield
                            type="password"
                            id="password"
                            value={password}
                            onChange={setPassword}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded focus:outline-none m-3 focus:shadow-outline dark:bg-blue-600 dark:hover:bg-blue-800">
                            Login
                        </button>
                        <Button label="Recover password" onClick={handleRecovery}/>
                        <button
                            onClick={handleGitHubLogin} // Add this line to call the GitHub login function
                            type="button" // This should be 'button' not 'submit' to prevent form submission
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:hover:bg-gray-800"
                        >
                            Login via GitHub
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );



};

export default Login;
