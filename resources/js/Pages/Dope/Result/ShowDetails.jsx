import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head } from "@inertiajs/react";
import React from "react";

const ShowDetails = ({ auth, result }) => {
    const formatDate = (dateString) => {
        const options = { day: "numeric", month: "short", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-GB", options);
    };

    const formatFieldName = (fieldName) => {
        return fieldName.replace(/_/g, " "); // Remove underscores and capitalize words
    };

    const formatBooleanField = (value) => {
        return value === 1 ? "Negative" : "Positive";
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Result Details
                </h2>
            }
        >
            <Head title="Result Details" />

            <div className="bg-white shadow-md rounded-md p-6">
                <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
                    {result.name}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(result).map(([key, value]) => {
                        if (key === 'patient_id' || key === 'result_date' || key === 'alcohol' || key === 'benzodiazepines' || key === 'cannabinoids' || key === 'amphetamine' || key === 'opiates' || key === 'status' || key === 'remarks') {
                            return (
                                <div key={key} className="mb-4">
                                    <strong className="text-lg text-gray-700 capitalize">
                                        {formatFieldName(key)}:
                                    </strong>
                                    <span className="text-xl text-indigo-900 ml-2">
                                        {key === 'result_date' ? formatDate(value) : (key === 'status' ? (value === true ? 'Approve' : 'Pending') : (key === 'alcohol' || key === 'benzodiazepines' || key === 'cannabinoids' || key === 'amphetamine' || key === 'opiates' ? formatBooleanField(value) : value))}
                                    </span>
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })}
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default ShowDetails;
