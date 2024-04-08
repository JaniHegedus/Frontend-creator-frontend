"use client"
import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useAuth } from '@/Components/Contexts/AuthContext';
import Loading from "@/Components/Common/Loading";
import logger from "@/Components/Logger";

const GitHubConnectCallbackPage = () => {
    let urlParams;
    if (typeof window !== 'undefined') {
        urlParams = new URLSearchParams(window.location.search);
    }
    // @ts-ignore
    const code = urlParams.get('code');
    const sent = useRef(false);
    const {data, setData } = useAuth();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        const connectGitHubAccount = async () => {
            if (sent.current || !code) {
                logger.info('Request already sent or code is null.');
                return;
            }
            sent.current = true;

            try {
                const authToken = localStorage.getItem('token');
                if (!authToken) {
                    new Error('Authentication token is not available.');
                }
                const response = await axios.post(
                    `${backendUrl}/auth/github`,
                    // @ts-ignore
                    { code:code, email:data["email"]},
                    {
                        headers: {
                            'Authorization': `Bearer ${authToken}`,
                        },
                    }
                );

                // Assuming the backend returns the updated user information:
                if (response.data) {
                    logger.info(response.data)
                    // Redirect user after successful GitHub account connection
                    if (typeof window !== 'undefined')
                        window.location.href = '/Profile'; // Redirect to a profile page or other appropriate page
                }
            } catch (error) {
                logger.info('Failed to connect GitHub account:', error);
                // @ts-ignore
                if (error.response && error.response.status === 422)
                {
                    if (typeof window !== 'undefined')
                        window.location.href = `/?error=${encodeURIComponent('Account is already Linked')}`;
                }
                else{
                    if (typeof window !== 'undefined')
                        window.location.href = `/?error=${encodeURIComponent('Failed to connect GitHub account')}`;
                }
                // Redirect with error
                sent.current = false;
            }
        };

        if (code && !sent.current) {
            connectGitHubAccount().then(() => {});
        }
    }, [code, data, setData]);

    return (
        <Loading/>
    );
};

export default GitHubConnectCallbackPage;
