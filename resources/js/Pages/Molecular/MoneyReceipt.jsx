import { Head } from "@inertiajs/react";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import numberToWords from "number-to-words";

const MolecularTestReceipt = ({ patient, tests }) => {
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
                size: A4;
                margin: 0;
            }
        `,
    });

    const convertToWords = (amount) => {
        if (!amount || isNaN(amount)) return "Invalid amount";
        return numberToWords.toWords(amount);
    };

    return (
        <div>
            <Head title="Molecular Test Money Receipt" />

            <div className="flex justify-center space-x-4 mt-2">
                <button
                    onClick={handlePrint}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Print
                </button>
            </div>

            <div
                ref={contentToPrint}
                className="money-receipt bg-white rounded-lg mt-2 p-6 max-w-2xl mx-auto shadow-lg"
            >
                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">Molecular Lab</h2>
                    <p>953 O.R Nizam Road, Chattogram - 4000</p>
                    <p>Contact: 01883077569 | Email: mchctg.rtpcrlab@gmail.com</p>
                </div>

                {/* Title */}
                <h2 className="text-xl text-center font-semibold my-4">Money Receipt</h2>

                {/* Patient Information */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p>
                            <span className="font-bold">Reg ID:</span> {patient.patient_id}
                        </p>
                        <p>
                            <span className="font-bold">Name:</span> {patient.name}
                        </p>
                        <p>
                            <span className="font-bold">Contact:</span> {patient.contact_no}
                        </p>
                        <p>
                            <span className="font-bold">Gender:</span> {patient.gender}
                        </p>
                        <p>
                            <span className="font-bold">Age:</span> {patient.age}
                        </p>
                    </div>
                    <div>
                        <p>
                            <span className="font-bold">Reg Date:</span> {formatDate(patient.reg_date)}
                        </p>
                        <p>
                            <span className="font-bold">Reference:</span> {patient.reference_name || "N/A"}
                        </p>
                        <p>
                            <span className="font-bold">Payment Type:</span> {patient.payment_type || "N/A"}
                        </p>
                        <p>
                            <span className="font-bold">Account Head:</span> {patient.account_head || "N/A"}
                        </p>
                    </div>
                </div>

                {/* Test Details */}
                <table className="w-full border-collapse border mb-4 text-sm">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2 border">#</th>
                            <th className="p-2 border">Test Name</th>
                            <th className="p-2 border">Test Date</th>
                            <th className="p-2 border text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tests.map((test, index) => (
                            <tr key={test.id} className="border-b">
                                <td className="p-2 border">{index + 1}</td>
                                <td className="p-2 border">{test.test_name}</td>
                                <td className="p-2 border">{formatDate(test.test_date)}</td>
                                <td className="p-2 border text-right">{test.test_fee?.toFixed(2)}</td>
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
                <div className="flex justify-between text-red-600 font-bold">
                    <p>Due:</p>
                    <p>{patient.due?.toFixed(2) || "0.00"}</p>
                </div>

                {/* In Words */}
                <p className="mt-4">
                    <span className="font-bold">In Words:</span>{" "}
                    {convertToWords(patient.paid)} Taka Only.
                </p>

                {/* Footer */}
                <div className="mt-4 text-right">
                    <p>Prepared By: {patient.user_name}</p>
                </div>
            </div>
        </div>
    );
};

export default MolecularTestReceipt;
