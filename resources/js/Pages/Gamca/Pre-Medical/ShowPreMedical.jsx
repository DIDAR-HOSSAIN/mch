import React from "react";
import { Head, Link } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const ShowPreMedical = ({ auth, preMedical }) => {
    
    const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={<h1 className="font-semibold text-xl text-gray-800">Passenger Details</h1>}
        >
            <Head title="Passenger Details" />
        <div className="max-w-6xl mx-auto mt-10 p-6">
            <Head title={`Pre-Medical: ${preMedical.first_name} ${preMedical.last_name}`} />

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Pre-Medical Details</h1>
                <Link
                    href={route("pre-medical.index")}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                >
                    ← Back to List
                </Link>
            </div>

            {/* Top Card: Personal Info + Photo */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6 hover:shadow-xl transition-shadow duration-300">
                {/* Photo */}
                {preMedical.photo && (
                    <img
                        src={`/images/passengers/${preMedical.photo}`}
                        alt="Pre Medical"
                        className="w-48 h-56 object-cover rounded-lg border"
                    />
                )}

                {/* Personal Info */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                    <div>
                        <span className="font-semibold text-gray-800">First Name:</span> {preMedical.first_name}
                    </div>
                    <div>
                        <span className="font-semibold text-gray-800">Last Name:</span> {preMedical.last_name}
                    </div>
                    <div>
                        <span className="font-semibold text-gray-800">Father's Name:</span> {preMedical.father_name}
                    </div>
                    <div>
                        <span className="font-semibold text-gray-800">Mother's Name:</span> {preMedical.mother_name}
                    </div>
                    <div>
                        <span className="font-semibold text-gray-800">Date of Birth:</span> {preMedical.date_of_birth}
                    </div>
                    <div>
                        <span className="font-semibold text-gray-800">Sex:</span> {preMedical.sex}
                    </div>
                    <div>
                        <span className="font-semibold text-gray-800">Nationality:</span> {preMedical.nationality}
                    </div>
                    <div>
                        <span className="font-semibold text-gray-800">Religion:</span> {preMedical.religion}
                    </div>
                    <div>
                            <span className="font-semibold text-gray-800">Reg Date:</span> {formatDate(preMedical.entry_date)}
                    </div>
                    <div>
                            <span className="font-semibold text-gray-800">Profession:</span> {preMedical.profession}
                    </div>
                </div>
            </div>

            {/* Cards Grid: Passport, GCC, Report & Payment */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {/* Passport Info */}
                <div className="bg-white shadow-lg rounded-lg p-5 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">Passport Info</h2>
                    <p><span className="font-medium">Passport No:</span> {preMedical.passport_no}</p>
                    <p><span className="font-medium">Date of Issue:</span> {preMedical.date_of_issue}</p>
                    <p><span className="font-medium">Place of Issue:</span> {preMedical.place_of_issue}</p>
                    <p><span className="font-medium">Validity:</span> {preMedical.passport_validity ? "✅ Valid" : "❌ Invalid"}</p>
                </div>

                {/* GCC Info */}
                <div className="bg-white shadow-lg rounded-lg p-5 border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">GCC Info</h2>
                    <p><span className="font-medium">GCC Slip No:</span> {preMedical.gcc_slip_no}</p>
                    <p><span className="font-medium">GCC Slip Date:</span> {preMedical.gcc_slip_date}</p>
                    <p><span className="font-medium">Expire Days:</span> {preMedical.expire_days}</p>
                </div>

                {/* Report & Payment */}
                <div className="bg-white shadow-lg rounded-lg p-5 border-l-4 border-yellow-500 hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">Report & Payment</h2>
                    <p><span className="font-medium">Report Date:</span> {preMedical.report_date}</p>
                    <p><span className="font-medium">Report After Days:</span> {preMedical.report_after_days}</p>
                    <p><span className="font-medium">Amount:</span> ${preMedical.amount}</p>
                    <p><span className="font-medium">Discount:</span> {preMedical.discount}</p>
                    <p><span className="font-medium">Is Free:</span> {preMedical.is_free ? "Yes" : "No"}</p>
                    <p><span className="font-medium">Country Name:</span> {preMedical.country_name}</p>
                    <p><span className="font-medium">Serial No:</span> {preMedical.serial_no}</p>
                </div>
            </div>

            {/* Footer / Actions */}
            <div className="mt-8 flex justify-end">
                <Link
                    href={route("pre-medical.edit", preMedical.id)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
                >
                    Edit Pre-Medical
                </Link>
            </div>
        </div>
        </AdminDashboardLayout>
    );
};

export default ShowPreMedical;
