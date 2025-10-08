import React from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const EditEmployee = ({ auth, employee, rosters }) => {
    const { data, setData, put, processing, errors } = useForm({
        name: employee.name || "",
        employee_id: employee.employee_id || "",
        device_user_id: employee.device_user_id || "",
        roster_id: employee.roster_id || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/employees/${employee.id}`);
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Employee
                </h1>
            }
        >
            <Head title="Edit Employee" />
        <div className="max-w-lg mx-auto bg-white shadow p-6 rounded-lg mt-6">
            <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                {/* Employee ID */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded"
                        value={data.employee_id}
                        onChange={(e) => setData("employee_id", e.target.value)}
                    />
                    {errors.employee_id && (
                        <p className="text-red-500 text-sm">{errors.employee_id}</p>
                    )}
                </div>

                {/* Device User ID */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Device User ID</label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded"
                        value={data.device_user_id}
                        onChange={(e) => setData("device_user_id", e.target.value)}
                    />
                    {errors.device_user_id && (
                        <p className="text-red-500 text-sm">{errors.device_user_id}</p>
                    )}
                </div>

                {/* Roster */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Roster</label>
                    <select
                        className="w-full border p-2 rounded"
                        value={data.roster_id || ""}
                        onChange={(e) => setData("roster_id", e.target.value)}
                    >
                        <option value="">Select Roster</option>
                        {rosters.map((r) => (
                            <option key={r.id} value={r.id}>
                                {r.roster_name}
                            </option>
                        ))}
                    </select>
                    {errors.roster_id && (
                        <p className="text-red-500 text-sm">{errors.roster_id}</p>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center mt-4">
                    <Link
                        href="/employees"
                        className="text-gray-600 hover:text-gray-900"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    </AdminDashboardLayout>
    );
};

export default EditEmployee;
