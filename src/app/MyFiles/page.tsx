"use client"
import React from 'react';
import MyFiles from "@/Components/Features/MyFiles";

const FilesPage = () => {
    return (
        <div>
            <MyFiles downloadable={true}/>
        </div>
    );
};

export default FilesPage;