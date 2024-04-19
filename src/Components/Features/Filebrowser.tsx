import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {FaLeftLong} from "react-icons/fa6";
import {useAuth} from "@/Components/Contexts/AuthContext";
import {SelectedFile} from "@/Types/File/SelectedFile";
import {FileItem, FileSystemItem, FolderItem} from "@/Types/File/SystemTypes";
import {FaDownload} from "react-icons/fa";
import axios from "axios";
import Button from "@/Components/Common/Button";

const FileBrowser: React.FC<{
                            files: FileSystemItem[],
                            setSelected?: Dispatch<SetStateAction<SelectedFile | null>>,
                            selectable?: number | null | undefined,
                            location?: any,
                            downloadable?: boolean
}>
                            = ({
                                   files,
                                   setSelected,
                                   selectable,
                                   location,
                                   downloadable
                            }) => {
    const [currentPath, setCurrentPath] = useState<FolderItem[]>([]);
    const user = useAuth();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const username = user.data?.username

    useEffect(() => {
        // This effect runs only once on component mount due to an empty dependency array
        if (location) {
            // Split the location into path segments
            const pathSegments = location.split('/');
            const initialPathArray: FolderItem[] = [];

            let currentFiles: FileSystemItem[] = files;

            // Iterate over each segment to build the initial path array
            for (const segment of pathSegments) {
                const foundFolder = currentFiles.find(file => file.type === 'folder' && file.name === segment) as FolderItem;
                if (foundFolder) {
                    initialPathArray.push(foundFolder);
                    currentFiles = foundFolder.files;
                } else {
                    // If any segment is not found, stop further processing
                    break;
                }
            }

            setCurrentPath(initialPathArray);
        }
    }, [location])

    const getFileIcon = (file: FileItem | FolderItem): string => {
        if (file.type === 'folder') {
            return '📁';
        } else {
            // Here you can extend the logic to handle different file types
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            switch (fileExtension) {
                case 'docx':
                case 'doc':
                    return '📄'; // Document icon
                case 'mp3':
                    return '🎵'; // Music icon
                case 'jpg':
                case 'jpeg':
                case 'png':
                    return '🖼️'; // Image icon
                // Add more cases as needed
                default:
                    return '📄'; // Default file icon
            }
        }
    };

    const navigateTo = (file: FileSystemItem) => {
        if (file.type === 'folder') {
            setCurrentPath([...currentPath, file]);
        } else {
            // Handle file click (e.g., open file)
            if(selectable && selectable>0) {
                if (setSelected) {
                    let pathString = currentPath.map(i => i.name).join('/');
                    pathString = pathString ? `${pathString}/` : '';

                    setSelected({ name: file.name, path: `${user.data?.username}/${pathString}${file.name}` });
                    alert(`Selected file file: ${file.name}`);
                    selectable -= 1;
                }
            }else {
                if(!downloadable)
                    alert(`Can't select more files!`);
            }
        }
    };

    const navigateUp = () => {
        setCurrentPath(currentPath.slice(0, -1));
    };

    const getCurrentFiles = () => {
        let currentFiles: FileSystemItem[] = files;
        currentPath.forEach(path => {
            currentFiles = (currentFiles.find(f => f.type === 'folder' && f.name === path.name) as FolderItem).files;
        });

        // Sort the files: folders first, then files
        return currentFiles.sort((a, b) => {
            if (a.type === 'folder' && b.type !== 'folder') {
                return -1;
            }
            if (a.type !== 'folder' && b.type === 'folder') {
                return 1;
            }
            return a.name.localeCompare(b.name); // Optionally, sort by name
        });
    };
    const download = async (file: FileSystemItem) => {
        let filename = file.name;
        let filetype = file.type;

        // Build the full path from the currentPath and the filename
        let pathString = currentPath.map(folder => folder.name).join('/') + (currentPath.length > 0 ? '/' : '') + filename;

        if (filetype === "folder") {
            try {
                const response = await axios.get(`${backendUrl}/download_directory`, {
                    params: { username, filename: pathString },
                    responseType: "blob",
                });
                console.info(response.data);

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `${filename}.zip`);
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(url); // Clean up and revoke the object URL
                link.remove();
            } catch (error) {
                // @ts-ignore
                console.info(`Error downloading directory: ${error.message}`);
            }
        } else {
            try {
                const response = await axios.get(`${backendUrl}/download_file`, {
                    params: { username, filename: pathString },
                    responseType: "blob",
                });
                console.info(response.data);

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", filename);
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(url); // Clean up and revoke the object URL
                link.remove();
            } catch (error) {
                // @ts-ignore
                console.info(`Error downloading file: ${error.message}`);
            }
        }
    }

    const downloadAll = async () =>{
        try {
            const response = await axios.get(`${backendUrl}/download`, {
                params: { username },
                responseType: "blob",
            });
            console.info(response.data);

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${username}.zip`);
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url); // Clean up and revoke the object URL
            link.remove();
        } catch (error) {
            // @ts-ignore
            console.info(`Error downloading files: ${error.message}`);
        }
    }
    return (
        <div className="p-4">
            <Button onClick={() => downloadAll()} label={"Download Drive Content"}/>
            {currentPath.length > 0 && (
                <button
                    onClick={navigateUp}
                    className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline dark:bg-blue-900 dark:hover:bg-blue-600 mt-3"
                >
                    <FaLeftLong/>
                </button>
            )}
            <ul className="list-disc pl-5 mt-3">
                {getCurrentFiles().map((file, index) => (
                    <li
                        key={index}
                        className="py-2 px-4 bg-gray-300 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-800 rounded-md mt-1 cursor-pointer"
                    >
                        {getFileIcon(file)}
                        <span className="ml-2 dark:text-white">
                            <button onClick={() => navigateTo(file)}>{file.name}</button>
                        </span>
                        {downloadable ? <button onClick={() => download(file)} ><FaDownload/></button> : <></>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileBrowser;
