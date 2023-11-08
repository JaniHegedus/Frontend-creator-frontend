"use client"
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify css file
import {getAiColors, getAiLabels, getAiTexts, getCode, getHello} from "@/app/api/ApiRequests";
import Button from "@/Components/Common/Button";

export default function APIPage() {
    const handleHelloClick = async () => {
        try {
            await getHello(); // Assuming getHello triggers the toast internally
        } catch (error) {
            // @ts-ignore
            toast.error(error.error); // Fallback toast for any error
        }
    };
    const handleAILabelsClick = async () => {
        try {
            await getAiLabels(); // Assuming getHello triggers the toast internally
        } catch (error) {
            // @ts-ignore
            toast.error(error.error); // Fallback toast for any error
        }
    };
    const handleAITextsClick = async () => {
        try {
            await getAiTexts(); // Assuming getHello triggers the toast internally
        } catch (error) {
            // @ts-ignore
            toast.error(error.error); // Fallback toast for any error
        }
    };
    const handleAIColorsClick = async () => {
        try {
            await getAiColors(); // Assuming getHello triggers the toast internally
        } catch (error) {
            // @ts-ignore
            toast.error(error.error); // Fallback toast for any error
        }
    };
    const handleAIGenerateClick = async () => {
        try {
            await getCode(); // Assuming getHello triggers the toast internally
        } catch (error) {
            // @ts-ignore
            toast.error(error.error); // Fallback toast for any error
        }
    };
    return (
        <div className="grid-cols-3">
            <h1 className="col-span-3 text-center">API Page</h1>
            <div className="col-span-3 items-center text-center">
                <Button onClick={handleHelloClick} label={"Hello"} className="m-1" disabled={false}/>
            </div>
            <h2 className="col-span-3 text-center">GoogleAI Test</h2>
            <div>
                <Button onClick={handleAILabelsClick} label={"Labels"} className="m-1" disabled={false}/>
                <Button onClick={handleAITextsClick} label={"Texts"} className="m-1" disabled={false}/>
                <Button onClick={handleAIColorsClick} label={"Colors"} className="m-1" disabled={false}/>
            </div>
            <h2 className="col-span-3 text-center">OpenAI Test</h2>
            <div className="col-span-3 items-center text-center">
            <Button onClick={handleAIGenerateClick} label={"GenerateCode"} className="m-1" disabled={false}/>
            </div>

        </div>
    );
}



