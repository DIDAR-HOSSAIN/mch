import React, { useState } from "react";
import { Head, useForm, Link, router } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import Swal from "sweetalert2";


export default function EditEmployee({ auth, employee, rosters }) {
    const { data, setData, processing, errors } = useForm({
        name: employee.name || "",
        employee_id: employee.employee_id || "",
        device_user_id: employee.device_user_id || "",
        roster_id: employee.roster_id || "",
        designation: employee.designation || "",
        department: employee.department || "",
        joining_date: employee.joining_date || "",
        salary: employee.salary || "",
        phone: employee.phone || "",
        email: employee.email || "",
        address: employee.address || "",
        nid_no: employee.nid_no || "",
        photo: null,
    });

    const [preview, setPreview] = useState(employee.photo_url || null);

    // ✅ Photo Preview
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("photo", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // ✅ Submit Handler
    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Are you sure?",
            text: "You want to update this employee’s information?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Update",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#6b7280",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(
                    `/employees/${employee.id}`,
                    {
                        _method: "PUT",
                        ...data,
                    },
                    {
                        forceFormData: true,
                        onSuccess: () => {
                            MySwal.fire({
                                title: "Updated!",
                                text: "Employee updated successfully.",
                                icon: "success",
                                confirmButtonColor: "#2563eb",
                            });
                        },
                        onError: () => {
                            MySwal.fire({
                                title: "Error!",
                                text: "Something went wrong while updating.",
                                icon: "error",
                                confirmButtonColor: "#dc2626",
                            });
                        },
                    }
                );
            }
        });
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={<h1 className="font-semibold text-xl text-gray-800">Edit Employee</h1>}
        >
            <Head title="Edit Employee" />

            <div className="max-w-5xl mx-auto bg-white shadow p-6 rounded-lg mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* === Basic Information === */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold">Full Name *</label>
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
                            <label className="block text-sm font-semibold">Employee ID *</label>
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
                            <label className="block text-sm font-semibold">Device User ID *</label>
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
                            <label className="block text-sm font-semibold">Roster *</label>
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
                            {errors.roster_id && (
                                <p className="text-red-500 text-sm">{errors.roster_id}</p>
                            )}
                        </div>
                    </div>

                    {/* === Job Details === */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold">Designation *</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                value={data.designation}
                                onChange={(e) => setData("designation", e.target.value)}
                            />
                            {errors.designation && (
                                <p className="text-red-500 text-sm">{errors.designation}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold">Department</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                value={data.department}
                                onChange={(e) => setData("department", e.target.value)}
                            />
                            {errors.department && (
                                <p className="text-red-500 text-sm">{errors.department}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold">Joining Date *</label>
                            <input
                                type="date"
                                className="w-full border p-2 rounded"
                                value={data.joining_date}
                                onChange={(e) => setData("joining_date", e.target.value)}
                            />
                            {errors.joining_date && (
                                <p className="text-red-500 text-sm">{errors.joining_date}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold">Salary</label>
                            <input
                                type="number"
                                min="0"
                                className="w-full border p-2 rounded"
                                value={data.salary}
                                onChange={(e) => setData("salary", e.target.value)}
                            />
                            {errors.salary && (
                                <p className="text-red-500 text-sm">{errors.salary}</p>
                            )}
                        </div>
                    </div>

                    {/* === Contact Info === */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold">Phone *</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                value={data.phone}
                                onChange={(e) => setData("phone", e.target.value)}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm">{errors.phone}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold">Email</label>
                            <input
                                type="email"
                                className="w-full border p-2 rounded"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email}</p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold">Address</label>
                            <textarea
                                className="w-full border p-2 rounded"
                                rows="2"
                                value={data.address}
                                onChange={(e) => setData("address", e.target.value)}
                            ></textarea>
                            {errors.address && (
                                <p className="text-red-500 text-sm">{errors.address}</p>
                            )}
                        </div>
                    </div>

                    {/* === NID & Photo === */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold">NID No</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                value={data.nid_no}
                                onChange={(e) => setData("nid_no", e.target.value)}
                            />
                            {errors.nid_no && (
                                <p className="text-red-500 text-sm">{errors.nid_no}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold">Photo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                            />
                            {errors.photo && (
                                <p className="text-red-500 text-sm">{errors.photo}</p>
                            )}
                        </div>
                    </div>

                    {preview && (
                        <div className="mt-2">
                            <img
                                src={preview}
                                alt="Employee"
                                className="w-28 h-28 object-cover rounded border"
                            />
                        </div>
                    )}

                    {/* === Buttons === */}
                    <div className="flex justify-between items-center">
                        <Link href="/employees" className="text-gray-600 hover:underline">
                            ← Back to List
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-70"
                        >
                            {processing ? "Saving..." : "Update Employee"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminDashboardLayout>
    );
}
