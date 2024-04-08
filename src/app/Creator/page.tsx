import React from "react";
import dynamic from "next/dynamic";
const Creator = dynamic(() => import('@/Components/Features/Steps'), { ssr: false });
const Home = () => {
    return (
        <div>
            <Creator/>
        </div>
    );
};

export default Home;
