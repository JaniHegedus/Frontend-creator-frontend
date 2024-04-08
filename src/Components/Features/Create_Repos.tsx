import Button from "@/Components/Common/Button";
import {useState} from "react";

const handle_creation = () => {
    const githubClientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    // Ensure the redirectUri matches the route in your application that handles the GitHub callback.
    const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
    const redirectUri = `${frontendUrl}/auth/github/create_repo`;

    // Including `repo` scope to allow for repository creation, modification, and more.
    // Add other scopes as needed, separated by spaces.
    const scope = "repo";

    if (typeof window !== 'undefined')
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
};

const CreateRepos = () => {
    const [repoName, setRepoName] = useState(''); // Use useState to handle input value

    // Function to handle input change
    const handleInputChange = (e : any) => {
        setRepoName(e.target.value); // Update repoName state with input value
    };


    return (
        <div>
            <div className="flex items-center justify-center p-6">
                <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-800">
                    <div className="mb-4">
                        <label htmlFor="repoName" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Repository Name:</label>
                        <input
                            type="text"
                            id="repoName"
                            value={repoName}
                            onChange={handleInputChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white"/>
                    </div>
                    <div className="flex items-center justify-between">

                        <Button onClick={() => {
                            sessionStorage.setItem('repoName', repoName); // Using sessionStorage
                            handle_creation();
                        }}
                                color="primary" label="Create"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateRepos;
