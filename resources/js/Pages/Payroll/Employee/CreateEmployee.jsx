import React from "react";
import { useForm, Link, Head, usePage } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const CreateEmployee = ({ auth, rosters }) => {
    const { message, errors } = usePage().props;
    const { data, setData, post, processing, reset } = useForm({
        name: "",
        employee_id: "",
        device_user_id: "",
        roster_id: "",
        designation: "",
        department: "",
        joining_date: "",
        salary: "",
        phone: "",
        email: "",
        address: "",
        nid_no: "",
        photo: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/employees", { onSuccess: () => reset() });
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={<h1 className="font-semibold text-xl text-gray-800 leading-tight">Add Employee</h1>}
        >
            <Head title="Add Employee" />
            <div className="max-w-5xl mx-auto bg-white shadow-lg border border-gray-200 rounded-xl p-6 mt-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Employee Information</h2>

                {/* Success Message */}
                {message && (
                    <div className="bg-teal-100 border-t-4 border-teal-500 text-teal-900 px-4 py-3 my-3">
                        <p>{message}</p>
                    </div>
                )}

                {/* Error Messages */}
                {Object.keys(errors).length > 0 && (
                    <div className="bg-red-100 border-t-4 border-red-500 text-red-900 px-4 py-3 my-3">
                        <ul>
                            {Object.keys(errors).map((field, index) => (
                                <li key={index}>{errors[field]}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div>
                        <h3 className="text-lg font-semibold text-blue-600 mb-3 border-b pb-1">
                            Personal Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name<span className="text-red-600">*</span></label>
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">NID Number</label>
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded"
                                    value={data.nid_no}
                                    onChange={(e) => setData("nid_no", e.target.value)}
                                />
                                {errors.nid_no && <p className="text-red-500 text-sm">{errors.nid_no}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    className="w-full border p-2 rounded"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone<span className="text-red-600">*</span></label>
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded"
                                    value={data.phone}
                                    onChange={(e) => setData("phone", e.target.value)}
                                />
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Address<span className="text-red-600">*</span></label>
                                <textarea
                                    className="w-full border p-2 rounded"
                                    rows="2"
                                    value={data.address}
                                    onChange={(e) => setData("address", e.target.value)}
                                />
                                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Job Information */}
                    <div>
                        <h3 className="text-lg font-semibold text-blue-600 mb-3 border-b pb-1">
                            Job Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Employee ID<span className="text-red-600">*</span></label>
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded"
                                    value={data.employee_id}
                                    onChange={(e) => setData("employee_id", e.target.value)}
                                />
                                {errors.employee_id && <p className="text-red-500 text-sm">{errors.employee_id}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Device User ID<span className="text-red-600">*</span></label>
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded"
                                    value={data.device_user_id}
                                    onChange={(e) => setData("device_user_id", e.target.value)}
                                />
                                {errors.device_user_id && <p className="text-red-500 text-sm">{errors.device_user_id}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Designation<span className="text-red-600">*</span></label>
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded"
                                    value={data.designation}
                                    onChange={(e) => setData("designation", e.target.value)}
                                />
                                {errors.designation && <p className="text-red-500 text-sm">{errors.designation}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Department</label>
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded"
                                    value={data.department}
                                    onChange={(e) => setData("department", e.target.value)}
                                />
                                {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Joining Date<span className="text-red-600">*</span></label>
                                <input
                                    type="date"
                                    className="w-full border p-2 rounded"
                                    value={data.joining_date}
                                    onChange={(e) => setData("joining_date", e.target.value)}
                                />
                                {errors.joining_date && <p className="text-red-500 text-sm">{errors.joining_date}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Salary</label>
                                <input
                                    type="number"
                                    className="w-full border p-2 rounded"
                                    value={data.salary}
                                    onChange={(e) => setData("salary", e.target.value)}
                                />
                                {errors.salary && <p className="text-red-500 text-sm">{errors.salary}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Roster<span className="text-red-600">*</span></label>
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
                                {errors.roster_name && <p className="text-red-500 text-sm">{errors.roster_name}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Document Upload */}
                    <div>
                        <h3 className="text-lg font-semibold text-blue-600 mb-3 border-b pb-1">
                            Document & Photo
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="w-full border p-2 rounded"
                                    onChange={(e) => setData("photo", e.target.files[0])}
                                />
                                {errors.photo && <p className="text-red-500 text-sm">{errors.photo}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between items-center border-t pt-4">
                        <Link href="/employees" className="text-gray-600 hover:text-gray-800">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                        >
                            {processing ? "Saving..." : "Save Employee"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default CreateEmployee;
