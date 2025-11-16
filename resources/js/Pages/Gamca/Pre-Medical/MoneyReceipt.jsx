import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Head } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import logo from "../../../assets/images/Logo/mch-logo.png";
import MedicalExaminationForm from "./TestForm";
import XrayReport from "./XrayForm";
import BarcodeLabel from "./BarcodeLabel";

const MoneyReceipt = ({ auth, receipt }) => {
    const printRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: `Full Report - ${receipt?.pre_medical_id || ""}`,
        pageStyle: `
          @page {
            size: A4;
            margin: 0;
          }
          body {
            margin: 0;
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .a4-page {
            width: 210mm !important;
            min-height: 297mm !important;
            margin: 0 auto !important;
            background: white !important;
            border: 1px solid #333 !important;
            box-sizing: border-box !important;
            page-break-after: always !important;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly !important;
            padding: 10mm 12mm !important;
          }
          * {
            font-family: Arial, sans-serif !important;
            box-sizing: border-box !important;
          }
          /* Hide non-print elements */
          button, .no-print, header, aside {
            display: none !important;
          }
        `,
    });

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        return d.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <AdminDashboardLayout
            user={auth?.user}
            header={
                <h2 className="text-xl font-semibold">Pre Medical Money Receipt</h2>
            }
        >
            <Head title="Pre Medical Money Receipt" />

            <div className="min-h-screen w-2/3 mx-auto">
                {/* Print Button */}

                    <button
                        className="w-full mb-6 bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 rounded-md shadow-md font-semibold print:hidden"
                        onClick={handlePrint}
                    >
                        🖨️ Print
                    </button>


                {/* 👇 Printable Area */}
                <div ref={printRef}>
                    {/* Page 1: Money Receipt */}
                    <div className="a4-page shadow-lg rounded-md">
                        <ReceiptSection
                            title="MONEY RECEIPT (OFFICE COPY)"
                            receipt={receipt}
                            formatDate={formatDate}
                            showAuthTable={false}
                        />

                        <div className="my-3 border-t border-dashed border-gray-700" />

                        <ReceiptSection
                            title="MONEY RECEIPT (PASSENGER COPY)"
                            receipt={receipt}
                            formatDate={formatDate}
                            showAuthTable={true}
                        />
                    </div>

                    {/* Page 2: Medical Examination Form */}
                    <div>
                        <MedicalExaminationForm receipt={receipt} />
                    </div>

                    {/* Page 3: X-ray Report */}
                    <div>
                        <XrayReport receipt={receipt} />
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

const ReceiptSection = ({ title, receipt, formatDate, showAuthTable }) => (
    <div className="text-[14px] text-gray-900 leading-tight font-semibold">
        <div className="flex justify-between items-center mb-1">
            <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
            {/* Header */}
            <div className="text-center pb-2 mb-2">
                <h1 className="font-bold text-xl uppercase">Medical Centre</h1>
                <p>953, O.R. Nizam Road, Panchlaish, Chattogram-400</p>
                <p>Mobile: +88018883077569 | GCC Code: 05/02/23</p>
                <h2 className="font-bold underline mt-1 text-base">
                    MEDICAL EXAMINATION REPORT
                </h2>
            </div>
            <div className="w-10 h-2" />
        </div>

        <div className="flex justify-between items-center mb-1 border-b border-gray-800 pb-1">
            <h2 className="text-[11px] font-bold underline text-center flex-1 uppercase">{title}</h2>
            {receipt?.photo && (
                <img
                    src={`/images/passengers/${receipt.photo}`}
                    alt="Passenger"
                    className="w-16 h-16 object-cover rounded border border-gray-700 ml-2"
                />
            )}
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-1">
            <div className="my-2">
                <p className="border border-gray-700 rounded px-1 py-0.5 inline-block bg-gray-50">
                    <strong>ID No:</strong> {receipt?.pre_medical_id}
                </p>
                <p><strong>Passenger Name:</strong> {receipt?.first_name} {receipt?.last_name}</p>
                <p><strong>Passport No:</strong> {receipt?.passport_no}</p>
                <p><strong>Country Name:</strong> {receipt?.country_name}</p>
                <p><strong>Date Of  Birth:</strong> {formatDate(receipt?.date_of_birth)}</p>
                <p><strong>Medical Fee:</strong> {receipt?.amount} BDT</p>
                <p><strong>Received Date:</strong> {formatDate(receipt?.entry_date)}</p>
                <p><strong>Report Date:</strong> {formatDate(receipt?.report_date)}</p>
            </div>

            <div className="space-y-1">
                <BarcodeLabel entry={receipt} />
                <p><strong>Daily Serial:</strong> {receipt?.serial_no}</p>
                <p><strong>GCC Slip No:</strong> {receipt?.gcc_slip_no}</p>
                <p><strong>GCC Slip Date:</strong> {formatDate(receipt?.gcc_slip_date)}</p>
                <p><strong>Expired:</strong> {formatDate(receipt?.expire_days)}</p>
                <p><strong>Mobile:</strong> {receipt?.mobile_no}</p>
            </div>
        </div>

        {showAuthTable && (
            <div className="border border-gray-800 mt-1 mb-1 text-center text-[9px] w-2/4 rounded-md overflow-hidden">
                <div className="border-b border-gray-800 py-1 font-bold bg-gray-100">
                    Authentication of Examinee
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-800">
                    <div className="flex flex-col divide-y divide-gray-800">
                        {["Physician", "Radiographer", "Sample Collector", "Vaccinator"].map(role => (
                            <div key={role} className="py-1 px-1">{role}</div>
                        ))}
                    </div>
                    <div className="flex flex-col divide-y divide-gray-800">
                        {Array(4).fill().map((_, i) => <div key={i} className="py-1 px-1">&nbsp;</div>)}
                    </div>
                </div>
            </div>
        )}

        <div className="flex justify-between items-center mt-10 text-[9px]">
            <div className="border-t border-gray-800 w-32 text-center pt-1">
                Passenger’s Signature
            </div>
            <div className="border-t border-gray-800 w-32 text-center pt-1">
                Authorize Signature
            </div>
        </div>

        <div className="mt-2 text-[8px] text-center text-gray-800 border-t border-dashed border-gray-800 pt-1 italic">
            শুক্রবার এবং সরকারি ছুটির দিন বন্ধ । In case of Technical / Electrical failure, delivery of reports may be delayed.
        </div>
    </div>
);

export default MoneyReceipt;
