import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";

const CreateRole = ({ permissions }) => {
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        permissions: [],
    });

    useEffect(() => {
        setData("permissions", selectedPermissions);
    }, [selectedPermissions]);

    const handlePermissionChange = (permissionId) => {
        setSelectedPermissions((prevPermissions) => {
            const updatedPermissions = prevPermissions.includes(permissionId)
                ? prevPermissions.filter((id) => id !== permissionId)
                : [...prevPermissions, permissionId];
            console.log("Current permissions:", updatedPermissions);
            return updatedPermissions;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/roles");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Role Name</label>
                <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                />
                {errors.name && <div>{errors.name}</div>}
            </div>
            <div>
                <h3>Permissions</h3>
                {permissions.map((permission) => (
                    <div key={permission.id}>
                        <label>
                            <input
                                type="checkbox"
                                value={permission.id}
                                checked={
                                    Array.isArray(data.permissions) &&
                                    data.permissions.includes(permission.id)
                                }
                                onChange={() =>
                                    handlePermissionChange(permission.id)
                                }
                            />
                            {permission.name}
                        </label>
                    </div>
                ))}
            </div>
            <button type="submit" disabled={processing}>
                Create Role
            </button>
        </form>
    );
};

export default CreateRole;
