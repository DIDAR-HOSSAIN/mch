import React from "react";
import { Inertia } from "@inertiajs/inertia";

const EditUser = ({ users, roles, userRoles }) => {
    const { data, setData, put, processing, errors } = useForm({
        _method: "put",
        name: role.name,
        permissions: role.permissions.map((p) => p.id),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("users.update", user.id), {
            onSuccess: () => {
                // Handle success (optional)
                Inertia.reload();
            },
        });
    };

    // const handleRolesChange = (e) => {
    //     const selectedRoles = Array.from(
    //         e.target.selectedOptions,
    //         (option) => option.value
    //     );
    //     setForm({
    //         ...form,
    //         roles: selectedRoles,
    //     });
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     Inertia.post("/users", form);
    // };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-8 text-center">
                Update User
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col">
                    <label className="mb-2 text-lg font-semibold">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2 text-lg font-semibold">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2 text-lg font-semibold">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2 text-lg font-semibold">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="password_confirmation"
                        value={form.password_confirmation}
                        onChange={handleChange}
                        required
                        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2 text-lg font-semibold">Roles</label>
                    <select
                        multiple
                        name="roles"
                        value={form.roles}
                        onChange={handleRolesChange}
                        required
                        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    >
                        {roles.map((role) => (
                            <option key={role.id} value={role.name}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                >
                    Update User
                </button>
            </form>
        </div>
    );
};

export default EditUser;