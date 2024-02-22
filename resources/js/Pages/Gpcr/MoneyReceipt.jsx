import React from "react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head } from "@inertiajs/react";
import money_receipt_header_img from "@/assets/images/Money-Receipt/money_receipt_Header.png";

const MoneyReceipt = ({ auth, data }) => {
    console.log("from money receipt", data);

    // Destructure relevant data
    const {
        patient_id,
        name,
        contact_no,
        passport_no,
        age,
        sex,
        address,
        test_name,
        entry_date,
        total,
        discount,
        paid,
        due,
    } = data;

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Money Receipt
                </h2>
            }
        >
            <Head title="Money Receipt" />

            <div className="money-receipt bg-white rounded-lg shadow-md py-2 p-6 max-w-2xl mx-auto">
                <img
                    className="w-full h-full object-contain py-2"
                    src={money_receipt_header_img}
                    alt=""
                />

                <h2 className="text-xl text-center font-semibold mb-4">
                    Money Receipt (rRT-PCR Lab)
                </h2>

                {/* Personal Information Section */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                        <div className="info-row">
                            <span className="info-label font-bold">Reg Id:</span>
                            <span className="info-value">{patient_id || "N/A"}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label font-bold">Name:</span>
                            <span className="info-value">{name || "N/A"}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label font-bold">Mobile no:</span>
                            <span className="info-value">{contact_no || "N/A"}</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
                        <div className="info-row">
                            <span className="info-label font-bold">Passport no:</span>
                            <span className="info-value">{passport_no || "N/A"}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label font-bold">Age:</span>
                            <span className="info-value">{age || "N/A"}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label font-bold">Sex:</span>
                            <span className="info-value">{sex || "N/A"}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label font-bold">Address:</span>
                            <span className="info-value">{address || "N/A"}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label font-bold">Date:</span>
                            <span className="info-value">{entry_date || "N/A"}</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
                        <div className="info-row">
                            <span className="info-label font-bold">Passport no:</span>
                            <span className="info-value">{passport_no || "N/A"}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label font-bold">Age:</span>
                            <span className="info-value">{age || "N/A"}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label font-bold">Sex:</span>
                            <span className="info-value">{sex || "N/A"}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label font-bold">Address:</span>
                            <span className="info-value">{address || "N/A"}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label font-bold">Date:</span>
                            <span className="info-value">{entry_date || "N/A"}</span>
                        </div>
                    </div>
                </div>          

                {/* Billing Information Section */}
                <div className="section billing-info mb-6">
                    <h3 className="text-lg font-semibold mb-2">
                        Billing Information
                    </h3>
                    <table className="info-table w-full border-collapse border">
                        <thead>
                            <tr className="border-b">
                                <th className="p-3">S/N</th>
                                <th className="p-3">Test Name</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="p-3">1</td>
                                <td className="p-3">{test_name}</td>
                                <td className="p-3">{entry_date}</td>
                                <td className="p-3">{total}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Payment Information Section */}
                <div className="section payment-info">
                    <h3 className="text-lg font-semibold mb-2">
                        Payment Information
                    </h3>
                    <div className="info-row">
                        <span className="info-label font-bold">Discount:</span>
                        <span className="info-value">{discount || 0}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label font-bold">Paid:</span>
                        <span className="info-value">{paid || 0}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label font-bold">Due:</span>
                        <span className="info-value">{due || 0}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label font-bold">
                            Grand Total:
                        </span>
                        <span className="info-value">
                            {total - discount || 0}
                        </span>
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default MoneyReceipt;
