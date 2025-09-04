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
                            <div key={index} className="a4-page p-4 bg-white rounded-md my-8 flex flex-col min-h-[100vh]">
                                {/* ✅ Patient Details Table (No border, no padding) */}

                                <table className="w-full text-sm text-gray-800 border-collapse">
                                    <tbody>
                                        {/* Row 1 */}
                                        <tr className="bg-gray-50">
                                            <td className="font-semibold whitespace-nowrap">Patient Name:</td>
                                            <td className="text-left pl-2 whitespace-nowrap overflow-hidden text-ellipsis mr-4">{sample.molecular_patient_reg?.name || "N/A"}</td>
                                            <td className="font-semibold pl-8 whitespace-nowrap">Gender:</td>
                                            <td className="text-left pl-2 whitespace-nowrap">{sample.molecular_patient_reg?.gender || "N/A"}</td>
                                            <td className="font-semibold pl-4 whitespace-nowrap">Age:</td>
                                            <td className="text-left pl-2 whitespace-nowrap">
                                                {sample.molecular_patient_reg?.age || "N/A"} {sample.molecular_patient_reg?.age_type || ""}
                                            </td>
                                        </tr>

                                        {/* Row 2 */}
                                        <tr>
                                            <td className="font-semibold pr-2 whitespace-nowrap">Bill No:</td>
                                            <td className="text-left pl-2 whitespace-nowrap">{sample.molecular_patient_reg?.bill_no || "N/A"}</td>
                                            <td className="font-semibold pl-8 whitespace-nowrap">Contact No:</td>
                                            <td className="text-left pl-2 whitespace-nowrap">{sample.molecular_patient_reg?.contact_no || "N/A"}</td>
                                            <td className="font-semibold pl-4 whitespace-nowrap">Sample Collected:</td>
                                            <td className="text-left pl-2 whitespace-nowrap">{formatBDDateTime(sample.collection_date || "N/A")}</td>
                                        </tr>

                                        {/* Row 3 */}
                                        <tr className="bg-gray-50">
                                            <td className="font-semibold pr-2 whitespace-nowrap">Sample Received:</td>
                                            <td className="text-left pl-2 whitespace-nowrap">{formatBDDateTime(sample.received_date || "N/A")}</td>
                                            <td className="font-semibold pl-8 whitespace-nowrap">Report Date:</td>
                                            <td className="text-left pl-2 whitespace-nowrap">{formatBDDateTime(test.report_date || "N/A")}</td>
                                            <td className="font-semibold pl-4 whitespace-nowrap">Patient ID:</td>
                                            <td className="text-left pl-2 whitespace-nowrap">{sample.patient_id || "N/A"}</td>
                                        </tr>

                                        {/* Row 4 */}
                                        <tr>
                                            <td className="font-semibold pr-2 whitespace-nowrap">Specimen:</td>
                                            <td className="text-left pl-2 whitespace-nowrap">{test.specimen || "N/A"}</td>
                                            <td className="font-semibold pl-8 whitespace-nowrap">Test Advised:</td>
                                            <td className="text-left pl-2 whitespace-nowrap" colSpan="5">{sample.molecular_patient_reg?.test_advised || "N/A"}</td>
                                        </tr>

                                        {/* Row 5 */}
                                        <tr className="bg-gray-50">
                                            <td className="font-semibold pr-2 whitespace-nowrap">Ref. By:</td>
                                            <td className="text-left pl-2 whitespace-nowrap" colSpan="7">{sample.molecular_patient_reg?.reference_name || "N/A"}</td>
                                        </tr>
                                    </tbody>
                                </table>



                                {/* Test Details */}
                                <h1 className="text-xl font-bold text-center my-10">
                                    MOLECULAR TEST REPORT
                                </h1>

                                {test.molecular_reg_test?.test_name ===
                                    "Multiplex Real-Time RT-PCR for Dengue, Chikungunya & Zika Viruses" ? (
                                        <table className="w-full text-[15px] text-gray-800 border border-black mb-4">
                                            <thead>
                                                <tr className="bg-gray-100">
                                                    <th className="border border-black px-3 py-2 text-center w-[54%]">Test Name</th>
                                                    <th className="border border-black px-3 py-2 text-center w-[28%]">Pathogen Name</th>
                                                    <th className="border border-black px-3 py-2 text-center w-[18%]">Result</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {getPathogenData(test).map((p, idx) => {
                                                    const isBold = ["Detected", "Positive"].includes(p.result);
                                                    return (
                                                        <tr
                                                            key={idx}
                                                            className={`border border-black ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                                                } hover:bg-yellow-50`}
                                                        >
                                                            {idx === 0 && (
                                                                <td
                                                                    className="border border-black px-24 py-2 text-center font-semibold align-middle"
                                                                    rowSpan={getPathogenData(test).length}
                                                                >
                                                                    {test.molecular_reg_test?.test_name || "N/A"}
                                                                </td>
                                                            )}
                                                            <td className="border border-black px-3 py-2 text-center">
                                                                {p.name || "N/A"}
                                                            </td>
                                                            <td
                                                                className={`border border-black px-3 py-2 text-center ${isBold ? "font-bold" : "text-gray-700"
                                                                    }`}
                                                            >
                                                                {p.result || "N/A"}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}

                                                {/* ✅ Extra row under table */}
                                                <tr className="border border-black">
                                                    <td colSpan="3" className="px-3 py-2">
                                                        <span className="font-semibold">Comments :</span>{" "}
                                                        {test.comments || "No comments available."}
                                                    </td>
                                                </tr>


                                            </tbody>
                                        </table>
                                ) : (



                                        <table className="w-full text-[16px] text-gray-700 border-collapse border border-black">
                                            <thead>
                                                <tr className="border border-black">
                                                    <th className="text-[16px] text-center border border-black p-2 w-[55%]">Test Name</th>
                                                    <th
                                                        className="text-[16px] text-center border border-black p-2 w-[28%]"
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
                                                    <td className="text-[16px] p-2 text-center border border-black font-semibold align-middle">
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
                                                            >
                                                                {test.results || "N/A"}
                                                            </td>
                                                            <td className="text-[16px] p-2 text-center border border-black">
                                                                {test.result_copies || "N/A"}
                                                            </td>
                                                        </>
                                                    )}
                                                </tr>

                                                {/* ✅ Comments full row under table */}
                                                <tr className="border border-black">
                                                    <td colSpan="100%" className="px-3 py-2 text-sm text-left align-top">
                                                        <span className="font-semibold">Comments :</span>{" "}
                                                        {test.comments || "No comments available."}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>



                                    // <table className="w-full text-[16px] text-gray-700 border-collapse border border-black">
                                    //     <thead>
                                    //         <tr className="border border-black">
                                    //             <th className="text-[16px] text-center border border-black p-2">Test Name</th>
                                    //             <th
                                    //                 className="text-[16px] text-center border border-black p-2"
                                    //                 colSpan={
                                    //                     test.investigation ===
                                    //                         "Human Leukocyte Antigen B 27 (HLA B27) Qualitative" ||
                                    //                         test.result_status === "Positive"
                                    //                         ? 2
                                    //                         : 1
                                    //                 }
                                    //             >
                                    //                 Result
                                    //             </th>
                                    //             {test.investigation !==
                                    //                 "Human Leukocyte Antigen B 27 (HLA B27) Qualitative" &&
                                    //                 test.result_status === "Negative" && (
                                    //                     <th className="p-2 text-center border border-black">Unit</th>
                                    //                 )}
                                    //         </tr>
                                    //     </thead>
                                    //     <tbody>
                                    //         <tr className="text-lg border border-black">
                                    //                 <td className="text-[16px] p-2 text-center border border-black font-semibold align-middle">
                                    //                 {test.molecular_reg_test?.test_name || "N/A"}
                                    //             </td>

                                    //             {test.investigation ===
                                    //                 "Human Leukocyte Antigen B 27 (HLA B27) Qualitative" ? (
                                    //                 <td
                                    //                     className={`text-[16px] p-2 text-center border border-black ${["Detected", "Positive"].includes(test.results)
                                    //                         ? "font-bold"
                                    //                         : "font-normal"
                                    //                         }`}
                                    //                 >
                                    //                     {test.results || "N/A"}
                                    //                 </td>
                                    //             ) : test.result_status === "Negative" ? (
                                    //                 <>
                                    //                     <td
                                    //                         className={`text-[16px] p-2 text-center border border-black ${["Detected", "Positive"].includes(test.results)
                                    //                             ? "font-bold"
                                    //                             : "font-normal"
                                    //                             }`}
                                    //                     >
                                    //                         {test.results || "N/A"}
                                    //                     </td>
                                    //                     <td className="text-[16px] p-2 text-center border border-black">
                                    //                         {test.unit || "N/A"}
                                    //                     </td>
                                    //                 </>
                                    //             ) : (
                                    //                 <>
                                    //                     <td
                                    //                         className={`text-[16px] p-2 text-center border border-black ${["Detected", "Positive"].includes(test.results)
                                    //                             ? "font-bold"
                                    //                             : "font-normal"
                                    //                             }`}
                                    //                         rowSpan={3}
                                    //                     >
                                    //                         {test.results || "N/A"}
                                    //                     </td>
                                    //                     <td
                                    //                         className="text-[16px] p-2 text-center border border-black"
                                    //                         rowSpan={3}
                                    //                     >
                                    //                         {test.result_copies || "N/A"}
                                    //                     </td>
                                    //                 </>
                                    //             )}
                                    //         </tr>

                                    //             {/* ✅ Extra row under table */}
                                    //             <tr className="border border-black">
                                    //                 <td
                                    //                     colSpan={
                                    //                         test.investigation === "Human Leukocyte Antigen B 27 (HLA B27) Qualitative"
                                    //                             ? 2
                                    //                             : test.result_status === "Negative"
                                    //                                 ? 3
                                    //                                 : 1 // Positive হলে এখানে 2 রাখবো
                                    //                     }
                                    //                     className="px-3 py-2 text-sm text-left align-top"
                                    //                 >
                                    //                     <span className="font-semibold">Comments :</span>{" "}
                                    //                     {test.comments || "No comments available."}
                                    //                 </td>
                                    //             </tr>


                                    //     </tbody>
                                    // </table>
                                )}


                                <div className="text-sm flex items-center mt-4">
                                    <span className="font-semibold">
                                        Methodology :
                                    </span>
                                    <span className="ml-2">
                                        {test.methodology ||
                                            "No methodology available."}
                                    </span>
                                </div>

                                {/* Remarks & Comments */}
                                <h3 className="text-sm font-semibold mt-2">
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

                                {/* <p className="text-sm mt-2">
                                    <span className="font-semibold">Comments :</span>{" "}
                                    {test.comments || "No comments available."}
                                </p> */}


                                <div className="mt-4 mb-32  text-center">
                                    <p>----------End of Report----------</p>
                                </div>

                                {/* ✅ Signatures */}
                                <div className="flex justify-between text-sm">
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
                                        <p>SLMTA Fellow, US-CDC</p>
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

