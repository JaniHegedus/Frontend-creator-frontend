"use client"
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useAuth } from '@/Components/Contexts/AuthContext';

const GitHubConnectCallbackPage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const sent = useRef(false);
    const {data, setData } = useAuth();

    useEffect(() => {
        const connectGitHubAccount = async () => {
            if (sent.current || !code) {
                console.error('Request already sent or code is null.');
                return;
            }
            sent.current = true;

            try {
                const authToken = localStorage.getItem('token');
                if (!authToken) {
                    throw new Error('Authentication token is not available.');
                }
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/github`,
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
                    console.log(response)
                    // Redirect user after successful GitHub account connection
                    window.location.href = '/Profile'; // Redirect to a profile page or other appropriate page
                }
            } catch (error) {
                console.error('Failed to connect GitHub account:', error);
                // @ts-ignore
                if (error.response && error.response.status === 422)
                {
                    window.location.href = `/?error=${encodeURIComponent('Account is already Linked')}`;
                }
                else{
                    window.location.href = `/?error=${encodeURIComponent('Failed to connect GitHub account')}`;
                }
                // Redirect with error
                sent.current = false;
            }
        };

        if (code && !sent.current) {
            connectGitHubAccount().then(r => {});
        }
    }, [code, setData]);

    return (
        <div className="container">
            <div className="sun">
                <div className="orbit earth">
                    <div className="globe earth">
                        <div className="orbit moon">
                            <div className="globe moon"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GitHubConnectCallbackPage;
