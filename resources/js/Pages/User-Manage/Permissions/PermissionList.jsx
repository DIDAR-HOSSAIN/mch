import React from "react";
import { Head, useForm, usePage, Link } from "@inertiajs/react";
import Swal from "sweetalert2";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { hasRole } from "@/backend/Utils/RoleCheck";

const PermissionList = ({ auth }) => {
    const { permissions } = usePage().props;

    // ===== Form State =====
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("permissions.store"), {
            onSuccess: () => reset(),
        });
    };

    // ===== Delete Permission =====
    const destroy = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This permission will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(route("permissions.destroy", { id }), {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Permission deleted successfully.",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false,
                        });
                    },
                });
            }
        });
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    Manage Permissions
                </h1>
            }
        >
            <Head title="Manage Permissions" />

            <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* ===== Create Permission Card ===== */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                            Create Permission
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Permission Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    placeholder="Enter permission name"
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                />
                                {errors.name && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.name}
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                {processing ? "Creating..." : "Create"}
                            </button>
                        </form>
                    </div>

                    {/* ===== Permission List ===== */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Permission List
                            </h2>
                            {hasRole(auth.user, "super-admin") && (
                                <Link href="/roles/create">
                                    <button className="bg-green-600 text-white py-2 px-5 rounded-lg hover:bg-green-700 transition">
                                        Create Role
                                    </button>
                                </Link>
                            )}
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
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
                                    {permissions?.length > 0 ? (
                                        permissions.map((permission) => (
                                            <tr
                                                key={permission.id}
                                                className="hover:bg-gray-50 transition"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {permission.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <div className="flex flex-wrap gap-2">
                                                        <Link
                                                            href={`/permissions/${permission.id}`}
                                                            className="text-blue-600 hover:text-blue-900 font-medium"
                                                        >
                                                            Show
                                                        </Link>
                                                        <Link
                                                            href={`/permissions/${permission.id}/edit`}
                                                            className="text-green-600 hover:text-green-900 font-medium"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                destroy(
                                                                    permission.id
                                                                )
                                                            }
                                                            className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-sm transition"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="2"
                                                className="text-center py-6 text-gray-500"
                                            >
                                                No permissions found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default PermissionList;
