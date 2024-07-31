import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head } from "@inertiajs/react";
import money_receipt_header_img from "@/assets/images/Money-Receipt/money_receipt_Header.png";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import QRCode from "qrcode.react";
import sign1 from "@/assets/images/sign/zakir_sign.png";
import sign2 from "@/assets/images/sign/zohir_sign.png";

const Report = ({ auth, reports }) => {

    const formatDate = (dateString) => {
        const options = { day: "numeric", month: "short", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-GB", options);
    };

    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: `${reports.patient_id || "N/A"}`,
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
        content: () => contentToPrint.current,
        pageStyle: `
                @page {
                    size: A4;
                    margin: 0;
                }
            `,
    });


    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dope Report
                </h2>
            }
        >
            <Head title="Dope Report" />

            <button
                onClick={() => {
                    handlePrint(null, () => contentToPrint.current);
                }}
                className="mx-auto mt-2 block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Print
            </button>

            <div
                ref={contentToPrint}
                className="money-receipt bg-white rounded-lg mt-2 p-6 max-w-2xl mx-auto"
            >
                <img
                    className="w-full h-full object-contain"
                    src={money_receipt_header_img}
                    alt=""
                />
                <p className="text-center">
                    953 O.R Nizam Road, Chattogram - 4000, Contact :
                    01883077569, Email : mchctg.rtpcrlab@gmail.com
                </p>

                <h1 className="text-2xl font-bold my-2 text-center">
                    Dope Test Report
                </h1>

                <div className="p-4">
                    {/* Patient Information */}
                    <div className="bg-gray-100 p-4 mb-4 rounded-md">
                        <h2 className="text-lg font-semibold mb-3">
                            Patient Information
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="font-semibold">
                                    Patient ID:{" "}
                                </span>
                                {reports.patient_id}
                            </div>
                            <div>
                                <span className="font-semibold">Name: </span>
                                {reports.name}
                            </div>
                            <div>
                                <span className="font-semibold">Sex: </span>
                                {reports.dope.sex}
                            </div>
                            <div>
                                <span className="font-semibold">
                                    Date of Birth:{" "}
                                </span>
                                {formatDate(reports.dope.dob)}
                            </div>
                            <div>
                                <span className="font-semibold">
                                    Collection Date:{" "}
                                </span>
                                {formatDate(reports.sample_collection_date)}
                            </div>
                            <div>
                                <span className="font-semibold">
                                    Sample Name: Urine
                                </span>
                            </div>

                            {/* Add more patient information fields as needed */}
                        </div>
                        <div>
                            <span className="font-semibold">
                                Method: Immunochromatography(ICT)
                            </span>
                        </div>
                    </div>

                    {/* Diagnostic Tests */}
                    <div>
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="">Test Name</th>
                                    <th className="">Result</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                <tr>
                                    <td className="py-2 px-4">Alcohol</td>
                                    <td className="py-2 px-4">
                                        {reports.alcohol}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4">
                                        Benzodiazepines
                                    </td>
                                    <td className="py-2 px-4">
                                        {reports.benzodiazepines}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4">Cannabinoids</td>
                                    <td className="py-2 px-4">
                                        {reports.cannabinoids}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4">Amphetamine</td>
                                    <td className="py-2 px-4">
                                        {reports.amphetamine}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4">Opiates</td>
                                    <td className="py-2 px-4">
                                        {reports.opiates}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="">
                            <QRCode
                                className="mx-auto"
                                value={reports.patient_id || "N/A"}
                                // size={256}
                            />
                        </div>

                        <div className="flex gap-6 px-4">
                            <div className="text-left mt-16">
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

                            <div className="text-right mt-16">
                                <img
                                    className="mx-auto"
                                    src={sign2}
                                    alt="Jahanara Trading Logo"
                                />
                                <hr className="border-black border-solid border-1 w-full" />
                                <strong className="text-xl">
                                    Zahirul Islam
                                </strong>
                                <p>Senior Research Officer</p>
                                <p>Molecular Biologist</p>
                                <p>Medical Centre Hospital Chattogram.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <h3 className="text-right">Prepared By : {auth.user.name}</h3>
            </div>
        </AdminDashboardLayout>
    );
};

export default Report;
