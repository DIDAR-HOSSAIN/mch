import React, { useRef } from "react";
import sign1 from "@/assets/images/sign/zakir_sign.png";
import sign2 from "@/assets/images/sign/zohir_sign.png";

const MolecularReport = ({ tests = [], sample = {} }) => {
    console.log('Molecular tests Report ', tests)
    console.log('Molecular sample Report ', sample)
    const printRef = useRef();

    // Function to trigger print
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Print Section */}
            <div ref={printRef} className="print-section">
                {tests.length > 0 ? (
                    tests.map((test, index) => (
                        <div
                            key={index}
                            className="a4-page p-6 bg-white rounded-md shadow-md"
                        >
                            {/* Patient Details */}
                            <h1 className="text-2xl font-bold text-center mb-6">
                                Molecular Test Report
                            </h1>
                            <h2 className="text-lg font-semibold mb-2">
                                Patient Details
                            </h2>
                            <p>
                                <strong>Name:</strong> {sample.name || "N/A"}
                            </p>
                            <p>
                                <strong>Patient ID:</strong> {sample.patient_id || "N/A"}
                            </p>
                            <p>
                                <strong>Gender:</strong> {sample.molecular_patient_reg.gender || "N/A"}
                            </p>
                            <p>
                                <strong>Age:</strong> {sample.molecular_patient_reg.age || "N/A"}
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
                                {sample.molecular_patient_reg.reference_name|| "N/A"}
                            </p>
                            <p>
                                <strong>Report Date:</strong>{" "}
                                {sample.created_at || "N/A"}
                            </p>

                            {/* Test Details */}
                            <h2 className="text-lg font-semibold mt-6 mb-2">
                                Test: {test.molecular_reg_test?.test_name || "N/A"}
                            </h2>
                            <table className="w-full border-collapse border">
                                <thead>
                                    <tr>
                                        <th className="border p-2 text-left">
                                            Investigation
                                        </th>
                                        <th className="border p-2 text-left">
                                            Result
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border p-2">
                                            {test.investigation || "N/A"}
                                        </td>
                                        <td className="border p-2">
                                            {test.result || "N/A"}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* Remarks & Comments */}
                            <h3 className="mt-6 font-semibold">Remarks</h3>
                            <p>{test.remarks || "No remarks available."}</p>

                            <h3 className="mt-4 font-semibold">Comments</h3>
                            <p>{test.comments || "No comments available."}</p>

                            <div className="mt-6 text-center">
                                <p>----------End of Report----------</p>
                            </div>

                            {/* Signatures */}
                            <div className="flex justify-between mt-10">
                                <div className="text-center">
                                    {/* <img
                                        src={sign2}
                                        alt="Zahirul Signature"
                                        className="w-24 mx-auto"
                                    /> */}
                                    <hr className="border-t border-black my-2" />
                                    <strong>Zahirul Islam</strong>
                                    <p>Senior Research Officer</p>
                                    <p>Molecular Biologist</p>
                                </div>
                                <div className="text-center">
                                    {/* <img
                                        src={sign1}
                                        alt="Zakir Signature"
                                        className="w-24 mx-auto"
                                    /> */}
                                    <hr className="border-t border-black my-2" />
                                    <strong>Dr. Md. Zakir Hossain</strong>
                                    <p>Asst. Professor (Microbiology)</p>
                                    <p>Consultant</p>
                                </div>
                            </div>

                            {/* Page Break */}
                            <div className="page-break"></div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center py-4">
                        No test results available.
                    </p>
                )}
            </div>

            {/* Print Button */}
            <button
                onClick={handlePrint}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Print Report
            </button>

            {/* Print Styles */}
            <style>
                {`
                    @media print {
                        body {
                            margin: 0;
                            padding: 0;
                        }
                        .print-section {
                            width: 210mm;
                            height: 297mm;
                            margin: 0 auto;
                        }
                        .a4-page {
                            page-break-after: always;
                            margin: 0;
                            padding: 20px;
                            width: 100%;
                            height: 100%;
                            box-sizing: border-box;
                            break-inside: avoid;
                        }
                        .page-break {
                            page-break-after: always;
                        }
                        button {
                            display: none; /* Hide buttons on print */
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default MolecularReport;
