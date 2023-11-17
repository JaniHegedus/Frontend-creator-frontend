"use client";

import {useAuth} from "@/Components/Contexts/AuthContext";
import RepoList from "@/Components/Features/RepoList";

const Home = () => {
    const user = useAuth();
    return (
        <div>
            <RepoList/>
        </div>
    );
};

export default Home;
