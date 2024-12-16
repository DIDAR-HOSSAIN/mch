import React, { useRef } from "react";

const MolecularReport = ({ tests = [], sample = {} }) => {
    const reportRef = useRef();

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Report Content */}
            <div ref={reportRef} className="bg-white p-6 rounded-md shadow-md">
                <h1 className="text-2xl font-bold text-center mb-4">
                    Molecular Test Report
                </h1>

                {/* Sample Details */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-2">Sample Details</h2>
                    <p>
                        <strong>Sample ID:</strong> {sample.sample_id || "N/A"}
                    </p>
                    <p>
                        <strong>Patient ID:</strong>{" "}
                        {sample.patient_id || "N/A"}
                    </p>
                    <p>
                        <strong>Patient Name:</strong> {sample.name || "N/A"}
                    </p>
                    <p>
                        <strong>Collected By:</strong>{" "}
                        {sample.user_name || "N/A"}
                    </p>
                    <p>
                        <strong>Collection Date:</strong>{" "}
                        {sample.collection_date
                            ? new Date(sample.collection_date).toLocaleString()
                            : "N/A"}
                    </p>
                    <p>
                        <strong>Received By:</strong>{" "}
                        {sample.received_by || "N/A"}
                    </p>
                    <p>
                        <strong>Received Date:</strong>{" "}
                        {sample.received_date
                            ? new Date(sample.received_date).toLocaleString()
                            : "N/A"}
                    </p>
                    <p>
                        <strong>Collection Status:</strong>{" "}
                        {sample.collection_status || "N/A"}
                    </p>
                    <p>
                        <strong>Remarks:</strong> {sample.remarks || "N/A"}
                    </p>
                </div>

                {/* Test Results */}
                <div>
                    {tests.length > 0 ? (
                        tests.map((test, index) => (
                            <div
                                key={test.id || index}
                                className="border-t border-gray-200 py-4"
                            >
                                <h3 className="text-lg font-bold mb-2">
                                    Test:{" "}
                                    {test.molecular_reg_test?.test_name ||
                                        "N/A"}
                                </h3>
                                <p>
                                    <strong>Test Date:</strong>{" "}
                                    {test.molecular_reg_test?.test_date
                                        ? new Date(
                                              test.molecular_reg_test.test_date
                                          ).toLocaleDateString()
                                        : "N/A"}
                                </p>
                                <p>
                                    <strong>Test Fee:</strong> $
                                    {test.molecular_reg_test?.test_fee || "N/A"}
                                </p>
                                <p>
                                    <strong>Investigation:</strong>{" "}
                                    {test.investigation || "N/A"}
                                </p>
                                <p>
                                    <strong>Result:</strong>{" "}
                                    {test.result || "N/A"}
                                </p>
                                <p>
                                    <strong>Unit:</strong> {test.unit || "N/A"}
                                </p>
                                <p>
                                    <strong>Methodology:</strong>{" "}
                                    {test.methodology || "N/A"}
                                </p>
                                <p>
                                    <strong>Remarks:</strong>{" "}
                                    {test.remarks || "N/A"}
                                </p>
                                <p>
                                    <strong>Comments:</strong>{" "}
                                    {test.comments || "N/A"}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center py-4">
                            No test results available.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MolecularReport;


// below table system

import React, { useRef, useEffect, useState } from "react";
import sign1 from "@/assets/images/sign/zakir_sign.png";
import sign2 from "@/assets/images/sign/zohir_sign.png";

const MolecularReport = ({ tests = [], sample = {} }) => {
    // console.log("from reulsts for report", results);
    // console.log("from reulsts for patient_id", patient_id);

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
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-2">
                        Molecular Test Results
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
                            {tests.length > 0 ? (
                                tests.map((test, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {test.investigation || "N/A"}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {test.result ||
                                                "N/A"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="2"
                                        className="text-center py-4 text-gray-500"
                                    >
                                        No results available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mb-6">
                    <div className="flex items-center">
                        <span className="font-semibold">Methodology:</span>
                        <span className="ml-2">
                            {tests
                                .map(
                                    (test) =>
                                        test.methodology
                                )
                                .filter(Boolean)
                                .join(", ") || "No methodology available."}
                        </span>
                    </div>
                </div>

                {/* Remarks Section */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-2">Remarks</h2>
                    {tests.length > 0 ? (
                        <ul className="list-disc pl-6">
                            {tests.map((test, index) => (
                                <li key={index}>
                                    {test.remarks}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No remarks available.</p>
                    )}
                </div>

                {/* Comments Section */}
                <div className="mb-6">
                    <div className="flex items-center">
                        <span className="font-semibold">Comments:</span>
                        <span className="ml-2">
                            {tests
                                .map(
                                    (test) => test.comments
                                )
                                .filter(Boolean)
                                .join(", ") || "No comments available."}
                        </span>
                    </div>
                </div>

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
