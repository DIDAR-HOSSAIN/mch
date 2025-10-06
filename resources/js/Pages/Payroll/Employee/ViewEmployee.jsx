import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";

const ViewEmployee = () => {
    const { employees, flash } = usePage().props;
    console.log('employee index', employees);

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
        <div className="max-w-5xl mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Employees</h1>
                <Link
                    href="/employees/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Add Employee
                </Link>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">#</th>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Employee ID</th>
                            <th className="p-2 border">Device ID</th>
                            <th className="p-2 border">Roster</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp, index) => (
                            <tr key={emp.id} className="text-center">
                                <td className="border p-2">{index + 1}</td>
                                <td className="border p-2">{emp.name}</td>
                                <td className="border p-2">{emp.employee_id}</td>
                                <td className="border p-2">{emp.device_user_id}</td>
                                <td className="border p-2"> {emp.roster ? emp.roster.roster_name : "N/A"}</td>
                                <td className="border p-2 space-x-2">
                                    <Link
                                        href={`/employees/${emp.id}/edit`}
                                        className="text-blue-500"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(emp.id)}
                                        className="text-red-500"
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

export default ViewEmployee;
