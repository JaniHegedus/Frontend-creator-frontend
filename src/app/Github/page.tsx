"use client";

import RepoList from "@/Components/Features/RepoList";
import Create_Repos from "@/Components/Features/Create_Repos";
import React from "react";

const Home = () => {
    return (
        <div className={"grid grid-cols-2"}>
            <RepoList/>
            <Create_Repos/>
        </div>
    );
};

export default Home;
