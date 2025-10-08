import React from "react";
import { Link, usePage, router, Head } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const EmployeeList = ({ auth, employees }) => {
    const { flash } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this employee?")) {
            router.delete(`/employees/${id}`);
        }
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-gray-800">Employee List</h2>}
        >
            <Head title="Employees" />
            <div className="max-w-7xl mx-auto bg-white shadow rounded-lg p-6">
                {flash?.success && (
                    <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
                        {flash.success}
                    </div>
                )}

                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">All Employees</h3>
                    <Link
                        href="/employees/create"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        + Add Employee
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full border">
                        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                            <tr>
                                <th className="border px-3 py-2 text-left">#</th>
                                <th className="border px-3 py-2 text-left">Name</th>
                                <th className="border px-3 py-2 text-left">Employee ID</th>
                                <th className="border px-3 py-2 text-left">Designation</th>
                                <th className="border px-3 py-2 text-left">Phone</th>
                                <th className="border px-3 py-2 text-left">Status</th>
                                <th className="border px-3 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees?.length > 0 ? (
                                employees.map((emp, index) => (
                                    <tr key={emp.id} className="hover:bg-gray-50 text-sm">
                                        <td className="border px-3 py-2">{index + 1}</td>
                                        <td className="border px-3 py-2">{emp.name}</td>
                                        <td className="border px-3 py-2">{emp.employee_id}</td>
                                        <td className="border px-3 py-2">{emp.designation ?? "-"}</td>
                                        <td className="border px-3 py-2">{emp.phone ?? "-"}</td>
                                        <td className="border px-3 py-2">
                                            {emp.is_active ? (
                                                <span className="text-green-600 font-medium">Active</span>
                                            ) : (
                                                <span className="text-red-600 font-medium">Inactive</span>
                                            )}
                                        </td>
                                        <td className="border px-3 py-2 text-center">
                                            <div className="flex justify-center space-x-2">
                                                <Link
                                                    href={`/employees/${emp.id}/edit`}
                                                    className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-xs"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(emp.id)}
                                                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-4 text-gray-500">
                                        No employees found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-end mt-4 space-x-2">
                    {employees?.links?.map((link, i) => (
                        <button
                            key={i}
                            disabled={!link.url}
                            onClick={() => router.visit(link.url)}
                            className={`px-3 py-1 text-sm rounded ${link.active
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                        >
                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                        </button>
                    ))}
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default EmployeeList;
