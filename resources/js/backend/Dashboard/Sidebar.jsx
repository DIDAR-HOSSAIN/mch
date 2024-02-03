import React from "react";
import { Link } from "@inertiajs/react";
import "./../../../css/sidebar.css"; // Import your CSS file
import logo from "@/assets/images/Logo/logo-transparent.png";
import SidebarMenu from "./SidebarMenu";

const Sidebar = () => {
    return (
        <div className="bg-gray-300 min-h-screen p-2">
            {/* Sidebar content */}
            <ul className="lg:w-64">
                <li>
                    <Link href={"/dashboard"}>
                        <img className="h-24" src={logo} alt="" />
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard">Dashboard</Link>
                </li>
                {/* Add more sidebar items */}
            </ul>
            <SidebarMenu />
        </div>
    );
};

export default Sidebar;
