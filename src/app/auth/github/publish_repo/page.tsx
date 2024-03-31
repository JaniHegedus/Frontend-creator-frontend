"use client"
import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import { useAuth } from '@/Components/Contexts/AuthContext';
import Loading from "@/Components/Common/Loading";
import ConfirmModal from "@/Components/Modals/ConfirmModal";

const PublishRepo = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const sent = useRef(false);
    const { data,  } = useAuth();
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [modalmessage, setModalmessage] = useState("");
    const [onAcceptRedirect, setOnAcceptRedirect] = useState(0);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    // Attempt to publish project to GitHub
    const publishProject = async () => {
        if (sent.current) {
            return;
        }
        sent.current = true;

        const projectName = sessionStorage.getItem("projectName");

        if (!projectName) {
            console.error('Repository name not found in sessionStorage, redirecting...');
            window.location.href = '/Creator'; // Adjust the redirection URL as necessary
            return;
        }

        try {

            const authToken = localStorage.getItem('token');
            if (!authToken) {
                throw new Error('Authentication token is not available.');
            }
            const response = await axios.post(
                `${backendUrl}/github/publish_repo`,
                { code, email: data?.email, name:projectName },
                {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                    },
                }
            );

            if (response.data) {
                console.log('Repository created successfully:', response.data);
                window.location.href = '/Github';
            }
        } catch (error) {
            console.error('Failed to create repository:', error);
            // @ts-ignore
            if(error.response && error.response.status === 422) {
                setModalmessage("Repository already exists");
                setOnAcceptRedirect(1);
            }
            // @ts-ignore
            if(error.response && error.response.status === 403) {
                setModalmessage("Please install the GitHub app to continue");
                setOnAcceptRedirect(2)
            }
            setIsConfirmModalOpen(true);


            sent.current = false;
        } finally {
            sessionStorage.removeItem('repoName');
        }
    };

    useEffect(() => {
        publishProject();
    }, [code]);

    return (
        <>
            <Loading />
            <ConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={() => {
                    setIsConfirmModalOpen(false); // Close the modal first
                    // Delay the redirection a bit to ensure the state update has been processed
                }}
                onConfirm={() => {
                    // For external links, especially ones that lead to installation flows,
                    // it's usually better to open in a new tab to prevent disrupting the current app state
                    if (onAcceptRedirect===1) {
                        window.location.href = '/Creator'
                    }
                    else if (onAcceptRedirect===2) {
                        window.open('https://github.com/apps/frontend-creator-backend/installations/new', '_blank')
                    }
                    else {
                        window.location.href = `/?err=${onAcceptRedirect}`; // Redirect to a profile page or other appropriate page
                    }
                }}
                message={modalmessage}
            />
        </>
    );
};

export default PublishRepo;
