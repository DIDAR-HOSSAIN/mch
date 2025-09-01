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


    // Dengue/Chikungunya/Zika Pathogen Data
    const getPathogenData = (test) => [
        { name: test.pathogen_name_dengue, result: test.dengue_result },
        { name: test.pathogen_name_chikungunya, result: test.chikungunya_result },
        { name: test.pathogen_name_zika, result: test.zika_result },
    ].filter(p => p.name);

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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Molecular Results</h2>}
        >
            <div className="p-6 min-h-screen">
                <div className="flex justify-center mb-4">
                    <button
                        onClick={handlePrint}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Print
                    </button>
                </div>

                <div ref={contentToPrint}>
                    {tests.length > 0 ? (
                        tests.map((test, index) => (
                            // <div key={index} className="a4-page p-4 bg-white rounded-md mb-6">
                            <div key={index} className="a4-page p-4 bg-white rounded-md mb-6 flex flex-col min-h-[100vh]">
                                {/* ✅ Patient Details Table */}
                                <table className="w-full text-[14px] text-gray-800 border border-gray-900 border-collapse mb-2">
                                    <tbody>
                                        <tr>
                                            <td className="font-semibold border border-gray-900 p-1">Patient Name:</td>
                                            <td className="border border-gray-900 p-1" style={{ minWidth: "180px", whiteSpace: "normal", wordBreak: "break-word" }}>
                                                {sample.molecular_patient_reg?.name || "N/A"}
                                            </td>
                                            <td className="font-semibold border border-gray-900 p-1">Gender:</td>
                                            <td className="border border-gray-900 p-1">{sample.molecular_patient_reg?.gender || "N/A"}</td>
                                            <td className="font-semibold border border-gray-900 p-1">Age:</td>
                                            <td className="border border-gray-900 p-1">{sample.molecular_patient_reg?.age || "N/A"} {sample.molecular_patient_reg?.age_type || "N/A"}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold border border-gray-900 p-1">Patient ID:</td>
                                            <td className="border border-gray-900 p-1">{sample.patient_id || "N/A"}</td>
                                            <td className="font-semibold border border-gray-900 p-1">Bill No:</td>
                                            <td className="border border-gray-900 p-1">{sample.molecular_patient_reg?.bill_no || "N/A"}</td>
                                            <td className="font-semibold border border-gray-900 p-1">Contact No:</td>
                                            <td className="border border-gray-900 p-1">{sample.molecular_patient_reg?.contact_no || "N/A"}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold border border-gray-900 p-1">Sample Collected:</td>
                                            <td className="border border-gray-900 p-1">{formatBDDateTime(sample.collection_date || "N/A")}</td>
                                            <td className="font-semibold border border-gray-900 p-1">Sample Received:</td>
                                            <td className="border border-gray-900 p-1">{formatBDDateTime(sample.received_date || "N/A")}</td>
                                            <td className="font-semibold border border-gray-900 p-1">Report Date:</td>
                                            <td className="border border-gray-900 p-1">{formatBDDateTime(test.report_date || "N/A")}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold border border-gray-900 p-1">Specimen:</td>
                                            <td className="border border-gray-900 p-1">{test.specimen || "N/A"}</td>
                                            <td className="font-semibold border border-gray-900 p-1">Test Advised:</td>
                                            <td className="border border-gray-900 p-1" colSpan="3">{sample.molecular_patient_reg?.test_advised || "N/A"}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold border border-gray-900 p-1">Ref. By:</td>
                                            <td className="border border-gray-900 p-1" colSpan="5">{sample.molecular_patient_reg?.reference_name || "N/A"}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                {/* Test Details */}
                                <h1 className="text-xl font-bold text-center mt-4">
                                    Molecular Test Report
                                </h1>

                                {test.molecular_reg_test?.test_name ===
                                    "Multiplex Real-Time RT-PCR for Dengue, Chikungunya & Zika Viruses" ? (
                                    <table className="w-full text-[14px] text-gray-800 border-collapse border border-black mb-2">
                                        <thead>
                                            <tr className="bg-gray-200 border border-black">
                                                <th className="border border-black p-1 text-center w-1/2">Test Name</th>
                                                <th className="border border-black p-1 text-center w-1/4">Pathogen Name</th>
                                                <th className="border border-black p-1 text-center w-1/4">Result</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {getPathogenData(test).map((p, idx) => {
                                                const isBold = ["Detected", "Positive"].includes(p.result);
                                                return (
                                                    <tr key={idx} className="border border-black">
                                                        {idx === 0 && (
                                                            <td
                                                                className="border border-black p-1 text-center font-semibold w-1/2"
                                                                rowSpan={getPathogenData(test).length}
                                                            >
                                                                {test.molecular_reg_test?.test_name || "N/A"}
                                                            </td>
                                                        )}
                                                        <td className="border border-black p-1 text-center w-1/4">{p.name || "N/A"}</td>
                                                        <td
                                                            className={`border border-black p-1 text-center w-1/4 ${isBold ? "font-bold" : "font-normal"
                                                                }`}
                                                        >
                                                            {p.result || "N/A"}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                ) : (
                                    <table className="w-full text-[16px] text-gray-700 border-collapse border border-black">
                                        <thead>
                                            <tr className="border border-black">
                                                <th className="text-[16px] text-center border border-black p-2">Test Name</th>
                                                <th
                                                    className="text-[16px] text-center border border-black p-2"
                                                    colSpan={
                                                        test.investigation ===
                                                            "Human Leukocyte Antigen B 27 (HLA B27) Qualitative" ||
                                                            test.result_status === "Positive"
                                                            ? 2
                                                            : 1
                                                    }
                                                >
                                                    Result
                                                </th>
                                                {test.investigation !==
                                                    "Human Leukocyte Antigen B 27 (HLA B27) Qualitative" &&
                                                    test.result_status === "Negative" && (
                                                        <th className="p-2 text-center border border-black">Unit</th>
                                                    )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="text-lg border border-black">
                                                <td className="text-[16px] p-2 text-center border border-black">
                                                    {test.molecular_reg_test?.test_name || "N/A"}
                                                </td>

                                                {test.investigation ===
                                                    "Human Leukocyte Antigen B 27 (HLA B27) Qualitative" ? (
                                                    <td
                                                        className={`text-[16px] p-2 text-center border border-black ${["Detected", "Positive"].includes(test.results)
                                                            ? "font-bold"
                                                            : "font-normal"
                                                            }`}
                                                    >
                                                        {test.results || "N/A"}
                                                    </td>
                                                ) : test.result_status === "Negative" ? (
                                                    <>
                                                        <td
                                                            className={`text-[16px] p-2 text-center border border-black ${["Detected", "Positive"].includes(test.results)
                                                                ? "font-bold"
                                                                : "font-normal"
                                                                }`}
                                                        >
                                                            {test.results || "N/A"}
                                                        </td>
                                                        <td className="text-[16px] p-2 text-center border border-black">
                                                            {test.unit || "N/A"}
                                                        </td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td
                                                            className={`text-[16px] p-2 text-center border border-black ${["Detected", "Positive"].includes(test.results)
                                                                ? "font-bold"
                                                                : "font-normal"
                                                                }`}
                                                            rowSpan={3}
                                                        >
                                                            {test.results || "N/A"}
                                                        </td>
                                                        <td
                                                            className="text-[16px] p-2 text-center border border-black"
                                                            rowSpan={3}
                                                        >
                                                            {test.result_copies || "N/A"}
                                                        </td>
                                                    </>
                                                )}
                                            </tr>
                                        </tbody>
                                    </table>
                                )}


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
                                <h3 className="text-sm font-semibold">
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

                                <p className="text-sm mt-2">
                                    <span className="font-semibold">Comments :</span>{" "}
                                    {test.comments || "No comments available."}
                                </p>


                                <div className="mt-2 text-center">
                                    <p>----------End of Report----------</p>
                                </div>

                                {/* ✅ Signatures */}
                                <div className="flex justify-between mt-auto text-sm">
                                    <div className="text-center">
                                        <hr className="border-t border-gray-900 my-1" />
                                        <strong>Zahirul Islam</strong>
                                        <p>BSC (Hons), MS</p>
                                        <p>Biochemistry & Molecular Biology (CU)</p>
                                        <p>Senior Research Officer</p>
                                        <p>BITID, Fouzderhat, Chattogram</p>
                                        <p>Molecular Biologist</p>
                                        <p>Medical Centre Hospital (RT-PCR Lab)</p>
                                    </div>
                                    <div className="text-center">
                                        <hr className="border-t border-gray-900 my-1" />
                                        <strong>Dr. Md. Zakir Hossain</strong>
                                        <p>MBBS, BCS, M.Phil (Microbiology)</p>
                                        <p>Assistant Professor & Head</p>
                                        <p>Dept. of Microbiology & Immunology</p>
                                        <p>BITID, Fouzderhat, Chattogram</p>
                                        <p>Consultant</p>
                                        <p>Medical Centre Hospital (RT-PCR Lab)</p>
                                    </div>
                                </div>
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

