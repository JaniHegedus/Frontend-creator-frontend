"use client"
import 'react-toastify/dist/ReactToastify.css';
import Button from "@/Components/Button";
import {useAuth} from "@/Components/AuthContext";
export default function Home() {
    const { setUser } = useAuth();
    const handleClick = () =>{
        localStorage.removeItem('user');     // Remove the user from local storage
        localStorage.removeItem('userEmail'); // Remove the userEmail from local storage
        localStorage.removeItem('token');
        setUser(null)
    }
    return (
        <>
            <div className="text-center text-5xl">Hello World</div>
            <Button label="CLEARALL" onClick={handleClick}/>
        </>
    );
}