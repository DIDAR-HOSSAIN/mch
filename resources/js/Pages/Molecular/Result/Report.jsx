import React, { useRef } from "react";
import sign1 from "@/assets/images/sign/zakir_sign.png";
import sign2 from "@/assets/images/sign/zohir_sign.png";

const MolecularReport = ({ tests = [], sample = {} }) => {
    const reportRef = useRef();

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Report Content */}
            <div ref={reportRef} className="bg-white p-6 rounded-md shadow-md">
                <h1 className="text-2xl font-bold text-center mb-4">
                    Molecular Test Report
                </h1>

                {/* Patient Details */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-2">Patient Details</h2>
                    <p>
                        <strong>Name:</strong> {sample.name || "N/A"}
                    </p>
                    <p>
                        <strong>Patient ID:</strong> {sample.id || "N/A"}
                    </p>
                    <p>
                        <strong>Gender:</strong> {sample.gender || "N/A"}
                    </p>
                    <p>
                        <strong>Age:</strong> {sample.age || "N/A"}
                    </p>
                    <p>
                        <strong>Contact:</strong> {sample.contact_no || "N/A"}
                    </p>
                    <p>
                        <strong>Specimen:</strong> Whole Blood
                    </p>
                    <p>
                        <strong>Sample Collected:</strong>{" "}
                        {sample.collection_date || "N/A"}
                    </p>
                    <p>
                        <strong>Sample Received:</strong>{" "}
                        {sample.received_date || "N/A"}
                    </p>
                    <p>
                        <strong>Referred By:</strong>{" "}
                        {sample.reference_name || "N/A"}
                    </p>
                    <p>
                        <strong>Report Date:</strong>{" "}
                        {new Date().toLocaleDateString()}
                    </p>
                </div>

                {/* Test Results */}
                {tests.length > 0 ? (
                    tests.map((test, index) => (
                        <div key={index} className="mb-6">
                            <h2 className="text-lg font-bold mb-2">
                                Test:{" "}
                                {test.molecular_reg_test?.test_name || "N/A"}
                            </h2>

                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 px-4 py-2">
                                            Investigation
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Result
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {test.investigation || "N/A"}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {test.result || "N/A"}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* Additional Sections */}
                            <div className="mb-6">
                                <div className="flex items-center">
                                    <span className="font-semibold">
                                        Methodology:
                                    </span>
                                    <span className="ml-2">
                                        {test.methodology ||
                                            "No methodology available."}
                                    </span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-semibold mb-2">Remarks</h3>
                                {test.remarks ? (
                                    <p>{test.remarks}</p>
                                ) : (
                                    <p>No remarks available.</p>
                                )}
                            </div>

                            <div className="mb-6">
                                <h3 className="font-semibold mb-2">Comments</h3>
                                {test.comments ? (
                                    <p>{test.comments}</p>
                                ) : (
                                    <p>No comments available.</p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center py-4">
                        No test results available.
                    </p>
                )}

                {/* Footer with Signatures */}
                <div className="flex gap-6 px-4 justify-between">
                    <div className="text-left mt-2">
                        <img
                            className="mx-auto"
                            src={sign2}
                            alt="Signature Zahirul"
                        />
                        <hr className="border-black border-solid border-1 w-full" />
                        <strong className="text-xl">Zahirul Islam</strong>
                        <p>Senior Research Officer</p>
                        <p>Molecular Biologist</p>
                        <p>Medical Centre Hospital Chattogram.</p>
                    </div>

                    <div className="text-right mt-2">
                        <img
                            className="mx-auto"
                            src={sign1}
                            alt="Signature Zakir"
                        />
                        <hr className="border-black border-solid border-1 w-full" />
                        <strong className="text-xl">
                            Dr. Md. Zakir Hossain
                        </strong>
                        <p>Asst. Professor (Microbiology)</p>
                        <p>Consultant</p>
                        <p>Medical Centre Hospital Chattogram.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MolecularReport;
