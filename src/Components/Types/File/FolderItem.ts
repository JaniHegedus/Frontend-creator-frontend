import {FileItem} from "@/Components/Types/File/FileItem";

export
type FolderItem = {
    type: 'folder';
    name: string;
    files: Array<FileItem | FolderItem>;
};