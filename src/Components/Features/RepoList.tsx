import React, { useState, useEffect } from 'react';
import { useAuth } from "@/Components/Contexts/AuthContext";
import {RepoType} from "@/Types/RepoType";

const RepoList: React.FC = () => {
    const { data: userData } = useAuth();
    const [repos, setRepos] = useState<RepoType[]>([]);

    useEffect(() => {
        if (userData?.github_repos) {
            // @ts-ignore
            setRepos(userData.github_repos);
        }
    }, [userData?.github_repos]);

    return (
        <div className="overflow-auto h-80vh  lg:w-80vh"> {/* Adjust width as needed */}
            <ul className="space-y-2">
                {repos.map((repo, index) => (
                    <li key={index} className="bg-gray-300 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-800 rounded-md py-2 px-4 cursor-pointer flex justify-between items-center">
                        <a href={repo.clone_url} target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-white">
                            {repo.name}
                        </a>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            ({repo.full_name})
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RepoList;
