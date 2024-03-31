import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useAuth } from "@/Components/Contexts/AuthContext";
import Loading from "@/Components/Common/Loading";

interface UploadProps {
    onFileLocation?: (fullname : string, location : string) => void; // Callback function to return the file location
}

const Upload = ({ onFileLocation }: UploadProps) => {
    const { data: userData } = useAuth();
    const [file, setFile] = useState<File | null>(null);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files ? e.target.files[0] : null);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSuccess('');
        setError('');

        if (!file) {
            setError('Please select a file to upload.');
            return;
        }
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('username', userData?.username || '')

        try {
            const response = await axios.post(`${backendUrl}/uploads`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if(onFileLocation)
            {
                onFileLocation(response.data.filename, userData?.username+"/"+response.data.filename)
            }
            setSuccess(`File uploaded successfully: ${response.data.filename}`);
            setIsLoading(false);
        } catch (err) {
            setError('Upload failed. Please try again.');
            setIsLoading(false);
        }
    };

    if (!userData) {
        return <p>Please log in to upload files.</p>;
    }

    return (
        <div className="flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                {isLoading? <Loading/>:
                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:hover:bg-blue-800">
                            Upload
                        </button>
                    </div>
                    {success && <div className="text-green-500 dark:text-green-400">{success}</div>}
                    {error && <div className="text-red-500 dark:text-red-400">{error}</div>}
                </form>
                }
            </div>
        </div>
    );
};

export default Upload;
