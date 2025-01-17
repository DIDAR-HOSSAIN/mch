import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import sign1 from "@/assets/images/sign/zakir_sign.png";
import sign2 from "@/assets/images/sign/zohir_sign.png";
// import pad from "@/assets/images/pcr_pad.png";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const MolecularReport = ({ auth, tests = [], sample = {} }) => {
    console.log("Molecular tests Report ", tests);
    console.log("Molecular sample Report ", sample);

    const formatBDDateTime = (date) =>
        new Date(date).toLocaleString("en-GB", {
            timeZone: "Asia/Dhaka",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });

    const contentToPrint = useRef(null);

    const handlePrint = useReactToPrint({
        documentTitle: `Receipt_${sample.patient_id}`,
        content: () => contentToPrint.current,
        pageStyle: `
            @page {
                size: A4;
                margin-top: 5cm;
            }
            body {
                margin: 0;
                font-family: Arial, sans-serif;
            }
            .page-break {
                page-break-after: always;
            }
        `,
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
                <div className="flex justify-center">
                    <button
                        onClick={handlePrint}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Print
                    </button>
                </div>

                {/* Print Section */}
                <div ref={contentToPrint} className="print-section">
                    {tests.length > 0 ? (
                        tests.map((test, index) => (
                            <div
                                key={index}
                                className="a4-page p-6 bg-white rounded-md"
                            >
                                {/* Patient Details */}

                                {/* <img
                                    className="w-full h-auto object-cover"
                                    src={pad}
                                    alt="Pad"
                                /> */}

                                <table className="w-full text-sm text-gray-700 border border-black">
                                    <tbody>
                                        {/* Row 1 */}
                                        <tr className="hover:bg-gray-50 border border-black">
                                            <td className="font-semibold w-1/4 border border-black">
                                                Patient Name:
                                            </td>
                                            <td className="w-1/4 border border-black">
                                                {sample.molecular_patient_reg
                                                    ?.name || "N/A"}
                                            </td>
                                            <td className="font-semibold w-1/6 border border-black">
                                                Gender:
                                            </td>
                                            <td className="w-1/6 border border-black">
                                                {sample.molecular_patient_reg
                                                    ?.gender || "N/A"}
                                            </td>
                                            <td className="font-semibold w-1/6 border border-black">
                                                Age:
                                            </td>
                                            <td className="w-1/6 border border-black">
                                                {sample.molecular_patient_reg
                                                    ?.age || "N/A"}
                                            </td>
                                        </tr>

                                        {/* Row 2 */}
                                        <tr className="hover:bg-gray-50 border border-black">
                                            <td className="font-semibold border border-black">
                                                Patient ID:
                                            </td>
                                            <td className="border border-black">
                                                {sample.patient_id || "N/A"}
                                            </td>
                                            <td className="font-semibold border border-black">
                                                Bill No:
                                            </td>
                                            <td className="border border-black">
                                                {sample.molecular_patient_reg
                                                    ?.bill_no || "N/A"}
                                            </td>
                                            <td className="font-semibold border border-black">
                                                Contact No:
                                            </td>
                                            <td className="border border-black">
                                                {sample.molecular_patient_reg
                                                    ?.contact_no || "N/A"}
                                            </td>
                                        </tr>

                                        {/* Row 3 */}
                                        <tr className="hover:bg-gray-50 border border-black">
                                            <td className="font-semibold border border-black">
                                                Sample Collected:
                                            </td>
                                            <td className="border border-black">
                                                {formatBDDateTime(
                                                    sample.collection_date ||
                                                        "N/A"
                                                )}
                                            </td>
                                            <td className="font-semibold border border-black">
                                                Sample Received:
                                            </td>
                                            <td className="border border-black">
                                                {formatBDDateTime(
                                                    sample.received_date ||
                                                        "N/A"
                                                )}
                                            </td>
                                            <td className="font-semibold border border-black">
                                                Report Date:
                                            </td>
                                            <td className="border border-black">
                                                {formatBDDateTime(
                                                    sample.created_at || "N/A"
                                                )}
                                            </td>
                                        </tr>

                                        {/* Row 4 */}
                                        <tr className="hover:bg-gray-50 border border-black">
                                            <td className="font-semibold p-1 border border-black">
                                                Specimen:
                                            </td>
                                            <td className="p-1 border border-black">
                                                {test.specimen || "N/A"}
                                            </td>
                                            <td className="font-semibold p-1 border border-black">
                                                Ref. By:
                                            </td>
                                            <td
                                                className="p-1 border border-black"
                                                colSpan="3"
                                            >
                                                {sample.molecular_patient_reg
                                                    ?.reference_name || "N/A"}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                {/* Test Details */}
                                <h1 className="text-lg font-bold text-center my-1">
                                    Molecular Test Report
                                </h1>

                                <table className="w-full text-[16px] text-gray-700 border border-black">
                                    <thead>
                                        <tr className="border border-black">
                                            <th className="p-1 text-[16px] text-center border border-black">
                                                Test Name
                                            </th>
                                            <th
                                                className="text-[16px] p-1 text-center border border-black"
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
                                                    <th className="p-2 text-center border border-black">
                                                        Unit
                                                    </th>
                                                )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="font-semibold text-lg border border-black">
                                            <td className="text-[16px] p-2 text-center border border-black">
                                                {test.molecular_reg_test
                                                    .test_name || "N/A"}
                                            </td>

                                            {test.investigation ===
                                            "Human Leukocyte Antigen B 27 (HLA B27) Qualitative" ? (
                                                // Only show Result column for HLA B27
                                                <td className="text-[16px] p-2 text-center border border-black">
                                                    {test.result || "N/A"}
                                                </td>
                                            ) : test.result_status ===
                                              "Negative" ? (
                                                // Logic for Negative result status
                                                <>
                                                    <td className="text-[16px] p-2 text-center border border-black">
                                                        {test.result || "N/A"}
                                                    </td>
                                                    <td className="text-[16px] p-2 text-center border border-black">
                                                        {test.unit || "N/A"}
                                                    </td>
                                                </>
                                            ) : (
                                                // Logic for Positive result status
                                                <>
                                                    <td
                                                        className="text-[16px] p-2 text-center border border-black"
                                                        rowSpan={3}
                                                    >
                                                        {test.result || "N/A"}
                                                    </td>
                                                    <td
                                                        className="text-[16px] p-2 text-center border border-black"
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

                                <div className="text-sm flex items-center mt-2">
                                    <span className="font-semibold">
                                        Methodology :
                                    </span>
                                    <span className="ml-2">
                                        {test.methodology ||
                                            "No methodology available."}
                                    </span>
                                </div>

                                {/* Remarks & Comments */}
                                <h3 className="text-sm mt-2 font-semibold">
                                    Remarks :
                                </h3>
                                <ul className="text-sm list-disc pl-6 mb-2">
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

                                <span className="text-sm mt-2 font-semibold">
                                    Comments :
                                </span>
                                <span className="text-sm ml-2">
                                    {test.comments || "No comments available."}
                                </span>

                                <div className="mt-1 text-center">
                                    <p>----------End of Report----------</p>
                                </div>

                                {/* Signatures */}
                                <div className="text-sm flex justify-between mt-20">
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
