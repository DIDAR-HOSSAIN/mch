import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head } from "@inertiajs/react";
import React from "react";

const ShowDetails = ({ auth, antigen }) => {
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
                    Patient Details
                </h2>
            }
        >
            <Head title="Patient Details" />

            <div className="bg-white shadow-md rounded-md p-6">
                <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
                    {antigen.name}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(antigen).map(
                        ([key, value]) =>
                            ![
                                "id",
                                "name",
                                "created_at",
                                "updated_at",
                            ].includes(key) && (
                                <div key={key} className="mb-4">
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

export default ShowDetails;
