import React, { useState } from "react";
import { Link, usePage, router, Head } from "@inertiajs/react";
import Swal from "sweetalert2";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const ViewEmployee = ({ auth, filters = {} }) => {
    const { employees, flash } = usePage().props;
    console.log('employee index', employees);
    const [search, setSearch] = useState(filters.search || "");

    // 🔍 সার্চ হ্যান্ডলার
    const handleSearch = (e) => {
        e.preventDefault();
        router.get("/employees", { search }, { preserveState: true });
    };


    if (flash?.success) {
        Swal.fire({
            icon: "success",
            title: flash.success,
            showConfirmButton: false,
            timer: 2000,
        });
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/employees/${id}`);
            }
        });
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    Employee List
                </h1>
            }
        >
            <Head title="Employees" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                    {/* Search */}
                    <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search by name or ID..."
                            className="border rounded px-3 py-2 w-full sm:w-64"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Search
                        </button>
                    </form>

                    {/* Add Employee Button */}
                    <Link
                        href="/employees/create"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        + Add Employee
                    </Link>
                </div>

                {/* Employee Table */}
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">#</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Employee ID</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Roster</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Department</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Phone</th>
                                <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {employees.data.length > 0 ? (
                                employees.data.map((emp, index) => (
                                    <tr key={emp.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 text-sm text-gray-600">
                                            {employees.from + index}
                                        </td>
                                        <td className="px-4 py-2 text-sm font-medium text-gray-800">
                                            {emp.name}
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700">
                                            {emp.employee_id}
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700">
                                            {emp.roster?.roster_name || "-"}
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700">
                                            {emp.department || "-"}
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700">
                                            {emp.phone || "-"}
                                        </td>
                                        <td className="px-4 py-2 text-right space-x-2">
                                            <Link
                                                href={`/employees/${emp.id}/edit`}
                                                className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(emp.id)}
                                                className="text-red-600 hover:text-red-800 text-sm font-semibold"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="text-center text-gray-500 py-4 text-sm"
                                    >
                                        No employees found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-600">
                        Showing {employees.from || 0} - {employees.to || 0} of {employees.total} employees
                    </p>
                    <div className="flex gap-2">
                        {employees.links.map((link, i) => (
                            <button
                                key={i}
                                disabled={!link.url}
                                onClick={() => link.url && router.visit(link.url)}
                                className={`px-3 py-1 rounded text-sm ${link.active
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default ViewEmployee;
