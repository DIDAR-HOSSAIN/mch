import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import sign1 from "@/assets/images/sign/zakir_sign.png";
import sign2 from "@/assets/images/sign/zohir_sign.png";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const MolecularReport = ({ auth, tests = [], sample = {} }) => {
    console.log("Molecular tests Report ", tests);
    console.log("Molecular sample Report ", sample);

    const contentToPrint = useRef(null);

    const handlePrint = useReactToPrint({
        documentTitle: `Report_${sample.patient_id}`,
        content: () => contentToPrint.current,
        pageStyle: `
                @page {
                    size: A4;
                    margin: 1cm;
                }
                .a4-page {
                    page-break-inside: avoid;
                    page-break-after: always;
                }
                .print-section {
                    margin: 0 !important;
                }
            `,
    });

    const formatBDDateTime = (date) =>
        new Date(date).toLocaleString("en-GB", {
            timeZone: "Asia/Dhaka",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true, // Use 12-hour format with AM/PM
        });

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Molecular Results
                </h2>
            }
        >
            <div className="p-6 min-h-screen">
                <button
                    onClick={handlePrint}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                    Print
                </button>

                {/* Print Section */}
                <div ref={contentToPrint} className="print-section">
                    {tests.length > 0 ? (
                        tests.map((test, index) => (
                            <div
                                key={index}
                                className="a4-page p-6 bg-white rounded-md"
                            >
                                {/* Patient Details */}

                                <h2 className="text-lg font-semibold mb-2">
                                    Patient Details
                                </h2>

                                <table className="w-full table-fixed border border-gray-300">
                                    <tbody>
                                        {/* Row 1 */}
                                        <tr>
                                            <td className="border px-4 py-2 font-semibold text-gray-700">
                                                Patient Name:
                                                <span className="block text-gray-900 font-normal">
                                                    {sample
                                                        .molecular_patient_reg
                                                        ?.name || "N/A"}
                                                </span>
                                            </td>
                                            <td className="border px-4 py-2 font-semibold text-gray-700">
                                                Patient ID:
                                                <span className="block text-gray-900 font-normal">
                                                    {sample.patient_id || "N/A"}
                                                </span>
                                            </td>
                                            <td className="border px-4 py-2 font-semibold text-gray-700">
                                                Gender:
                                                <span className="block text-gray-900 font-normal">
                                                    {sample
                                                        .molecular_patient_reg
                                                        ?.gender || "N/A"}
                                                </span>
                                            </td>
                                        </tr>

                                        {/* Row 2 */}
                                        <tr>
                                            <td className="border px-4 py-2 font-semibold text-gray-700">
                                                Age:
                                                <span className="block text-gray-900 font-normal">
                                                    {sample
                                                        .molecular_patient_reg
                                                        ?.age || "N/A"}
                                                </span>
                                            </td>
                                            <td className="border px-4 py-2 font-semibold text-gray-700">
                                                Specimen:
                                                <span className="block text-gray-900 font-normal">
                                                    Whole Blood
                                                </span>
                                            </td>
                                            <td className="border px-4 py-2 font-semibold text-gray-700">
                                                Sample Collected:
                                                <span className="block text-gray-900 font-normal">
                                                    {formatBDDateTime(
                                                        sample.collection_date ||
                                                            "N/A"
                                                    )}
                                                </span>
                                            </td>
                                        </tr>

                                        {/* Row 3 */}
                                        <tr>
                                            <td className="border px-4 py-2 font-semibold text-gray-700">
                                                Sample Received:
                                                <span className="block text-gray-900 font-normal">
                                                    {formatBDDateTime(
                                                        sample.received_date ||
                                                            "N/A"
                                                    )}
                                                </span>
                                            </td>
                                            <td className="border px-4 py-2 font-semibold text-gray-700">
                                                Referred By:
                                                <span className="block text-gray-900 font-normal">
                                                    {sample
                                                        .molecular_patient_reg
                                                        ?.reference_name ||
                                                        "N/A"}
                                                </span>
                                            </td>
                                            <td className="border px-4 py-2 font-semibold text-gray-700">
                                                Report Date:
                                                <span className="block text-gray-900 font-normal">
                                                    {formatBDDateTime(
                                                        sample.created_at ||
                                                            "N/A"
                                                    )}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                {/* Test Details */}
                                <h1 className="text-2xl font-bold text-center my-2">
                                    Molecular Test Report
                                </h1>

                                <table className="w-full border-collapse border">
                                    <thead>
                                        <tr>
                                            <th className="border p-2 text-center">
                                                Investigation
                                            </th>
                                            <th
                                                className="border p-2 text-center"
                                                colSpan={
                                                    test.investigation ===
                                                        "Human Leukocyte Antigen B 27 (HLA B27) Qualitative" ||
                                                    test.result_status ===
                                                        "Positive"
                                                        ? 2
                                                        : 1
                                                }
                                            >
                                                Result
                                            </th>

                                            {/* Show "Unit" column only if it's not HLA B27 and result_status is Negative */}
                                            {test.investigation !==
                                                "Human Leukocyte Antigen B 27 (HLA B27) Qualitative" &&
                                                test.result_status ===
                                                    "Negative" && (
                                                    <th className="border p-2 text-center">
                                                        Unit
                                                    </th>
                                                )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="font-semibold text-xl">
                                            <td className="border p-2 text-center">
                                                {test.molecular_reg_test
                                                    .test_name || "N/A"}
                                            </td>

                                            {test.investigation ===
                                            "Human Leukocyte Antigen B 27 (HLA B27) Qualitative" ? (
                                                // Only show Result column for HLA B27
                                                <td className="border p-2 text-center">
                                                    {test.result || "N/A"}
                                                </td>
                                            ) : test.result_status ===
                                              "Negative" ? (
                                                // Logic for Negative result status
                                                <>
                                                    <td className="border p-2 text-center">
                                                        {test.result || "N/A"}
                                                    </td>
                                                    <td className="border p-2 text-center">
                                                        {test.unit || "N/A"}
                                                    </td>
                                                </>
                                            ) : (
                                                // Logic for Positive result status
                                                <>
                                                    <td
                                                        className="border p-2 text-center"
                                                        rowSpan={3}
                                                    >
                                                        {test.result || "N/A"}
                                                    </td>
                                                    <td
                                                        className="border p-2 text-center"
                                                        rowSpan={3}
                                                    >
                                                        {test.result_copies ||
                                                            "N/A"}
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="flex items-center mt-2">
                                    <span className="font-semibold">
                                        Methodology :
                                    </span>
                                    <span className="ml-2">
                                        {test.methodology ||
                                            "No methodology available."}
                                    </span>
                                </div>

                                {/* Remarks & Comments */}
                                <h3 className="mt-2 font-semibold">
                                    Remarks :
                                </h3>
                                <ul className="list-disc pl-6 mb-2">
                                    {test.remarks ? (
                                        test.remarks
                                            .split(/[|]/) // Split the remarks based on ., |, or /
                                            .filter(
                                                (item) => item.trim() !== ""
                                            ) // Filter out any empty entries
                                            .map((item, index) => (
                                                <li
                                                    key={index}
                                                    className="mb-1"
                                                >
                                                    {item.trim()}
                                                </li>
                                            ))
                                    ) : (
                                        <li>No remarks available.</li>
                                    )}
                                </ul>

                                <span className="mt-2 font-semibold">
                                    Comments :
                                </span>
                                <span className="ml-2">
                                    {test.comments || "No comments available."}
                                </span>

                                <div className="mt-4 text-center">
                                    <p>----------End of Report----------</p>
                                </div>

                                {/* Signatures */}
                                <div className="flex justify-between mt-12">
                                    <div className="text-center">
                                        {/* <img
                                            src={sign2}
                                            alt="Zahirul Signature"
                                            className="w-24 mx-auto"
                                        /> */}
                                        <hr className="border-t border-black my-2" />
                                        <strong>Zahirul Islam</strong>
                                        <p>BSC (Hons) , MS</p>
                                        <p>
                                            Biochemistry & Molecular Biology
                                            (CU)
                                        </p>
                                        <p>Senior Research Officer</p>
                                        <p>BITID, Fouzderhat, Chattogram</p>
                                        <p>Molecular Biologist</p>
                                        <p>
                                            Medical Centre Hospital (RT-PCR Lab)
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        {/* <img
                                            src={sign1}
                                            alt="Zakir Signature"
                                            className="w-24 mx-auto"
                                        /> */}
                                        <hr className="border-t border-black my-2" />
                                        <strong>Dr. Md. Zakir Hossain</strong>
                                        <p>MBBS, BCS, M.Phil (Microbiology)</p>
                                        <p>Asst. Professor & Head</p>
                                        <p>
                                            Dept. of Mircrobiology & Immunology
                                        </p>
                                        <p>BITID, Fouzderhat, Chattogram</p>
                                        <p>Consultant</p>
                                        <p>
                                            Medical Centre Hospital (RT-PCR Lab)
                                        </p>
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
            </div>
        </AdminDashboardLayout>
    );
};

export default MolecularReport;
