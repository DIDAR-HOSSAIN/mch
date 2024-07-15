import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

const CreateUser = ({ roles }) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        roles: [],
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleRolesChange = (e) => {
        const selectedRoles = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setForm({
            ...form,
            roles: selectedRoles,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post("/users", form);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Confirm Password</label>
                <input
                    type="password"
                    name="password_confirmation"
                    value={form.password_confirmation}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Roles</label>
                <select
                    multiple
                    name="roles"
                    value={form.roles}
                    onChange={handleRolesChange}
                    required
                >
                    {roles.map((role) => (
                        <option key={role.id} value={role.name}>
                            {role.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Create User</button>
        </form>
    );
};

export default CreateUser;
