"use client"

import Register from "@/Components/UserAuth/Register";
import Button from "@/Components/Common/Button";
import {useState} from "react";
import Login from "@/Components/UserAuth/Login";

const Home = () => {
    const [register, setRegister] = useState(true)
    const [label, setLabel] = useState("I have an account")
    const handleChange = () =>{
        if(register){
            setRegister(false)
            setLabel("I don't have an Account")
        }else {
            setRegister(true)
            setLabel("I have an Account")
        }
    }
    return (
        <div>
            {register ? <Register/> :
                <Login/>
            }
            <Button onClick={handleChange} label={label} color={"secondary"} />

        </div>
    );
};

export default Home;
