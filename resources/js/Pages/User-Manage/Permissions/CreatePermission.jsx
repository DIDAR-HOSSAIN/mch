import React, { useState } from "react";
import { useForm } from "@inertiajs/inertia-react";

const CreatePermission = () => {
    const { data, setData, post } = useForm({
        name: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("permissions.store"));
    };

    return (
        <div>
            <h1>Create Permission</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Permission Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreatePermission;
