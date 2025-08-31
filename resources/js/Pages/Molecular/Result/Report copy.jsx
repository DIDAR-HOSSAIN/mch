import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import sign1 from "@/assets/images/sign/zakir_sign.png";
import sign2 from "@/assets/images/sign/zohir_sign.png";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const MolecularReport = ({ auth, tests = [], sample = {} }) => {
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
            @page { size: A4; margin-top: 5cm;; }
            body { margin: 0; font-family: Arial, sans-serif; }
            .page-break { page-break-after: always; }
            table { border-collapse: collapse; }
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
                                {/* Patient Details Table */}
                                <table className="w-full text-[14px] text-gray-800 border border-gray-900 border-collapse mb-2">
                                    <tbody>
                                        <tr>
                                            <td className="font-semibold border border-gray-900 p-1">Patient Name:</td>
                                            <td
                                                className="border border-gray-900 p-1"
                                                style={{
                                                    minWidth: "150px",
                                                    maxWidth: "200px",
                                                    whiteSpace: "normal",
                                                    wordBreak: "break-word",
                                                    lineHeight: "1.4",
                                                    minHeight: "40px"
                                                }}
                                            >
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


                                {/* Test Report Table */}
                                <h1 className="text-[16px] font-bold text-center mt-2 mb-2">Molecular Test Report</h1>
                                <table className="w-full text-[14px] text-gray-800 border border-gray-900 border-collapse mb-2">
                                    <thead>
                                        <tr className="bg-gray-200 border border-gray-900">
                                            <th className="border border-gray-900 p-1 text-center w-1/2">Test Name</th>
                                            <th className="border border-gray-900 p-1 text-center w-1/4">Pathogen Name</th>
                                            <th className="border border-gray-900 p-1 text-center w-1/4">Result</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getPathogenData(test).map((p, idx) => (
                                            <tr key={idx} className="border border-gray-900">
                                                {idx === 0 && (
                                                    <td
                                                        className="border border-gray-900 p-1 text-center font-semibold w-1/2"
                                                        rowSpan={getPathogenData(test).length}
                                                    >
                                                        {test.molecular_reg_test?.test_name || "N/A"}
                                                    </td>
                                                )}
                                                <td className="border border-gray-900 p-1 text-center w-1/4">{p.name || "N/A"}</td>
                                                <td className="border border-gray-900 p-1 text-center w-1/4">{p.result || "N/A"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Methodology */}
                                <div className="text-sm flex items-center mt-2">
                                    <span className="font-semibold">Methodology :</span>
                                    <span className="ml-1">{test.methodology || "No methodology available."}</span>
                                </div>

                                {/* Remarks & Comments */}
                                <h3 className="text-sm mt-1 font-semibold">Remarks :</h3>
                                <ul className="text-sm list-disc pl-4 mb-1">
                                    {test.remarks ? test.remarks.split(/[|]/).filter(i => i.trim() !== "").map((item, idx) => <li key={idx}>{item.trim()}</li>) : <li>No remarks available.</li>}
                                </ul>
                                <div className="text-sm mt-1">
                                    <strong>Comments: </strong>{test.comments || "No comments available."}
                                </div>

                                <div className="mt-2 text-center"><p>----------End of Report----------</p></div>

                                {/* Signatures */}
                                <div className="flex justify-between mt-auto text-sm">
                                    <div className="text-center">
                                        <img src={sign2} alt="Zahirul Signature" className="w-12 mx-auto" />
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
                                        <img src={sign1} alt="Zakir Signature" className="w-12 mx-auto" />
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
                        <p className="text-gray-500 text-center py-4">No test results available.</p>
                    )}
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default MolecularReport;