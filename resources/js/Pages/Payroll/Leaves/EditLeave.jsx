import React from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

export default function EditLeave({ auth, leave }) {
    const { data, setData, put, processing, errors } = useForm({
        employee_id: leave.employee_id || "",
        start_date: leave.start_date || "",
        end_date: leave.end_date || "",
        reason: leave.reason || "",
        status: leave.status || "Pending",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("leave.update", leave.id)); // ✅ Correct route name
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Leave
                </h1>
            }
        >
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
            <Head title="Edit Leave" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                Edit Leave
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Employee ID
                    </label>
                    <input
                        type="text"
                        value={data.employee_id}
                        onChange={(e) => setData("employee_id", e.target.value)}
                        className="w-full border-gray-300 rounded-lg"
                    />
                    {errors.employee_id && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.employee_id}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Leave Type
                    </label>
                    <input
                        type="text"
                        value={data.leave_type}
                        onChange={(e) => setData("leave_type", e.target.value)}
                        className="w-full border-gray-300 rounded-lg"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Start Date
                        </label>
                        <input
                            type="date"
                            value={data.start_date}
                            onChange={(e) => setData("start_date", e.target.value)}
                            className="w-full border-gray-300 rounded-lg"
                        />
                        {errors.start_date && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.start_date}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            End Date
                        </label>
                        <input
                            type="date"
                            value={data.end_date}
                            onChange={(e) => setData("end_date", e.target.value)}
                            className="w-full border-gray-300 rounded-lg"
                        />
                        {errors.end_date && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.end_date}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Reason
                    </label>
                    <textarea
                        value={data.reason}
                        onChange={(e) => setData("reason", e.target.value)}
                        className="w-full border-gray-300 rounded-lg"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Status
                    </label>
                    <select
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                        className="w-full border-gray-300 rounded-lg"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                    {errors.status && (
                        <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                    )}
                </div>

                <div className="flex justify-between mt-6">
                    <Link
                        href={route("leave.index")}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                    >
                        Back
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        {processing ? "Updating..." : "Update Leave"}
                    </button>
                </div>
            </form>
        </div>
        </AdminDashboardLayout>
    );
}
