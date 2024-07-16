import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia-react";

const PermissionList = () => {
    const { permissions } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this permission?")) {
            Inertia.delete(route("permissions.destroy", id))
                .then(() => {
                    console.log("Permission deleted successfully");
                    // Optionally, perform actions after successful deletion
                })
                .catch((error) => {
                    console.error("Error deleting permission:", error);
                    // Handle errors if deletion fails
                });
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-700">
                    Permissions
                </h1>
                <Link href="/permissions/create">
                    <button className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Create Permission
                    </button>
                </Link>
            </div>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {permissions?.map((permission) => (
                            <tr key={permission.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {permission.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <Link
                                        href={`/permissions/${permission.id}`}
                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                    >
                                        Show
                                    </Link>
                                    <Link
                                        href={`/permissions/${permission.id}/edit`}
                                        className="text-green-600 hover:text-green-900 mr-4"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() =>
                                            handleDelete(permission.id)
                                        }
                                        className="text-red-500 hover:underline"
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

export default PermissionList;
