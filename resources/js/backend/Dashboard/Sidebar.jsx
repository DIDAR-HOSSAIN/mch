// Sidebar.jsx
import React from "react";
import { Link } from "@inertiajs/react";
import "./../../../css/sidebar.css"; // Import your CSS file

const Sidebar = () => {
    return (
        <div className="bg-gray-300 min-h-screen sidebar">
            {/* Sidebar content */}
            <ul className="lg:w-64">
                <li>
                    <Link href="/admin">Dashboard</Link>
                </li>
                <li>
                    <Link href="/home">Home</Link>
                </li>
                <li>
                    <Link href="/about">About</Link>
                </li>
                {/* Add more sidebar items */}
            </ul>
        </div>
    );
};

export default Sidebar;
