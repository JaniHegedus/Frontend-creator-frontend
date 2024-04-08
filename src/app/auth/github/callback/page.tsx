"use client";
import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useAuth } from "@/Components/Contexts/AuthContext";
import Loading from "@/Components/Common/Loading";

const GitHubCallbackPage = () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const sent = useRef(false);
    const { setData } = useAuth();

    let urlParams;
    if (typeof window !== 'undefined')
        urlParams = new URLSearchParams(window.location.search);

    let code: string|null;
    if(urlParams)
        code = urlParams.get('code');

    useEffect(() => {
        const sendCodeToBackend = async () => {
            if (sent.current || !code) {
                console.info('Request already sent or code is null.');
                return;
            }
            sent.current = true;

            try {
                const response = await axios.post(`${backendUrl}/auth/github/callback`, { code });
                console.info("Authentication successful", response.data);

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
                console.info(userDetails);

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
                if (typeof window !== 'undefined')
                    window.location.href = '/success'; // Redirect to a success page
            } catch (err) {
                console.info('Error during GitHub authentication:', err);
                sent.current = false;

                // Redirect with error
                if (typeof window !== 'undefined')
                    // @ts-ignore
                    window.location.href = `/?error=${encodeURIComponent(err.message)}`;
            }
        };

        if (code && !sent.current) {
            sendCodeToBackend().then(() => {});
        }
    }, [backendUrl, setData]);

    return (
        <Loading/>
    );
};

export default GitHubCallbackPage;
