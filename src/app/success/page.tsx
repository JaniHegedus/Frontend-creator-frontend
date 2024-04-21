"use client"
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from "react";

export default function Home() {
    useEffect(() => {
        setTimeout(window.location.href='/',1000)
    }, []);
    return (
        <>
            <div className="text-center text-5xl">Operation successful!</div>
        </>
    );
}