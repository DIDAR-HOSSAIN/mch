import React from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const CreateEmployee = ({ auth, rosters }) => {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        employee_id: "",
        device_user_id: "",
        roster_id: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/employees");
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    Add Employee
                </h1>
            }
        >
            <Head title="Add Employee" />
        <div className="max-w-lg mx-auto bg-white shadow p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Add Employee</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Employee ID</label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded"
                        value={data.employee_id}
                        onChange={(e) => setData("employee_id", e.target.value)}
                    />
                    {errors.employee_id && <p className="text-red-500 text-sm">{errors.employee_id}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Device User ID</label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded"
                        value={data.device_user_id}
                        onChange={(e) => setData("device_user_id", e.target.value)}
                    />
                    {errors.device_user_id && <p className="text-red-500 text-sm">{errors.device_user_id}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Roster</label>
                    <select
                        className="w-full border p-2 rounded"
                        value={data.roster_id}
                        onChange={(e) => setData("roster_id", e.target.value)}
                    >
                        <option value="">Select Roster</option>
                        {rosters.map((r) => (
                            <option key={r.id} value={r.id}>
                                {r.roster_name}
                            </option>
                        ))}
                    </select>
                    {errors.roster_id && <p className="text-red-500 text-sm">{errors.roster_id}</p>}
                </div>

                <div className="flex justify-between items-center">
                    <Link href="/employees" className="text-gray-600">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    </AdminDashboardLayout>
    );
};

export default CreateEmployee;
