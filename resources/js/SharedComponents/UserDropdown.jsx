import { Link } from '@inertiajs/react';
import React, { useState } from 'react';

const UserDropdown = ({user}) => {
    console.log("from user dropdown", user);
    const [isEndHovered, setIsEndHovered] = useState(false);

    const handleEndMenuHover = () => {
        setIsEndHovered(true);
    };

    const handleEndMenuLeave = () => {
        setIsEndHovered(false);
    };

    return (
        <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
            onMouseEnter={handleEndMenuHover}
            onMouseLeave={handleEndMenuLeave}
        >
            <div className="w-10 rounded-full">
                <img
                    alt="Tailwind CSS Navbar component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
            </div>
            {isEndHovered && (
                <ul className="menu menu-sm dropdown-content absolute top-full right-0 z-[1] p-2 shadow bg-base-100 w-52">
                    {user? (
                        <>
                        <li>
                            <Link href={route("profile.edit")}>Profile</Link>
                        </li><li>
                                <Link href={route("logout")} method="post" as="button">
                                    Log Out
                                </Link>
                            </li>
                            </>
                    ):(

                    <><li><Link href={route("login")}>Log in</Link></li><li><Link href={route("register")}>Register</Link></li></>
                    )}  
                   
                                    

                </ul>
            )}
        </div>
    );
};

export default UserDropdown;