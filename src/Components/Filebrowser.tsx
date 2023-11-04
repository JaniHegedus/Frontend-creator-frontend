import React, { useState } from 'react';

// Define types for file and folder structure

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

const FileBrowser: React.FC<{ files: FileSystemItem[] }> = ({ files }) => {
    const [currentPath, setCurrentPath] = useState<FolderItem[]>([]);

    const navigateTo = (file: FileSystemItem) => {
        if (file.type === 'folder') {
            setCurrentPath([...currentPath, file]);
        } else {
            // Handle file click (e.g., open file)
            alert(`Opening file: ${file.name}`);
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
        return currentFiles;
    };

    return (
        <div>
            {currentPath.length > 0 && (
                <button onClick={navigateUp}>Up</button>
            )}
            <ul>
                {getCurrentFiles().map((file, index) => (
                    <li key={index} onClick={() => navigateTo(file)}>
                        {file.type === 'folder' ? '📁' : '📄'} {file.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default FileBrowser;