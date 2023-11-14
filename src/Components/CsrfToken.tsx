"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

const useCsrfToken = () => {
    const [csrfToken, setCsrfToken] = useState<string>('');

    useEffect(() => {
        const fetchCsrfToken = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/csrf`);
            setCsrfToken(response.data.csrf_token);
        };

        fetchCsrfToken().then(() => {});
    }, []);
    return csrfToken;
};

export default useCsrfToken;
