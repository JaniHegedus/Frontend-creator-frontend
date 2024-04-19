import React, {useEffect, useState} from 'react';
import { useAuth } from '@/Components/Contexts/AuthContext';
import Upload from '@/Components/Features/Upload';
import { useModal } from '@/Components/Contexts/ModalContext';
import Button from '@/Components/Common/Button';
import axios from "axios";
import FilerobotImageEditor, {
    TABS,
    TOOLS,
} from 'react-filerobot-image-editor';
import Inputfield from "@/Components/Common/Inputfield";
import {toast} from "react-toastify";
import {ImageEditorProps} from "@/InterFaces/Steps/ImageEditorProps";
import Tooltip from "@/Components/Features/ToolTip";

const ImageEditor = ({ nextStep, prevStep, addToStepData }:ImageEditorProps) => {
    let token: string| null;
    if(typeof localStorage != undefined)
        token = localStorage.getItem('token');
    const user = useAuth();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const {openModal} =useModal();
    const [imageSource, setImageSource] = useState('blank-white-background.jpg');
    const [newImageSource, setNewImageSource] = useState('');
    const [uploadedDesignState, ] = useState(null);
    const [theme, ] = useState(localStorage.getItem('themeE') === 'monokai')
    const isMobile = () => window.innerWidth <= 640; // 640px is a common breakpoint for mobile devices
    const [displayEditor] = useState(!isMobile());

    const lightModePalette = {
        palette:{
            'bg-secondary': '#F9FAFB', // Gray-50 as secondary background
            'bg-primary': '#FFFFFF', // White as primary background
            'bg-primary-active': '#F3F4F6', // Gray-100 for active state backgrounds
            'accent-primary': '#3B82F6', // Blue-500 for primary accent
            'accent-primary-active': '#2563EB', // Blue-600 for active primary accent
            'icons-primary': '#1F2937', // Gray-800 for primary icons
            'icons-secondary': '#6B7280', // Gray-500 for secondary icons
            'borders-secondary': '#D1D5DB', // Gray-300 for secondary borders
            'borders-primary': '#E5E7EB', // Gray-200 for primary borders
            'borders-strong': '#9CA3AF', // Gray-400 for stronger borders
            'light-shadow': 'rgba(100, 100, 111, 0.2)', // Example light shadow
            'warning': '#F87171', // Red-400 for warnings
        },
        typography: {
            fontFamily: 'Roboto, Arial',
        },
    };
    const darkModePalette = {
        palette:{
            'bg-secondary': '#4B5563', // Gray-600 as secondary background
            'bg-primary': '#1F2937', // Gray-800 as primary background
            'bg-primary-active': '#374151', // Gray-700 for active state backgrounds
            'accent-primary': '#10B981', // Green-500 for primary accent
            'accent-primary-active': '#059669', // Green-600 for active primary accent
            'icons-primary': '#F9FAFB', // Gray-50 for primary icons
            'icons-secondary': '#E5E7EB', // Gray-200 for secondary icons
            'borders-secondary': '#374151', // Gray-700 for secondary borders
            'borders-primary': '#4B5563', // Gray-600 for primary borders
            'borders-strong': '#6B7280', // Gray-500 for stronger borders
            'light-shadow': 'rgba(0, 0, 0, 0.2)', // Example shadow for dark mode
            'warning': '#F87171', // Red-400 for warnings, same as light for contrast
        },
        typography: {
            fontFamily: 'Roboto, Arial',
        },
    };
    const [Etheme, setEtheme] = useState(darkModePalette)

    useEffect(() => {
        if (theme)
        {
            setEtheme(darkModePalette)
        }else {
            setEtheme(lightModePalette)
        }
    }, [theme, localStorage.getItem('themeE')]);

    useEffect(() => {
        // Function to handle resize events
        const handleResize = () => {
            // Set state, run checks, or trigger side effects related to window size
            // ...
        };

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Call the handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount


    const handleSubmit = () => {
        setLoading(true);
        if(newImageSource)
            setImageSource(newImageSource);
        else
            toast.error("No Url given!")
        setLoading(false);
    };

    const onSave = async (editedImageObject : any) => {
        setLoading(true)
        // Extract the base64 image data and convert it to a file
        const base64String = editedImageObject.imageBase64;
        const blob = await (await fetch(base64String)).blob();
        const file = new File([blob], `${editedImageObject.fullName}`, { type: editedImageObject.mimeType });

        // Create a FormData object and append the file
        const formData = new FormData();
        formData.append('file', file);
        formData.append('username', user.data?.username || '')

        // Append additional data if necessary
        // For example, appending the design state as well
        //const designStateBlob = new Blob([JSON.stringify(designState)], { type: 'application/json' });
        //formData.append('designState', designStateBlob);

        try {
            await axios.post(`${backendUrl}/uploads`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                }
            });
            const fileLocation = `${user.data?.username}/${editedImageObject.fullName}`;
            addToStepData( editedImageObject.fullName, fileLocation);
            // Handle the response from the backend
            console.info('Image uploaded successfully:', editedImageObject.fullName);
            setSuccess('Image uploaded successfully: '+ editedImageObject.fullName);
            setLoading(false);
        } catch (error) {
            console.info('Error uploading image:', error);
            setError('Error uploading image: '+ error);
            setLoading(false);
        }
    };



    const handleUploadClick = () => {
        setLoading(true);
        openModal(<Upload
            onFileLocation=
                {
                    (fullName, location) => addToStepData( fullName, location)
                }
        />)
        setLoading(false);
    };
    return (
        <>
            <div className="flex justify-center items-center w-full h-full">
                <div
                    className="flex flex-col w-full max-w-5xl mx-auto bg-white dark:bg-gray-700 rounded-lg shadow-lg p-2 border-2 border-amber-100 dark:border-gray-600 overflow-hidden">
                    <div
                        className="mx-auto bg-white dark:bg-gray-700 rounded-lg shadow-lg p-2 border-2 border-amber-100 dark:border-gray-600">
                        <div className="mb-4 flex ">
                            <Inputfield
                                type="text"
                                placeholder="Enter image source URL"
                                value={newImageSource}
                                onChange={setNewImageSource}
                            />
                            <Button
                                onClick={handleSubmit}
                                label={loading ? "Loading..." : "Submit"}
                                disabled={loading}
                            />
                        </div>
                        {displayEditor ? (
                            <Tooltip message={"You can create or Import Images Here"}>
                                <div className="">
                                    <FilerobotImageEditor
                                        defaultSavedImageName={'page-0'}
                                        theme={Etheme}
                                        // @ts-ignore
                                        loadableDesignState={uploadedDesignState}
                                        source={imageSource}
                                        onSave={(editedImageObject) => onSave(editedImageObject)}
                                        annotationsCommon={{
                                            fill: '#ff0000',
                                        }}
                                        Text={{text: 'Filerobot...'}}
                                        Rotate={{angle: 90, componentType: 'slider'}}
                                        Crop={{
                                            presetsItems: [
                                                {
                                                    titleKey: 'classicTv',
                                                    descriptionKey: '4:3',
                                                    ratio: 4 / 3,
                                                },
                                                {
                                                    titleKey: 'cinemascope',
                                                    descriptionKey: '21:9',
                                                    ratio: 21 / 9,
                                                },
                                                {
                                                    titleKey: 'classic',
                                                    descriptionKey: '16:9',
                                                    ratio: 16 / 9,
                                                },
                                            ],
                                            presetsFolders: [
                                                {
                                                    titleKey: 'socialMedia',
                                                    groups: [
                                                        {
                                                            titleKey: 'facebook',
                                                            items: [
                                                                {
                                                                    titleKey: 'profile',
                                                                    width: 180,
                                                                    height: 180,
                                                                    descriptionKey: 'fbProfileSize',
                                                                },
                                                                {
                                                                    titleKey: 'coverPhoto',
                                                                    width: 820,
                                                                    height: 312,
                                                                    descriptionKey: 'fbCoverPhotoSize',
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        }}
                                        tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK]}
                                        defaultTabId={TABS.ANNOTATE}
                                        defaultToolId={TOOLS.TEXT}
                                        savingPixelRatio={0}
                                        previewPixelRatio={0}
                                    />
                            </div>
                            </Tooltip>
                        ) : (
                            // Display a message or alternative content for mobile users
                            <div className="text-center p-4">
                                <p className="text-lg text-gray-800 dark:text-gray-300">
                                    The image editor is not available on mobile devices. Please use a desktop for image
                                    editing features.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <div className="flex justify-between items-center w-full px-4">
                <Button onClick={prevStep} label={loading ? "Loading...":"Previous"} disabled={loading} color={"secondary"}/>
                <Tooltip message={"You can Upload Pictures here!"}><Button onClick={handleUploadClick} label={loading ? "Loading...":"Upload"} disabled={loading} color={"secondary"}/></Tooltip>
                <Button onClick={nextStep} label={loading ? "Loading...":"Next"} disabled={loading} color={"secondary"}/>
            </div>
        </>
    );
};

export default ImageEditor;