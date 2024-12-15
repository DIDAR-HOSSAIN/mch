import React, { useRef, useEffect, useState } from "react";
import sign1 from "@/assets/images/sign/zakir_sign.png";
import sign2 from "@/assets/images/sign/zohir_sign.png";

const MolecularReport = ({ results = [], patient_id }) => {

    console.log('from reulsts for report', results);
    console.log('from reulsts for patient_id', patient_id);

    const reportRef = useRef();

    const [patient, setPatient] = useState({}); // State to store patient info

    // Fetch the patient details based on patient_id
    useEffect(() => {
        const fetchPatientDetails = async () => {
            const response = await fetch(`/api/patients/${patient_id}`);
            const data = await response.json();
            setPatient(data);
        };

        fetchPatientDetails();
    }, [patient_id]);

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
                    <p><strong>Name:</strong> {patient.name || "N/A"}</p>
                    <p><strong>Patient ID:</strong> {patient.id || "N/A"}</p>
                    <p><strong>Gender:</strong> {patient.gender || "N/A"}</p>
                    <p><strong>Age:</strong> {patient.age || "N/A"}</p>
                    <p><strong>Contact:</strong> {patient.contact_no || "N/A"}</p>
                    <p><strong>Specimen:</strong> Whole Blood</p>
                    <p><strong>Sample Collected:</strong> {results[0]?.molecularResult?.collection_date || "N/A"}</p>
                    <p><strong>Sample Received:</strong> {results[0]?.molecularResult?.received_date || "N/A"}</p>
                    <p><strong>Referred By:</strong> {patient.reference_name || "N/A"}</p>
                    <p><strong>Report Date:</strong> {new Date().toLocaleDateString()}</p>
                </div>

                {/* Test Results */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-2">Molecular Test Results</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">Investigation</th>
                                <th className="border border-gray-300 px-4 py-2">Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.length > 0 ? (
                                results.map((result, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 px-4 py-2">{result.molecularResult.investigation || "N/A"}</td>
                                        <td className="border border-gray-300 px-4 py-2">{result.molecularResult.result || "N/A"}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="text-center py-4 text-gray-500">
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
                        <span className="ml-2">{results.map((result) => result.molecularResult.methodology).filter(Boolean).join(", ") || "No methodology available."}</span>
                    </div>
                </div>

                {/* Remarks Section */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-2">Remarks</h2>
                    {results.length > 0 ? (
                        <ul className="list-disc pl-6">
                            {results.map((result, index) => (
                                <li key={index}>{result.molecularResult.remarks}</li>
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
                        <span className="ml-2">{results.map((result) => result.molecularResult.comments).filter(Boolean).join(", ") || "No comments available."}</span>
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
                        <strong className="text-xl">Dr. Md. Zakir Hossain</strong>
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
