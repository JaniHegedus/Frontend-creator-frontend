import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {FaLeftLong} from "react-icons/fa6";
import {useAuth} from "@/Components/Contexts/AuthContext";
import {FileItem} from "@/Components/Types/File/FileItem";
import {FolderItem} from "@/Components/Types/File/FolderItem";
import {SelectedFile} from "@/Components/Types/File/SelectedFile";
import {FileSystemItem} from "@/Components/Types/File/FileSystemItem";

const FileBrowser: React.FC<{
                            files: FileSystemItem[],
                            setSelected?: Dispatch<SetStateAction<SelectedFile | null>>,
                            selectable?: number | null | undefined;
                            location?: any
}>
                            = ({
                                   files,
                                   setSelected,
                                   selectable,
                                   location
                            }) => {
    const [currentPath, setCurrentPath] = useState<FolderItem[]>([]);
    const user = useAuth();

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

    return (
        <div className="p-4">
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
                        onClick={() => navigateTo(file)}
                        className="py-2 px-4 bg-gray-300 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-800 rounded-md mt-1 cursor-pointer"
                    >
                        {getFileIcon(file)} <span className="ml-2 dark:text-white">{file.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileBrowser;
