"use client";
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from "@/Components/AuthContext";

const Login = () => {
    const [login, setLogin] = useState(''); // This can be email or username.
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const { setUser } = useAuth();

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        setSuccess(''); // Clear any previous success message
        setError('');   // Clear any previous error message

        try {
            // Send email and password directly without nesting under 'session'
            const response = await axios.post(`${backendUrl}/login`, {
                email: login, // Here we are assuming the 'login' state holds the email.
                password: password
            });
            setSuccess(`Login successful. Welcome ${response.data.username || response.data.email}!`);
            setUser({ email: response.data.email, username: response.data.username });
            // TODO: Redirect to home page or dashboard
        } catch (err) {
            // Handle error here, depending on the format sent by your backend you might want to adjust.
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {success && <div>{success}</div>}
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="login">Email/Username:</label>
                <input
                    type="text"
                    id="login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder="Email or Username"
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
