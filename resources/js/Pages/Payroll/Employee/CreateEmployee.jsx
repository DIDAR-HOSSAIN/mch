import React from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const CreateEmployee = ({ auth, rosters }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        employee_id: "",
        name: "",
        father_name: "",
        mother_name: "",
        date_of_birth: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        joining_date: "",
        designation: "",
        department: "",
        roster_id: "",
        employment_type: "",
        basic_salary: "",
        allowance: "",
        deduction: "",
        device_user_id: "",
        is_active: true,
        emergency_contact_name: "",
        emergency_contact_phone: "",
        emergency_contact_relation: "",
        nid_number: "",
        photo: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/employees", {
            onSuccess: () => reset(),
        });
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

            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
                <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
                    Employee Information
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div>
                        <label className="block font-medium">Employee ID</label>
                        <input
                            type="text"
                            value={data.employee_id}
                            onChange={(e) => setData("employee_id", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                        {errors.employee_id && <p className="text-red-500 text-sm">{errors.employee_id}</p>}
                    </div>

                    <div>
                        <label className="block font-medium">Full Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block font-medium">Father's Name</label>
                        <input
                            type="text"
                            value={data.father_name}
                            onChange={(e) => setData("father_name", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Mother's Name</label>
                        <input
                            type="text"
                            value={data.mother_name}
                            onChange={(e) => setData("mother_name", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Date of Birth</label>
                        <input
                            type="date"
                            value={data.date_of_birth}
                            onChange={(e) => setData("date_of_birth", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Gender</label>
                        <select
                            value={data.gender}
                            onChange={(e) => setData("gender", e.target.value)}
                            className="w-full border rounded p-2"
                        >
                            <option value="">Select</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium">Phone</label>
                        <input
                            type="text"
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block font-medium">Address</label>
                        <textarea
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            className="w-full border rounded p-2"
                        ></textarea>
                    </div>

                    {/* Job Info */}
                    <h3 className="text-lg font-semibold md:col-span-2 border-t pt-4">Job Information</h3>

                    <div>
                        <label className="block font-medium">Joining Date</label>
                        <input
                            type="date"
                            value={data.joining_date}
                            onChange={(e) => setData("joining_date", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Designation</label>
                        <input
                            type="text"
                            value={data.designation}
                            onChange={(e) => setData("designation", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Department</label>
                        <input
                            type="text"
                            value={data.department}
                            onChange={(e) => setData("department", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Roster</label>
                        <select
                            value={data.roster_id}
                            onChange={(e) => setData("roster_id", e.target.value)}
                            className="w-full border rounded p-2"
                        >
                            <option value="">Select Roster</option>
                            {rosters.map((r) => (
                                <option key={r.id} value={r.id}>
                                    {r.roster_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium">Employment Type</label>
                        <select
                            value={data.employment_type}
                            onChange={(e) => setData("employment_type", e.target.value)}
                            className="w-full border rounded p-2"
                        >
                            <option value="">Select</option>
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Contract</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium">Basic Salary</label>
                        <input
                            type="number"
                            value={data.basic_salary}
                            onChange={(e) => setData("basic_salary", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Allowance</label>
                        <input
                            type="number"
                            value={data.allowance}
                            onChange={(e) => setData("allowance", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Deduction</label>
                        <input
                            type="number"
                            value={data.deduction}
                            onChange={(e) => setData("deduction", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    {/* Device & Status */}
                    <div>
                        <label className="block font-medium">Device User ID</label>
                        <input
                            type="text"
                            value={data.device_user_id}
                            onChange={(e) => setData("device_user_id", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Status</label>
                        <select
                            value={data.is_active ? "1" : "0"}
                            onChange={(e) => setData("is_active", e.target.value === "1")}
                            className="w-full border rounded p-2"
                        >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>

                    {/* Emergency Contact */}
                    <h3 className="text-lg font-semibold md:col-span-2 border-t pt-4">Emergency Contact</h3>

                    <div>
                        <label className="block font-medium">Name</label>
                        <input
                            type="text"
                            value={data.emergency_contact_name}
                            onChange={(e) => setData("emergency_contact_name", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Phone</label>
                        <input
                            type="text"
                            value={data.emergency_contact_phone}
                            onChange={(e) => setData("emergency_contact_phone", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Relation</label>
                        <input
                            type="text"
                            value={data.emergency_contact_relation}
                            onChange={(e) => setData("emergency_contact_relation", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    {/* Document */}
                    <h3 className="text-lg font-semibold md:col-span-2 border-t pt-4">Documents</h3>

                    <div>
                        <label className="block font-medium">NID Number</label>
                        <input
                            type="text"
                            value={data.nid_number}
                            onChange={(e) => setData("nid_number", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Photo</label>
                        <input
                            type="file"
                            onChange={(e) => setData("photo", e.target.files[0])}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="md:col-span-2 flex justify-between items-center pt-4 border-t">
                        <Link href="/employees" className="text-gray-600">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
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
