"use client"
import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import { useAuth } from '@/Components/Contexts/AuthContext';
import Loading from "@/Components/Common/Loading";
import ConfirmModal from "@/Components/Modals/ConfirmModal";
import logger from "@/Components/Logger";

const CreateRepo = () => {
    let urlParams;
    if (typeof window !== 'undefined') {
        urlParams = new URLSearchParams(window.location.search);
    }
    // @ts-ignore
    const code = urlParams.get('code');
    const sent = useRef(false);
    const { data, setData } = useAuth();
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [modalmessage, setModalmessage] = useState("");
    const [onAcceptRedirect, setOnAcceptRedirect] = useState(0);

    const createrepo = async () => {
        if (sent.current) {
            return;
        }
        sent.current = true;

        const repoName = sessionStorage.getItem('repoName');

        if (!repoName) {
            logger.info('Repository name not found in sessionStorage, redirecting...');
            if (typeof window !== 'undefined')
                window.location.href = '/Github'; // Adjust the redirection URL as necessary
            return;
        }

        try {

            const authToken = localStorage.getItem('token');
            if (!authToken) {
                throw new Error('Authentication token is not available.');
            }

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/github/create_repo`,
                { code, email: data?.email, name:repoName },
                {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                    },
                }
            );

            if (response.data) {
                logger.info('Repository created successfully:', response.data);
                setData({ ...data, ...response.data });
                if (typeof window !== 'undefined')
                    window.location.href = '/';
            }
        } catch (error) {
            logger.info('Failed to create repository:', error);
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
        // Redirect user immediately if certain conditions are not met
        // This example assumes you have some conditions to check before proceeding
        if (!code) {
            logger.info('Code is null, redirecting...');
            if (typeof window !== 'undefined')
                window.location.href = '/'; // Adjust the redirection URL as necessary
            return;
        }


        createrepo();
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
                        if (typeof window !== 'undefined')
                            window.location.href = '/Github'
                    }
                    else if (onAcceptRedirect===2) {
                        if (typeof window !== 'undefined')
                            window.open('https://github.com/apps/frontend-creator-backend/installations/new', '_blank')
                    }
                    else {
                        if (typeof window !== 'undefined')
                            window.location.href = `/?err=${onAcceptRedirect}`; // Redirect to a profile page or other appropriate page
                    }
                }}
                message={modalmessage}
            />
        </>
    );

};

export default CreateRepo;
