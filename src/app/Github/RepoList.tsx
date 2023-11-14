import React, { useState, useEffect } from 'react';
import {useAuth} from "@/Components/Contexts/AuthContext";

type RepoType = {
    id: number;
    name: string;
    // ... include other properties you might need
};

const RepoList: React.FC = () => {
    const user = useAuth();
    const [repoNames, setRepoNames] = useState<string[] | undefined>([]);
    const [repoFullNames, setRepoFullRepoNames] = useState<string[] | undefined>([]);
    const [repoCloneURL, setRepoCloneURL] = useState<string[] | undefined>([]);
    console.log(user.data?.github_repos);
    useEffect(() => {
        if(user.data?.github_repos){
            // @ts-ignore
            const names = user.data?.github_repos.map((repo: RepoType) => repo.name);
            // @ts-ignore
            const fullnames = user.data?.github_repos.map((repo: RepoType) => repo.full_name);
            // @ts-ignore
            const clone_urls = user.data?.github_repos.map((repo: RepoType) => repo.clone_url);
            setRepoNames(names);
            setRepoFullRepoNames(fullnames);
            setRepoCloneURL(clone_urls);
        }
    }, [user.data?.github_repos]);
    //
    return (
        <div className="grid grid-cols-3">
            {user.data?.github_repos ? (
                <>
                    <div className="mb-6 font-bold text-center text-gray-900 dark:text-white">
                        <h1>GitHub Repository Names:</h1>
                        <ul>
                            { // @ts-ignore
                                repoNames.map((name, index) => (
                            <li key={index}>{name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-6 font-bold text-center text-gray-900 dark:text-white">
                        <h1>GitHub Repository Full Names:</h1>
                        <ul>
                            { // @ts-ignore
                                repoFullNames.map((name, index) => (
                                    <li key={index}>{name}</li>
                                ))}
                        </ul>
                    </div>
                    <div className="mb-6 font-bold text-center text-gray-900 dark:text-white">
                        <h1>GitHub Repository Links:</h1>
                        <ul>
                            { // @ts-ignore
                                repoCloneURL.map((name, index) => (
                                    <li key={index}>{name}</li>
                                ))}
                        </ul>
                    </div>
                </>
                ) :
            (<p>
                No Repos Found
            </p>)
            }
        </div>
    );
};

export default RepoList;
