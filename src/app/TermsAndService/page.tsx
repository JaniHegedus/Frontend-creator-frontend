import React from 'react';

const TermsOfService = () => {
    return (
        <div className="flex flex-col bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white">
            <div className="flex flex-col justify-center items-center bg-gray-300 dark:bg-gray-700 p-4 lg:p-10">
                <div className="text-center lg:text-left lg:ml-10">
                    <h1 className="text-4xl lg:text-6xl font-bold mb-4">Terms of Service</h1>
                    <p className="mb-6">Last updated: 2024.05.01</p>
                </div>
            </div>

            <div className="px-4 lg:px-10 py-6">
                <h2 className="text-2xl font-bold mt-4">Welcome to Frontend Creator!</h2>
                <p>
                    I outline the rules and regulations for the use of my Website, located at <a href={"https://frontend-creator.hu/"}>frontend-creator.hu</a>.
                </p>

                <h2 className="text-2xl font-bold mt-4">GitHub Data Integration</h2>
                <p>
                    My service integrates with your GitHub account to provide functionality related to pushing to GitHub repositories.
                    By connecting your GitHub account, you authorize me to access your GitHub data as necessary for the operation of my service.
                </p>

                <h2 className="text-2xl font-bold mt-4">Email and User Creation</h2>
                <p>
                    I use your email address solely for the purpose of registering and managing your account. Your email will not be used for any other purposes without your explicit consent.
                </p>

                <h2 className="text-2xl font-bold mt-4">Data Storage</h2>
                <p>
                    I store necessary data in my database to enhance your user experience. I do not share or sell your personal data to third parties.
                </p>

                <h2 className="text-2xl font-bold mt-4">Token System and Data Protection</h2>
                <p>
                    I implement a token-based authentication system to protect your data and access to my services. It is your responsibility to keep your access tokens secure.
                </p>

                <h2 className="text-2xl font-bold mt-4">Usage Rights and Revocation</h2>
                <p>
                    Access to my service is granted on a temporary basis as I am currently in a beta phase. I reserve the right to revoke access to my services at any time without liability.
                </p>

                <h2 className="text-2xl font-bold mt-4">Changes to Terms</h2>
                <p>
                    I reserve the right to modify these terms at any time. I will notify users of any changes through my service interface or via email.
                </p>

                <h2 className="text-2xl font-bold mt-4">Contact Me</h2>
                <p>
                    If you have any questions about these Terms of Service, please contact me at <a href="mailto:hegedusjanos2002@gmail.com" className="text-blue-500 hover:text-blue-700">
                    hegedusjanos2002@gmail.com</a>.
                </p>
            </div>
        </div>
);
};

export default TermsOfService;
