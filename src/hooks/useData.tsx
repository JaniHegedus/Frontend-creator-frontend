import {useEffect, useState} from "react";

export default function useData({route}: { route: string }) {
    const [data, setData] = useState<{ message: string } | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://127.0.0.1:3000/${route}`, { mode: 'cors' });
                console.log(response)
                if (!response.ok) {
                    throw new Error(`Failed to fetch data. Status: ${response.status}`);
                }

                const fetchedData = await response.json();
                setData(fetchedData);
                console.log(fetchedData);
            } catch (err) {
                // @ts-ignore
                setError(err);
            }
        }

        fetchData();
    }, []);

    return { data, error };
}