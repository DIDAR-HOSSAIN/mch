import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import numberToWords from "number-to-words";
import pad from "@/assets/images/pcr_pad.png";
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
                    src={pad}
                    alt=""
                />

                {/* Barcode Section */}
                <div className="text-center mb-2">
                    <Barcode
                        value={patient.patient_id || "N/A"}
                        width={1} // Set the desired width (in pixels)
                        height={40} // Set the desired height (in pixels)
                    />
                </div>

                {/* Patient Information */}
                <div className="border border-gray-300 p-2 rounded-md">
                    {/* Section Title */}
                    <h3 className="text-lg font-bold mb-2 border-b pb-2 text-gray-800">
                        Patient Information
                    </h3>

                    {/* Reg ID, Bill No, and Date */}
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-md">
                            <span className="font-semibold text-gray-700">
                                Patient ID:
                            </span>{" "}
                            {patient.patient_id}
                        </p>
                        <p className="text-md">
                            <span className="font-semibold text-gray-700">
                                Bill No:
                            </span>{" "}
                            {patient.bill_no}
                        </p>
                        <p className="text-md">
                            <span className="font-semibold text-gray-700">
                                Date:
                            </span>{" "}
                            {formatDate(patient.reg_date)}
                        </p>
                    </div>

                    {/* Name */}
                    <div className="mb-2">
                        <p className="text-md w-full">
                            <span className="font-semibold text-gray-700">
                                Name:
                            </span>{" "}
                            {patient.name}
                        </p>
                    </div>

                    {/* Age, Gender, and Contact No */}
                    <div className="flex justify-between items-center">
                        <p className="text-md">
                            <span className="font-semibold text-gray-700">
                                Age:
                            </span>{" "}
                            {patient.age}
                        </p>
                        <p className="text-md">
                            <span className="font-semibold text-gray-700">
                                Gender:
                            </span>{" "}
                            {patient.gender}
                        </p>
                        <p className="text-md mb-2">
                            <span className="font-semibold text-gray-700">
                                Contact:
                            </span>{" "}
                            {patient.contact_no}
                        </p>
                    </div>
                    {/* Name */}
                    <div className="mb-2">
                        <p className="text-md w-full">
                            <span className="font-semibold text-gray-700">
                                Ref. By :
                            </span>{" "}
                            {patient?.reference_name}
                        </p>
                    </div>
                </div>

                {/* Test Details */}
                <table className="w-full border-collapse border mb-2 text-md">
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
                                    {test.test_fee}.00
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Payment Summary */}
                <div className="flex justify-between font-semibold text-lg">
                    <p>Total:</p>
                    <p>{patient.total || "0.00"}.00</p>
                </div>
                <div className="flex justify-between">
                    <p>Discount:</p>
                    <p>{patient.discount || "0.00"}.00</p>
                </div>
                <div className="flex justify-between">
                    <p>Net Payable:</p>
                    <p>{patient.net_payable || "0.00"}.00</p>
                </div>
                <div className="flex justify-between">
                    <p>Paid:</p>
                    <p>{patient.paid || "0.00"}.00</p>
                </div>
                <div className="flex justify-between font-extrabold text-white text-2xl bg-black">
                    <p>Due:</p>
                    <p>{patient.due || "0.00"}.00</p>
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
