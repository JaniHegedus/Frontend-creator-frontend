// components/Upload.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useAuth } from "@/Components/Contexts/AuthContext";

const Upload = () => {
    const { data: userData } = useAuth();
    const [file, setFile] = useState<File | null>(null);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
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

        const formData = new FormData();
        formData.append('file', file);
        formData.append('username', userData?.username || '')

        try {
            const response = await axios.post(`${backendUrl}/uploads`, formData, {
                "headers": {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setSuccess(`File uploaded successfully: ${response.data.filename}`);
        } catch (err) {
            setError('Upload failed. Please try again.');
        }
    };

    if (!userData) {
        return <p>Please log in to upload files.</p>;
    }

    return (
        <div className="flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Upload
                        </button>
                    </div>
                    {success && <div className="text-green-500">{success}</div>}
                    {error && <div className="text-red-500">{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default Upload;
