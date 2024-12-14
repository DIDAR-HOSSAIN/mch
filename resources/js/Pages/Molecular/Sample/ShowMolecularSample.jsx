import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head } from "@inertiajs/react";
import React from "react";

const ShowMolecularSample = ({ auth, sample }) => {
    
    const formatDate = (dateString) => {
        const options = { day: "numeric", month: "short", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-GB", options);
    };

    const formatFieldName = (fieldName) => {
        return fieldName.replace(/_/g, " "); // Remove underscores and capitalize words
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Sample Details
                </h2>
            }
        >
            <Head title="Sample Details" />

            <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto mt-6">
                <h2 className="text-3xl font-semibold mb-6 text-center text-indigo-700">
                    {sample.name}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(sample).map(
                        ([key, value]) =>
                            ![
                                "id",
                                "name",
                                "created_at",
                                "updated_at",
                            ].includes(key) && (
                                <div key={key} className="space-y-2">
                                    <strong className="text-lg text-gray-700 capitalize">
                                        {formatFieldName(key)}:
                                    </strong>
                                    <span className="text-xl text-indigo-900 ml-2">
                                        {key === "dob" || key.includes("date")
                                            ? formatDate(value)
                                            : value || "N/A"}
                                    </span>
                                </div>
                            )
                    )}
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default ShowMolecularSample;
