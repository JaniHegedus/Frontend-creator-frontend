// pages/editor.js
import dynamic from 'next/dynamic';
import React, {useEffect, useRef, useState} from 'react';
import { IEditorProps } from 'react-ace';
import FileBrowser from "@/Components/Features/Filebrowser";
import Button from "@/Components/Common/Button";

type FileSystemItem = FileItem | FolderItem;
type FileItem = {
    type: 'file';
    name: string;
};

type FolderItem = {
    type: 'folder';
    name: string;
    files: Array<FileItem | FolderItem>;
};
const fileData: FileSystemItem[] = [
    {
        type: 'folder',
        name: 'Documents',
        files: [
            { type: 'file', name: 'resume.docx' },
            { type: 'file', name: 'cover_letter.docx' },
        ],
    },
    {
        type: 'folder',
        name: 'Music',
        files: [
            { type: 'file', name: 'song.mp3' },
        ],
    },
    {
        type: 'file',
        name: 'photo.jpg',
    },
];
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

interface EditorPageProps {
    nextStep: () => void;
    prevStep: () => void;
}

const EditorPage = ({nextStep, prevStep}: EditorPageProps) => {
    const [language, setLanguage] = useState('html');
    const [code, setCode] = useState<string>('');
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [title, setTitle] = useState('')
    const [theme, setTheme] = useState(localStorage.getItem('themeE') === 'monokai')
    const [Etheme, setEtheme] = useState("monokai")
    useEffect(() => {
        const savedCode = localStorage.getItem('code');
        if (savedCode) {
            setCode(savedCode);
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            // Check if 'Ctrl' and 'S' are pressed together
            if (event.ctrlKey && event.key === 's') {
                event.preventDefault(); // Prevent the browser's save dialog
                console.log("keypress")
                updateOutput(code); // Call the function to update iframe
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
    // @ts-ignore

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
        localStorage.setItem('code', newCode); // Save the new code to localStorage
    };

    return (
        <>
            <div className="flex" style={{height: '72vh', width: '190vh'}}>
                <div className="w-auto">
                    <h1>Project:</h1>
                    <FileBrowser files={fileData}/>
                </div>
                <div className="flex flex-col w-2/4">
                    <h1>Code Editor</h1>
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
                <div className="flex flex-col w-1/4">
                    <h1>Page Title: {title}</h1>
                    <iframe
                        ref={iframeRef}
                        className="border-2 h-screen"
                        //style={{ width: '100%', height: '100%', border: '3', margin:'4' }}
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
