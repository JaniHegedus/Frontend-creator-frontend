import React, { useEffect, useState} from 'react';
import { useAuth } from "@/Components/Contexts/AuthContext";
import axios from 'axios';
import FileBrowser from "@/Components/Features/Filebrowser";
import Loading from "@/Components/Common/Loading";
import {MyFileProps} from "@/InterFaces/MyFileProps";

const MyFiles = ({setSelected, selectable, location, downloadable} : MyFileProps) => {
    const { data: userData } = useAuth();
    const [files, setFiles] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    let token: string| null;
    if(typeof localStorage != undefined)
        token = localStorage.getItem('token');

    const fetchUserFiles = async ({username}: { username: any }) => {
        setIsLoading(true)
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL; // Ensure this is set in your environment
        try {
            const response = await axios.get(`${backendUrl}/user_files/${username}`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            setIsLoading(false);
            return response.data.files; // Adjust according to your API response structure
        } catch (error) {
            console.error('Error fetching user files:', error);
            setError('Failed to fetch files, Do you have files on your account?');
            setIsLoading(false);
            throw error;
        }
    };

    useEffect(() => {
        if (userData && userData.username) {
            fetchUserFiles({username: userData.username})
                .then(fetchedFiles => setFiles(fetchedFiles))
                .catch(err => console.error(err));
        }
    }, [userData]);

    if (!userData) {
        return <p>Please log in to view files.</p>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!files) {
        return <div>Loading...</div>;
    }

    return (<>
        {
            isLoading?
                <Loading/>
                :
                <FileBrowser files={files} setSelected={setSelected} selectable={selectable} location={location} downloadable={downloadable}/>
        }</>
        );
};

export default MyFiles;
