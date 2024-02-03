import React, { useState } from "react";
import { Link } from "@inertiajs/react";

const SidebarMenu = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div>
            <div className="flex items-center">
                <button onClick={toggleDropdown} className="">
                    {showDropdown ? "General PCR ▲" : "General PCR ▼"}
                </button>
            </div>
            {showDropdown && (
                <div className="flex flex-col items-center">
                    <Link href="/contacts">Contact List</Link>
                    <Link href="/registers">User List</Link>

                    {/* <Link
                        href="/general-pcr/link2"
                        className="p-2 hover:bg-gray-700"
                    >
                        2
                    </Link> */}
                </div>
            )}
        </div>
    );
};

export default SidebarMenu;
