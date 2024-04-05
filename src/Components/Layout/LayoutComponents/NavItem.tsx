import Link from "next/link";
import React from "react";

const navItem = ({href, Name}: {href:string,Name:string}) => {
    return (
        <div className="flex justify-between items-center py-1 px-2 bg-gray-500 dark:bg-gray-700 sticky top-0 border-2 border-blue-500 dark:border-blue-800 rounded-md mr-3 dark:text-gray-300 hover:bg-blue-400  dark:hover:bg-blue-800">
            <Link href={href}> {Name} </Link>
        </div>
    );
}
export default navItem;