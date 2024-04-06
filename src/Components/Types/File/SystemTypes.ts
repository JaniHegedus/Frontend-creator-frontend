export type FileSystemItem = FileItem | FolderItem;

export type FolderItem = {
    type: 'folder';
    name: string;
    files: Array<FileItem | FolderItem>;
};

export type FileItem = {
    type: 'file';
    name: string;
};