"use client";
import axios from 'axios';
import { useEffect, useRef } from 'react';
import jwtDecode from 'jwt-decode'; // Corrected import
import { useAuth } from "@/Components/Contexts/AuthContext";

const GitHubCallbackPage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const sent = useRef(false);
    const { setData } = useAuth();

    useEffect(() => {
        const sendCodeToBackend = async () => {
            if (sent.current || !code) {
                console.error('Request already sent or code is null.');
                return;
            }
            sent.current = true;

            try {
                const response = await axios.post(`${backendUrl}/auth/github/callback`, { code });
                console.log("Authentication successful", response.data);

                const { token } = response.data;
                localStorage.setItem('token', token);

                // Now make another request to your backend to get the user details
                const userDetailsResponse = await axios.get(`${backendUrl}/userinfo`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Correctly set the Authorization header
                    }
                });

                // Assuming the backend response has the user details in the expected format
                const userDetails = userDetailsResponse.data;
                console.log(userDetails);

                // Now you have your user details, you can set it in your state
                setData({
                    id: userDetails.id,
                    email: userDetails.email,
                    username: userDetails.username,
                    github_uid: userDetails.github_uid,
                    github_nickname: userDetails.github_nickname,
                    github_repos: userDetails.github_repos
                });
                // Redirect user after successful login
                window.location.href = '/success'; // Redirect to a success page
            } catch (err) {
                console.error('Error during GitHub authentication:', err);
                sent.current = false;

                // Redirect with error
                // @ts-ignore
                window.location.href = `/?error=${encodeURIComponent(err.message)}`;
            }
        };

        if (code && !sent.current) {
            sendCodeToBackend().then(r => {});
        }
    }, [code, backendUrl, setData]);

    return <div>Loading...</div>;
};

export default GitHubCallbackPage;
