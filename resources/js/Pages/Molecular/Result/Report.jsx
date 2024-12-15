import React, { useRef } from "react";
import sign1 from "@/assets/images/sign/zakir_sign.png";
import sign2 from "@/assets/images/sign/zohir_sign.png";

const MolecularReport = ({ patient, results, sample }) => {
    const reportRef = useRef();

    // Optionally, handle PDF generation here
    // const handleDownloadPDF = async () => {
    //     const input = reportRef.current;
    //     const canvas = await html2canvas(input, { scale: 2 });
    //     const imgData = canvas.toDataURL("image/png");
    //     const pdf = new jsPDF("p", "mm", "a4");
    //     const pdfWidth = pdf.internal.pageSize.getWidth();
    //     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    //     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    //     pdf.save(`Molecular_Test_Report_${patient.id}.pdf`);
    // };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Button to download PDF */}
            {/* <button
                onClick={handleDownloadPDF}
                className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700"
            >
                Download Report
            </button> */}

            {/* Report Content */}
            <div ref={reportRef} className="bg-white p-6 rounded-md shadow-md">
                <h1 className="text-2xl font-bold text-center mb-4">
                    Molecular Test Report
                </h1>

                {/* Patient Details */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-2">Patient Details</h2>
                    <p>
                        <strong>Name:</strong> {patient.name}
                    </p>
                    <p>
                        <strong>Patient ID:</strong> {patient.id}
                    </p>
                    <p>
                        <strong>Gender:</strong> {patient.gender}
                    </p>
                    <p>
                        <strong>Age:</strong> {patient.age}
                    </p>
                    <p>
                        <strong>Contact:</strong> {patient.contact_no}
                    </p>
                    <p>
                        <strong>Specimen:</strong> Whole Blood
                    </p>
                    <p>
                        <strong>Sample Collected:</strong>{" "}
                        {sample.collection_date}
                    </p>
                    <p>
                        <strong>Sample Received:</strong> {sample.received_date}
                    </p>
                    <p>
                        <strong>Referred By:</strong> {patient.reference_name}
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
                            {results.map((result, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {result.investigation}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {result.result}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Remarks Section */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-2">Remarks</h2>
                    <p>
                        <strong>Methodology:</strong> Real-Time PCR based on
                        TaqMan Technology
                    </p>
                    <ul className="list-disc pl-6">
                        <li>
                            The examination was carried out on QuantStudio™ 5
                            Real-Time PCR System.
                        </li>
                        <li>
                            Extraction was done using Gene Proof Pathogen-Free
                            DNA isolation kit.
                        </li>
                        <li>
                            Real-Time PCR reaction carried out using RevoDx HLA
                            B27 Direct qPCR kit.
                        </li>
                    </ul>
                </div>

                {/* Comments Section */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-2">Comments</h2>
                    <p>
                        Clinical diagnosis should not rely solely on HLA-B27
                        status. Other biochemical or imaging tests & clinical
                        findings are necessary to confirm the diagnosis of
                        autoimmune diseases.
                    </p>
                </div>

                {/* Footer with Signatures */}
                <div className="flex gap-6 px-4">
                    <div className="text-left mt-2">
                        <img
                            className="mx-auto"
                            src={sign2}
                            alt="Jahanara Trading Logo"
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
                            alt="Jahanara Trading Logo"
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
