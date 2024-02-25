"use client"
import { useState } from 'react';
import axios from 'axios';
import Inputfield from "@/Components/Common/Inputfield";

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const [sent, setSent] = useState(false)
    const handleGitHubLogin = () => {
        const githubClientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
        const redirectUri = `http://localhost:3000/auth/github/callback`;

        window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirectUri}&scope=read:user`;
    };
    const handleSubmit = async (event:any) => {
        event.preventDefault();
        setSuccess('');
        setError('');
        if (password !== passwordConfirmation) {
            setError('Passwords do not match');
            return;
        }
        if(!sent){
            try {
                const response = await axios.post(`${backendUrl}/register`, {
                    user: {
                        email,
                        username,
                        password,
                        password_confirmation: passwordConfirmation
                    }
                });
                setEmail('');
                setUsername('');
                setPassword('');
                setPasswordConfirmation('');
                setSuccess('Registration successful. You can now log in.');
            } catch (error) {
                // @ts-ignore
                if (error.response && error.response.data) {
                    // Assuming your backend sends back an error message in the response body
                    // @ts-ignore
                    setError(error.response.data.message || 'Registration failed. Please try again.');
                } else {
                    setError('There was an error processing your request.');
                }
            }
        }
    };

    return (
        <div className="flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <h1 className="mb-6 text-3xl font-bold text-center text-gray-900 dark:text-white">Register</h1>
                {success && <div className="p-4 mb-4 text-sm text-green-800 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">{success}</div>}
                {error && <div className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{error}</div>}
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-800">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Email:</label>
                        <Inputfield
                            type="email"
                            id="email"
                            value={email}
                            onChange={setEmail}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Username:</label>
                        <Inputfield
                            type="text"
                            id="username"
                            value={username}
                            onChange={setUsername}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Password:</label>
                        <Inputfield
                            type="password"
                            id="password"
                            value={password}
                            onChange={setPassword}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="passwordConfirmation" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Confirm Password:</label>
                        <Inputfield
                            type="password"
                            id="passwordConfirmation"
                            value={passwordConfirmation}
                            onChange={setPasswordConfirmation}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Register
                        </button>
                        <button
                            onClick={handleGitHubLogin} // Add this line to call the GitHub login function
                            type="button" // This should be 'button' not 'submit' to prevent form submission
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:hover:bg-gray-800"
                        >Register via Github
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );


};

export default Register;
