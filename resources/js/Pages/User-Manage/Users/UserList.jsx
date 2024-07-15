import React from "react";
import { Link, usePage } from "@inertiajs/react";

const UserList = () => {
    const { users } = usePage().props;

    return (
        <div>
            <h1>Users</h1>
            <Link href="/users/create">Create New User</Link>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Roles</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.data.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                {Array.isArray(user.roles)
                                    ? user.roles
                                          .map((role) => role.name)
                                          .join(", ")
                                    : "No roles assigned"}
                            </td>
                            <td>
                                <Link href={`/users/${user.id}/edit`}>
                                    Edit
                                </Link>
                                <button onClick={() => handleDelete(user.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
