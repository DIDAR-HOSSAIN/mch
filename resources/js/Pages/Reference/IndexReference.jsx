import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Inertia } from "@inertiajs/inertia";

const IndexReference = ({ auth }) => {
    const { flash, references } = usePage().props;

     function destroy(e) {
         if (confirm("Are you sure you want to delete this Reference?")) {
             Inertia.delete(route("references.destroy", e.currentTarget.id));
         }
     }

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    Manage Reference
                </h1>
            }
        >
            <Head title="Manage Reference" />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-700">
                        Manage Reference
                    </h1>
                    <Link href="/references/create">
                        <button className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            Create Reference
                        </button>
                    </Link>
                </div>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        {references.length === 0 ? (
                            <div className="text-gray-600">
                                No references found.
                            </div>
                        ) : (
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <Link
                                        href="/references/create"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Add New Reference
                                    </Link>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white">
                                        <thead>
                                            <tr>
                                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-700">
                                                    Name
                                                </th>
                                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-700">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {references.map(
                                                ({ id, reference_name }) => (
                                                    <tr key={id}>
                                                        <td className="py-2 px-4 border-b border-gray-200">
                                                            {reference_name}
                                                        </td>
                                                        <td className="py-2 px-4 border-b border-gray-200">
                                                            <div className="space-x-2">
                                                                <Link
                                                                    href={route(
                                                                        "references.edit",
                                                                        id
                                                                    )}
                                                                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                                                                >
                                                                    Edit
                                                                </Link>

                                                                <button
                                                                    onClick={
                                                                        destroy
                                                                    }
                                                                    id={id}
                                                                    tabIndex="-1"
                                                                    type="button"
                                                                    className="mx-1 px-4 py-2 text-sm text-white bg-red-500 rounded"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default IndexReference;
