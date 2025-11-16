import React, { useEffect } from "react";
import { Head } from "@inertiajs/react";
import logo from "../../../assets/images/Logo/mch-logo.png";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

export default function PrintView({ auth, data }) {
    useEffect(() => {
        setTimeout(() => window.print(), 600);
    }, []);

    const today = new Date().toLocaleDateString("en-GB");

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold">Repeat Money Receipt</h2>}
        >
            <Head title="Repeat Money Receipt" />

            {/* 👇 Only this part will print */}
            <div className="print-area bg-white text-gray-900 p-8 max-w-[700px] mx-auto border border-gray-400 print:p-0 print:m-0">

                {/* Header */}
                <div className="text-center mb-3 border-b border-gray-700 pb-3">
                    <div className="flex items-center justify-between gap-3">
                        <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
                        <div className="leading-tight">
                            <h1 className="text-2xl font-extrabold uppercase tracking-wide">
                                Medical Centre
                            </h1>
                            <p className="text-sm">953, O.R. Nizam Road, Panchlaish, Ctg-4000</p>
                            <p className="text-sm">Email: medicalcentrebd@gmail.com</p>
                            <p className="text-sm">Mobile: +88 01883077569</p>
                            <p className="text-sm font-semibold">GCC Code: 05/02/23</p>
                        </div>
                        {data?.pre_medical?.photo && (
                            <img
                                src={`/images/passengers/${data.pre_medical.photo}`}
                                alt="Passenger"
                                className="w-20 h-20 object-cover border border-gray-500 rounded-md"
                            />
                        )}
                    </div>
                    <h2 className="mt-3 text-lg font-bold uppercase tracking-wide">
                        Repeat Money Receipt
                    </h2>
                </div>

                {/* Passenger Info */}
                <div className="border border-gray-600 p-4 mb-4 rounded-md bg-gray-50">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                            <p><strong>ID No:</strong> {data?.pre_medical?.pre_medical_id}</p>
                            <p><strong>Date:</strong> {today}</p>
                            <p><strong>Delivery Date:</strong> {data?.delivery_date ? new Date(data.delivery_date).toLocaleDateString("en-GB") : "-"}</p>
                            <p><strong>Repeat ID:</strong> {data?.id}</p>
                        </div>

                        <div className="space-y-1">
                            <p><strong>Name:</strong> {data?.pre_medical?.first_name} {data?.pre_medical?.last_name}</p>
                            <p><strong>Passport No:</strong> {data?.pre_medical?.passport_no}</p>
                            <p><strong>Country:</strong> {data?.pre_medical?.country_name}</p>
                            <p><strong>Agency:</strong> {data?.pre_medical?.agency_name}</p>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <table className="w-full border border-gray-700 border-collapse text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-700 py-1 px-2 text-left">Test Name</th>
                            <th className="border border-gray-700 py-1 px-2 text-right">Amount (Tk)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.items?.map((item, i) => (
                            <tr key={i} className="even:bg-gray-50">
                                <td className="border border-gray-700 py-1 px-2">{item?.medical_test?.test_name}</td>
                                <td className="border border-gray-700 py-1 px-2 text-right">
                                    {parseFloat(item?.amount).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td className="border border-gray-700 py-1 px-2 text-right font-semibold">
                                Total
                            </td>
                            <td className="border border-gray-700 py-1 px-2 text-right font-semibold">
                                {parseFloat(data?.total).toFixed(2)}
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Footer */}
                <div className="mt-6 text-sm leading-snug">
                    <p>
                        Received with thanks from{" "}
                        <strong>{data?.pre_medical?.first_name} {data?.pre_medical?.last_name}</strong>{" "}
                        on account of Investigation Charge (Held up)
                    </p>
                </div>

                <div className="mt-10 text-right font-semibold">
                    <p className="border-t border-gray-600 inline-block pt-1">
                        Authorized Signature
                    </p>
                </div>
            </div>

            {/* Print Style */}
            <style>{`
                @media print {
                    @page { size: A5; margin: 10mm; }

                    /* Hide everything except print area */
                    body * {
                        visibility: hidden;
                    }
                    .print-area, .print-area * {
                        visibility: visible;
                    }

                    .print-area {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        border: none !important;
                        margin: 0;
                        padding: 0;
                        box-shadow: none !important;
                    }

                    /* Hide dashboard layout parts */
                    header, aside, nav, .no-print {
                        display: none !important;
                        visibility: hidden !important;
                    }
                }
            `}</style>
        </AdminDashboardLayout>
    );
}
