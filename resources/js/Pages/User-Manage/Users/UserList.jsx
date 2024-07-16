import React from "react";
import { Link, usePage } from "@inertiajs/react";

const UserList = () => {
    const { users } = usePage().props;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Users</h1>
                <Link
                    href="/users/create"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200"
                >
                    Create New User
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Roles</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.data.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">
                                    {user.name}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {user.email}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {Array.isArray(user.roles)
                                        ? user.roles
                                              .map((role) => role.name)
                                              .join(", ")
                                        : "No roles assigned"}
                                </td>
                                <td className="py-2 px-4 border-b flex space-x-2">
                                    <Link
                                        href={`/users/${user.id}/edit`}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition duration-200"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition duration-200"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
