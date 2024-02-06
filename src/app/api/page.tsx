"use client"
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify css file
import {getAiColors, getAiLabels, getAiTexts, getCode, getHello} from "@/Components/Features/ApiRequests";
import Button from "@/Components/Common/Button";
import {useModal} from "@/Components/Contexts/ModalContext";
import UploadPage from "@/app/Upload/page";

export default function APIPage() {
    const { openModal } = useModal(); // Destructure openModal function
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
    const upload_Image = async () => {
        openModal(<UploadPage/>);
    };
    return (
        <div className="items-center">
            <h1 className="col-span-3 text-center">API Page</h1>
            <div className="col-span-3 items-center text-center">
                <Button onClick={handleHelloClick} label={"Hello"} color="list"/>
            </div>
            <h2 className="col-span-3 text-center">GoogleAI Test</h2>
            <div className="text-center">
                <Button onClick={handleAILabelsClick} label={"Labels"} color="list"/>
                <Button onClick={handleAITextsClick} label={"Texts"} color="list"/>
                <Button onClick={handleAIColorsClick} label={"Colors"} color="list"/>
            </div>
            <h2 className="col-span-3 text-center">OpenAI Test</h2>
            <div className="col-span-3 items-center text-center">
                <Button onClick={handleAIGenerateClick} label={"GenerateCode"} color="list"/>
            </div>
            <div className="col-span-3 items-center text-center">
                <Button onClick={upload_Image} label={"Upload Image"} color="list"/>
            </div>
        </div>
    );
}



