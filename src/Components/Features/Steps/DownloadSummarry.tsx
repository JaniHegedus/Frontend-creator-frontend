import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useAuth} from "@/Components/Contexts/AuthContext";
import {DownloadSummaryProps} from "@/InterFaces/Steps/DownloadSummaryProps";
import Tooltip from "@/Components/Features/ToolTip";
import logger from "@/Components/Logger";

const DownloadSummary: React.FC<DownloadSummaryProps> = ({ stepData }) => {
    const [success, ] = useState("")
    const [error, ] = useState("")
    // Helper function to initiate the download process
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const user = useAuth();
    const [statusMessage, setStatusMessage] = useState("");
    const hasInitiatedExportRef = useRef(false);
    // Helper function to initiate the download process

    const downloadProjectFiles = async (username: string, projectName: string) => {
        try {
            const response = await axios.get(`${backendUrl}/download_project`, {
                params: { username, projectName },
                responseType: "blob",
            });
            logger.info(response.data);

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${projectName}.zip`);
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url); // Clean up and revoke the object URL
            link.remove();
            setStatusMessage("Files downloaded successfully!");
        } catch (error) {
            // @ts-ignore
            setStatusMessage(`Error downloading files: ${error.message}`);
        }
    };

    // Helper function to push the project to GitHub
    const pushToGitHub = async ( projectName: string) => {
        const githubClientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
        const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
        const redirectUri = `${frontendUrl}/auth/github/publish_repo`;

        // Including `repo` scope to allow for repository creation, modification, and more.
        // Add other scopes as needed, separated by spaces.
        const scope = "repo";
        sessionStorage.setItem('projectName', projectName);
        if (typeof window !== 'undefined')
            window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
    };
    const initiateExport = async () => {
        if (stepData.exportOptions === "download") {
            await downloadProjectFiles(user.data?.username || "", stepData.project.projectName || "");
        } else if ( stepData.exportOptions === "github") {
            await pushToGitHub(stepData.project.projectName || "");
        }
        else {
            if (typeof window !== 'undefined')
                window.location.href= "/MyFiles"
        }
    };
    useEffect(() => {
        if (!hasInitiatedExportRef.current) {
            initiateExport();
            hasInitiatedExportRef.current = true; // Set the ref to true after initiating the export
            logger.info("Initiated export once");
        }
    }, []);

    return (
        <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto my-8">
            <h1 className="text-2xl font-bold mb-4">Project Summary:</h1>
            <Tooltip message={"This will be the Directory Name"}><p className="mb-2"><span className="font-semibold">Project Name:</span> {stepData.project.projectName}</p></Tooltip>
            <p className="mb-2"><span className="font-semibold">Project Description:</span> {stepData.project.projectDescription}</p>
            <p className="mb-2"><span className="font-semibold">Project Pages:</span> {stepData.pageCount}</p>
            <p className="mb-2"><span className="font-semibold">Languages Chosen:</span> {stepData.language.programming} {stepData.language.style}</p>
            <p className="mb-2"><span className="font-semibold">Chosen Export Option:</span> {stepData.exportOptions}</p>
            <p className="mb-2"><span className="font-semibold">Generated:</span> {stepData.generationBot?.toString()}</p>
            {(stepData.exportOptions=="download" && !success && !error) ?<div className="text-blue-500 dark:text-blue-400">Download
                    STARTED...</div>
                : stepData.exportOptions=="cloud" ? <h1>You chose cloud option, your project will remain on the server!</h1> :
                    (stepData.exportOptions=="github"  && !success && !error) ? <h1> Your Project is now getting pushed to github...</h1>:<></>}
            {statusMessage && <div className="mt-4">{statusMessage}</div>}

        </div>
    );
};
export default DownloadSummary;
