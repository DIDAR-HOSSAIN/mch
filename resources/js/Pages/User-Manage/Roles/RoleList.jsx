import React from "react";
import { Link, usePage } from "@inertiajs/react";

const RolesIndex = () => {
    const { roles } = usePage().props;
    return (
        <div>
            <h1>Roles</h1>
            <Link href="/roles/create">
                <button>Create Role</button>
            </Link>
            <ul>
                {roles.map((role) => (
                    <li key={role.id}>{role.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default RolesIndex;
