import React from "react";
import { usePage } from "@inertiajs/react";

const IndexPermission = () => {
    const { permissions } = usePage().props;

    return (
        <div>
            <h1>Permissions</h1>
            <ul>
                {permissions.map((permission) => (
                    <li key={permission.id}>{permission.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default IndexPermission;
