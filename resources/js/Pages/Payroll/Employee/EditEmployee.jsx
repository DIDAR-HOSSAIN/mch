import React from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const EditEmployee = ({ auth, employee, rosters }) => {
    const { data, setData, put, processing, errors } = useForm({
        employee_id: employee.employee_id || "",
        name: employee.name || "",
        father_name: employee.father_name || "",
        mother_name: employee.mother_name || "",
        date_of_birth: employee.date_of_birth || "",
        gender: employee.gender || "",
        phone: employee.phone || "",
        email: employee.email || "",
        address: employee.address || "",
        joining_date: employee.joining_date || "",
        designation: employee.designation || "",
        department: employee.department || "",
        roster_id: employee.roster_id || "",
        employment_type: employee.employment_type || "",
        basic_salary: employee.basic_salary || "",
        allowance: employee.allowance || "",
        deduction: employee.deduction || "",
        device_user_id: employee.device_user_id || "",
        is_active: employee.is_active ? true : false,
        emergency_contact_name: employee.emergency_contact_name || "",
        emergency_contact_phone: employee.emergency_contact_phone || "",
        emergency_contact_relation: employee.emergency_contact_relation || "",
        nid_number: employee.nid_number || "",
        photo: null,
    });

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     put(route("employees.update", employee.id), {
    //         forceFormData: true,
    //     });
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/employees/${employee.id}`);
    };


    return (
        <AdminDashboardLayout
            user={auth.user}
            header={<h1 className="font-semibold text-xl text-gray-800 leading-tight">Edit Employee</h1>}
        >
            <Head title="Edit Employee" />

            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">Edit Employee Information</h2>

                <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full border p-2 rounded" />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    {/* Employee ID */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Employee ID</label>
                        <input type="text" value={data.employee_id} onChange={e => setData('employee_id', e.target.value)} className="w-full border p-2 rounded" />
                        {errors.employee_id && <p className="text-red-500 text-sm">{errors.employee_id}</p>}
                    </div>

                    {/* Father Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Father's Name</label>
                        <input type="text" value={data.father_name} onChange={e => setData('father_name', e.target.value)} className="w-full border p-2 rounded" />
                    </div>

                    {/* Mother Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Mother's Name</label>
                        <input type="text" value={data.mother_name} onChange={e => setData('mother_name', e.target.value)} className="w-full border p-2 rounded" />
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Date of Birth</label>
                        <input type="date" value={data.date_of_birth} onChange={e => setData('date_of_birth', e.target.value)} className="w-full border p-2 rounded" />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Gender</label>
                        <select value={data.gender} onChange={e => setData('gender', e.target.value)} className="w-full border p-2 rounded">
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Phone</label>
                        <input type="text" value={data.phone} onChange={e => setData('phone', e.target.value)} className="w-full border p-2 rounded" />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full border p-2 rounded" />
                    </div>

                    {/* Joining Date */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Joining Date</label>
                        <input type="date" value={data.joining_date} onChange={e => setData('joining_date', e.target.value)} className="w-full border p-2 rounded" />
                    </div>

                    {/* Department */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Department</label>
                        <input type="text" value={data.department} onChange={e => setData('department', e.target.value)} className="w-full border p-2 rounded" />
                    </div>

                    {/* Designation */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Designation</label>
                        <input type="text" value={data.designation} onChange={e => setData('designation', e.target.value)} className="w-full border p-2 rounded" />
                    </div>

                    {/* Roster */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Roster</label>
                        <select value={data.roster_id || ""} onChange={e => setData('roster_id', e.target.value)} className="w-full border p-2 rounded">
                            <option value="">Select Roster</option>
                            {rosters.map(r => (
                                <option key={r.id} value={r.id}>{r.roster_name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Employment Type */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Employment Type</label>
                        <select value={data.employment_type} onChange={e => setData('employment_type', e.target.value)} className="w-full border p-2 rounded">
                            <option value="">Select Type</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                        </select>
                    </div>

                    {/* Basic Salary */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Basic Salary</label>
                        <input type="number" step="0.01" value={data.basic_salary} onChange={e => setData('basic_salary', e.target.value)} className="w-full border p-2 rounded" />
                    </div>

                    {/* Allowance */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Allowance</label>
                        <input type="number" step="0.01" value={data.allowance} onChange={e => setData('allowance', e.target.value)} className="w-full border p-2 rounded" />
                    </div>

                    {/* Deduction */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Deduction</label>
                        <input type="number" step="0.01" value={data.deduction} onChange={e => setData('deduction', e.target.value)} className="w-full border p-2 rounded" />
                    </div>

                    {/* Device User ID */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Device User ID</label>
                        <input type="text" value={data.device_user_id} onChange={e => setData('device_user_id', e.target.value)} className="w-full border p-2 rounded" />
                    </div>

                    {/* Active Status */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select value={data.is_active ? "1" : "0"} onChange={e => setData('is_active', e.target.value === "1")} className="w-full border p-2 rounded">
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>

                    {/* Emergency Contact */}
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Emergency Contact Name</label>
                            <input type="text" value={data.emergency_contact_name} onChange={e => setData('emergency_contact_name', e.target.value)} className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Phone</label>
                            <input type="text" value={data.emergency_contact_phone} onChange={e => setData('emergency_contact_phone', e.target.value)} className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Relation</label>
                            <input type="text" value={data.emergency_contact_relation} onChange={e => setData('emergency_contact_relation', e.target.value)} className="w-full border p-2 rounded" />
                        </div>
                    </div>

                    {/* NID */}
                    <div>
                        <label className="block text-sm font-medium mb-1">NID Number</label>
                        <input type="text" value={data.nid_number} onChange={e => setData('nid_number', e.target.value)} className="w-full border p-2 rounded" />
                    </div>

                    {/* Photo */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Photo</label>
                        <input type="file" onChange={e => setData('photo', e.target.files[0])} className="w-full border p-2 rounded" />
                        {employee.photo && (
                            <img src={`/storage/${employee.photo}`} alt="Employee" className="w-24 h-24 object-cover rounded-full mt-2" />
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="md:col-span-2 flex justify-between items-center mt-6">
                        <Link href="/employees" className="text-gray-600 hover:text-gray-900">
                            Cancel
                        </Link>
                        <button type="submit" disabled={processing} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                            Update Employee
                        </button>
                    </div>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default EditEmployee;
