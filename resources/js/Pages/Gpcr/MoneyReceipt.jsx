// MoneyReceipt.jsx

import React from "react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head } from "@inertiajs/react";

const MoneyReceipt = ({ auth, data }) => {
    console.log("from money receipt", data);

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
            <div className="money-receipt">
                <h2 className="receipt-title">Money Receipt (rRT-PCR Lab)</h2>

                {/* Personal Information Section */}
                <div className="personal-info">
                    <h3 className="section-title">Personal Information</h3>
                    <div className="receipt-row">
                        <span className="receipt-label">Reg. Id:</span>
                        <span className="receipt-value">
                            {data?.patient_id}
                        </span>
                    </div>
                    <div className="receipt-row">
                        <span className="receipt-label">Name:</span>
                        <span className="receipt-value">{data?.name}</span>
                    </div>
                    {/* Add more rows for other personal information fields */}
                </div>

                {/* Billing Information Section */}
                <div className="billing-info">
                    <h3 className="section-title">Billing Information</h3>
                    {Array.isArray(data) && data.length > 0 ? (
                        <table className="billing-table">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Test Name</th>
                                    <th>Amount</th>
                                    <th>Discount</th>
                                    <th>Paid</th>
                                    <th>due</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(
                                ({ test_type, total, discount, paid, due }, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{test_type}</td>
                                        <td>{total}</td>
                                        <td>{discount}</td>
                                        <td>{paid}</td>
                                        <td>{due}</td>
                                    </tr>
                                )
                            )}
                            </tbody>
                        </table>
                    ) : (
                        <p>No billing information available</p>
                    )}
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default MoneyReceipt;
