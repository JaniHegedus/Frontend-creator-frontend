import dynamic from "next/dynamic";

const UserProfile = dynamic(() => import('@/Components/UserAuth/UserProfile'), { ssr: false });
const Home = () => {

    return (
        <div>
            <UserProfile/>
        </div>
    );
};

export default Home;
