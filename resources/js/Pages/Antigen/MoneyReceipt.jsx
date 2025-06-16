import React, { useRef } from "react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head } from "@inertiajs/react";
import { useReactToPrint } from "react-to-print";
import numberToWords from "number-to-words";
import Barcode from "react-barcode";
import money_receipt_header_img from "@/assets/images/Money-Receipt/money_receipt_Header.png";

const MoneyReceipt = ({ auth, data }) => {
    const {
        patient_id,
        name,
        contact_no,
        age,
        sex,
        address,
        test_name,
        entry_date,
        reg_fee = 0,
        total = 0,
        discount = 0,
        paid = 0,
        due = 0,
    } = data || {};

    const contentToPrint = useRef(null);

    const handlePrint = useReactToPrint({
        documentTitle: `MoneyReceipt-${patient_id || "Unknown"}`,
        content: () => contentToPrint.current,
        pageStyle: `
            @page {
                size: B4;
                margin: 0;
            }
        `,
    });

    const formatDate = (date) => {
        if (!date) return "N/A";
        const options = { day: "numeric", month: "short", year: "numeric" };
        return new Date(date).toLocaleDateString("en-GB", options);
    };

    const convertToWords = (amount) => {
        try {
            return numberToWords.toWords(amount).toLowerCase();
        } catch {
            return "zero";
        }
    };

    const netPayable = reg_fee - discount;

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Rapid Antigen Money Receipt
                </h2>
            }
        >
            <Head title="Rapid Antigen Money Receipt" />

            <button
                onClick={handlePrint}
                className="mx-auto mt-2 block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Print
            </button>

            <div
                ref={contentToPrint}
                className="money-receipt bg-white rounded-lg mt-4 p-6 max-w-2xl mx-auto shadow"
            >
                <img
                    className="w-full h-full object-contain"
                    src={money_receipt_header_img}
                    alt="Header"
                />
                <p className="text-center text-sm text-gray-600">
                    953 O.R Nizam Road, Chattogram - 4000 | Contact: 01883077569 | Email: mchctg.rtpcrlab@gmail.com
                </p>

                <h2 className="text-xl text-center font-semibold my-4">
                    Money Receipt (Rapid Antigen)
                </h2>

                <div className="text-center mb-4">
                    <Barcode value={patient_id || "000000"} width={1} height={50} />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p><strong>Reg ID:</strong> {patient_id || "N/A"}</p>
                        <p><strong>Name:</strong> {name || "N/A"}</p>
                        <p><strong>Mobile No:</strong> {contact_no || "N/A"}</p>
                        <p><strong>Address:</strong> {address || "N/A"}</p>
                    </div>
                    <div>
                        <p><strong>Age:</strong> {age || "N/A"}</p>
                        <p><strong>Sex:</strong> {sex || "N/A"}</p>
                        <p><strong>Date:</strong> {formatDate(entry_date)}</p>
                    </div>
                </div>

                <table className="w-full mt-6 border text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">S/N</th>
                            <th className="border p-2">Test Name</th>
                            <th className="border p-2">Date</th>
                            <th className="border p-2 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border p-2">1</td>
                            <td className="border p-2 text-center">{test_name}</td>
                            <td className="border p-2 text-center">{formatDate(entry_date)}</td>
                            <td className="border p-2 text-right">{reg_fee}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}></td>
                            <td className="border p-2 text-right font-semibold">Subtotal:</td>
                            <td className="border p-2 text-right">{reg_fee}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}></td>
                            <td className="border p-2 text-right font-semibold">Discount:</td>
                            <td className="border p-2 text-right">{discount}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}></td>
                            <td className="border p-2 text-right font-semibold">Net Payable:</td>
                            <td className="border p-2 text-right">{netPayable}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}></td>
                            <td className="border p-2 text-right font-semibold">Paid:</td>
                            <td className="border p-2 text-right">{paid}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}></td>
                            <td className="border p-2 text-right font-semibold">Due:</td>
                            <td className="border p-2 text-right font-bold">{due}</td>
                        </tr>
                    </tbody>
                </table>

                <p className="mt-4 text-sm">
                    In Word: <span className="capitalize">{convertToWords(paid)} taka</span> received from <strong>{name}</strong>.
                </p>
                <p className="mt-2 text-sm"><strong>Prepared By:</strong> {auth.user.name}</p>
            </div>
        </AdminDashboardLayout>
    );
};

export default MoneyReceipt;
