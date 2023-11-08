"use client"
import { useState } from 'react';
import axios from 'axios';
import { NextPage } from 'next';

const PasswordReset: NextPage = () => {
    const [login, setLogin] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setSuccess('');

        try {
            const response = await axios.post(`${backendUrl}/reset-password`, { login });
            setMessage(response.data.message);
            setSuccess(response.data.message);
        } catch (err: any) {
            setError(err.response?.data?.error || 'An unexpected error occurred');
        }
    };

    return (
        <div>
            <h1 className="mb-6 text-3xl font-bold text-center text-gray-900 dark:text-white">Login</h1>
            {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative dark:bg-green-700 dark:border-green-900 dark:text-green-200" role="alert">{success}</div>}
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative dark:bg-red-700 dark:border-red-900 dark:text-red-200" role="alert">{error}</div>}
            <form onSubmit={handlePasswordReset}>
                <label htmlFor="login" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Email/Username:</label>
                <input
                    type="text"
                    placeholder="Enter your username or email"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    required
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded focus:outline-none m-3 focus:shadow-outline dark:bg-blue-600 dark:hover:bg-blue-800">
                    Send
                </button>
            </form>
        </div>
    );
};

export default PasswordReset;
