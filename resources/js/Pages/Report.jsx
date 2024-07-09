// Report.jsx

import React from "react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head } from "@inertiajs/react";
import QRCode from "qrcode.react";

const Report = ({ results }) => {
    const formatDate = (dateString) => {
        const options = { day: "numeric", month: "short", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-GB", options);
    };

    return (
        <>
            <Head title="Dope Report" />

            <div className="bg-white rounded-lg mt-2 p-6 max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold my-2 text-center">
                    Dope Test Report
                </h1>

                {/* Display report details for each result */}
                {results.map((result, index) => (
                    <div
                        key={index}
                        className="p-4 mb-4 bg-gray-100 rounded-md"
                    >
                        <h2 className="text-lg font-semibold mb-3">
                            Patient Information
                        </h2>
                        <div className="grid grid-cols-2 gap-4 mx-auto">
                            <div>
                                <span className="font-semibold">
                                    Patient ID:
                                </span>
                                {result.patient_id}
                            </div>
                            <div>
                                <span className="font-semibold">Name: </span>
                                {result.name}
                            </div>
                            <div>
                                <span className="font-semibold">Sex: </span>
                                {result.dope.sex}
                            </div>
                            <div>
                                <span className="font-semibold">
                                    Date of Birth:
                                </span>
                                {formatDate(result.dope.dob)}
                            </div>
                            <div>
                                <span className="font-semibold">
                                    Collection Date:
                                </span>
                                {formatDate(result.sample_collection_date)}
                            </div>
                        </div>

                        {/* Diagnostic Tests */}
                        <table className="w-full mt-4">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="">Test Name</th>
                                    <th className="">Result</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                <tr>
                                    <td className="py-2 px-4">Alcohol</td>
                                    <td className="py-2 px-4">
                                        {result.alcohol}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4">
                                        Benzodiazepines
                                    </td>
                                    <td className="py-2 px-4">
                                        {result.benzodiazepines}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4">Cannabinoids</td>
                                    <td className="py-2 px-4">
                                        {result.cannabinoids}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4">Amphetamine</td>
                                    <td className="py-2 px-4">
                                        {result.amphetamine}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4">Opiates</td>
                                    <td className="py-2 px-4">
                                        {result.opiates}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                ))}
            </div>
        </>
    );
};

export default Report;
