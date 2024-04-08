import dynamic from 'next/dynamic';
import React, {useEffect, useRef, useState} from 'react';
import { IEditorProps } from 'react-ace';
import Button from "@/Components/Common/Button";
import MyFiles from "@/Components/Features/MyFiles";
import axios from "axios";
import {EditorPageProps} from "@/Components/InterFaces/Steps/EditorPageProps";
import {SelectedFile} from "@/Components/Types/File/SelectedFile";
import Tooltip from "@/Components/Features/ToolTip";
import {FaInfo} from "react-icons/fa";

const AceEditor = dynamic(
    async () => {
        const ace = await import('react-ace');
        require('ace-builds/src-noconflict/mode-html');
        require('ace-builds/src-noconflict/theme-monokai');
        // Import the themes and modes you need
        await import('ace-builds/src-noconflict/mode-html');
        await import('ace-builds/src-noconflict/mode-css');
        await import('ace-builds/src-noconflict/mode-javascript');
        await import('ace-builds/src-noconflict/theme-monokai');
        await import('ace-builds/src-noconflict/ext-language_tools'); // necessary for autocompletion
        // add other imports for languages, themes, or extensions as needed
        return ace;
    },
    { ssr: false }
) as React.ComponentType<IEditorProps>;

const EditorPage = ({nextStep, prevStep, stepData}: EditorPageProps) => {
    const [language, ] = useState('html');
    const [code, setCode] = useState<string>('');
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [title, setTitle] = useState('')
    const [theme, ] = useState(localStorage.getItem('themeE') === 'monokai')
    const [Etheme, setEtheme] = useState("monokai")
    const [selectedFile, setSelectedFile] = useState<SelectedFile  | null | undefined>()
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL; // Ensure this is set in your environment
    const saveCode = async (selectedFile: SelectedFile | null | undefined, code: any) => {
        const formData = new FormData();
        formData.append('file_path', selectedFile?.path || "");
        formData.append('code', code);

        try {
            // Note the direct passing of formData as the second argument
            const response = await axios.post(`${backendUrl}/user_file_update`, formData);
            console.log(response.data); // Adjust logging based on the actual response structure
        } catch (error) {
            console.error('Error updating user files:', error);
            throw error; // Rethrowing the error might not be necessary unless you have a catch block where this is called
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Check if 'Ctrl' and 'S' are pressed together
            if (event.ctrlKey && event.key === 's') {
                event.preventDefault(); // Prevent the browser's save dialog
                updateOutput(code); // Call the function to update iframe
                console.log(selectedFile)
                console.log(code)
                saveCode(selectedFile, code)
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [code]);
    useEffect(() => {
        if (theme)
        {
            setEtheme("monokai")
        }else {
            setEtheme("chrome")
        }
    }, [theme, localStorage.getItem('themeE')]);
    // Function to detect language based on input

    const updateOutput = (htmlContent: string) => {
        const iframe = iframeRef.current;
        if (iframe?.contentWindow) {
            iframe.contentWindow.document.open();
            iframe.contentWindow.document.write(htmlContent);
            setTitle(iframe.contentWindow.document.title);
            iframe.contentWindow.document.close();
        } else {
            console.error('iframe contentWindow is not available');
        }
    };
    // @ts-ignore
    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };
    const getFile =  async  (selectedFile: SelectedFile | null | undefined) => {
        if(stepData)
        {
            try {

                const response = await axios.get(`${backendUrl}/user_file`, {
                    params: { file_path: selectedFile?.path },
                });
                console.log(response.data.content)
                handleCodeChange(response.data.content); // Adjust according to your API response structure
            } catch (error) {
                console.error('Error fetching user files:', error);
                throw error;
            }
        }
    };// In your useEffect hook that depends on selectedFile
    useEffect(() => {
        if(selectedFile) {
            getFile(selectedFile); // This correctly fetches and sets the file content
        }
    }, [selectedFile]); // Depend on selectedFile

    return (
        <>
            <div className="flex" style={{height: '72vh', width: '190vh'}}>
                <div className="w-auto">
                    <h1>Project:</h1>
                    {stepData ?<MyFiles selectable={1} setSelected={setSelectedFile} location={"Projects"+"/"+stepData.project?.projectName}/>
                    : <MyFiles selectable={1} setSelected={setSelectedFile}/>
                    }
                    </div>
                <div className="flex flex-col w-2/4">
                    <h1>Code Editor : {selectedFile ? selectedFile.name : ""}</h1>
                    <AceEditor
                            className="border-2 w-1/2"
                            mode={language}
                            theme={Etheme}
                            name="code_editor"
                            value={code}
                            onChange={handleCodeChange}
                            fontSize={16}
                            showPrintMargin={true}
                            showGutter={true}
                            highlightActiveLine={true}
                            setOptions={{
                                enableBasicAutocompletion: true,
                                enableLiveAutocompletion: true,
                                enableSnippets: true,
                                showLineNumbers: true,
                                tabSize: 2,
                                useWorker: false
                            }}
                            style={{width: '100%', height: '100%'}}
                            editorProps={{$blockScrolling: true}}
                        />
                </div>
                <div className="flex flex-col w-1/4 justify-center text-center">
                    <h1>Page Title: {title}</h1>
                    <Tooltip message={"You can save the file and preview using CTRL+S"}>
                        <div className={"rounded bg-red-500 dark:bg-red-800 p-1 text-center justify-center items-center grid grid-cols-2"}>
                            <FaInfo/> <p>INFORMATION</p>
                        </div>
                    </Tooltip>
                    <iframe
                        ref={iframeRef}
                        className="border-2 h-screen"
                        style={{ background: "white", border: '3', margin:'4' }}
                        title="Output"
                    />
                </div>
            </div>
            <div className="flex justify-between items-center w-full px-4">
                <Button onClick={prevStep} label="Previous" color="secondary" />
                <Button onClick={nextStep} label="Next" color="secondary" />
            </div>
        </>
    );
};

export default EditorPage;
