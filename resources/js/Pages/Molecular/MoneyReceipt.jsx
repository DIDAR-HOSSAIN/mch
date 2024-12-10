import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import numberToWords from "number-to-words";
import money_receipt_header_img from "@/assets/images/Money-Receipt/money_receipt_Header.png";
import Barcode from "react-barcode";
import { Head } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const MolecularTestReceipt = ({ auth, patient, tests }) => {
    const formatDate = (dateString) => {
        const options = { day: "numeric", month: "short", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-GB", options);
    };

    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: `Receipt_${patient.patient_id}`,
        content: () => contentToPrint.current,
        pageStyle: `
        @page {
            size: B4;
            margin: 0;
        }
        body {
            margin-top: 0 !important; /* Remove margin from body */
        }
    `,
    });

    const convertToWords = (amount) => {
        if (!amount || isNaN(amount)) return "Invalid amount";
        return numberToWords.toWords(amount);
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Molecular Money Receipt
                </h2>
            }
        >
            <Head title="Molecular Money Receipt" />
            <div className="flex justify-center">
                <button
                    onClick={handlePrint}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Print
                </button>
            </div>

            <div
                ref={contentToPrint}
                className="money-receipt bg-white rounded-lg p-6 max-w-2xl mx-auto"
            >
                {/* Header */}
                <img
                    className="w-full h-full object-contain"
                    src={money_receipt_header_img}
                    alt=""
                />
                <div className="text-center mb-4">
                    <p>953 O.R Nizam Road, Chattogram - 4000</p>
                    <p>
                        Contact: 01883077569 | Email: mchctg.rtpcrlab@gmail.com
                    </p>
                </div>

                {/* Barcode Section */}
                <div className="text-center mb-4">
                    <Barcode
                        value={patient.patient_id || "N/A"}
                        width={1} // Set the desired width (in pixels)
                        height={50} // Set the desired height (in pixels)
                    />
                </div>

                {/* Patient Information */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p>
                            <span className="font-bold">Reg ID:</span>{" "}
                            {patient.patient_id}
                        </p>
                        <p>
                            <span className="font-bold">Name:</span>{" "}
                            {patient.name}
                        </p>
                        <p>
                            <span className="font-bold">Contact:</span>{" "}
                            {patient.contact_no}
                        </p>
                    </div>
                    <div>
                        <p>
                            <span className="font-bold">Reg Date:</span>{" "}
                            {formatDate(patient.reg_date)}
                        </p>
                        <p>
                            <span className="font-bold">Age:</span>{" "}
                            {patient.age}
                        </p>
                        <p>
                            <span className="font-bold">Gender:</span>{" "}
                            {patient.gender}
                        </p>
                    </div>
                </div>

                {/* Test Details */}
                <table className="w-full border-collapse border mb-4 text-sm">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2 border">#</th>
                            <th className="p-2 border">Test Name</th>
                            <th className="p-2 border text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tests.map((test, index) => (
                            <tr key={test.id} className="border-b">
                                <td className="p-2 border">{index + 1}</td>
                                <td className="p-2 border">{test.test_name}</td>
                                <td className="p-2 border text-right">
                                    {test.test_fee?.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Payment Summary */}
                <div className="flex justify-between font-semibold text-lg">
                    <p>Total:</p>
                    <p>{patient.total?.toFixed(2) || "0.00"}</p>
                </div>
                <div className="flex justify-between">
                    <p>Discount:</p>
                    <p>{patient.discount?.toFixed(2) || "0.00"}</p>
                </div>
                <div className="flex justify-between">
                    <p>Net Payable:</p>
                    <p>{patient.net_payable?.toFixed(2) || "0.00"}</p>
                </div>
                <div className="flex justify-between">
                    <p>Paid:</p>
                    <p>{patient.paid?.toFixed(2) || "0.00"}</p>
                </div>
                <div className="flex justify-between font-extrabold text-white text-2xl bg-black">
                    <p>Due:</p>
                    <p>{patient.due?.toFixed(2) || "0.00"}</p>
                </div>

                {/* In Words */}
                <p className="mt-4">
                    <span className="font-bold">In Words:</span>{" "}
                    {convertToWords(patient.net_payable)} Taka Only.
                </p>

                {/* Footer */}
                <div className="mt-4 text-right">
                    <p>Prepared By: {patient.user_name}</p>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default MolecularTestReceipt;
