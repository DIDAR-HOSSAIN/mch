import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import logo from "../../../assets/images/Logo/mch-logo.png";

const MoneyReceipt = ({ receipt }) => {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `Money Receipt - ${receipt?.pre_medical_id || ""}`,
        pageStyle: `
      @page {
        size: A4;
        margin: 0; /* Remove browser default top/bottom margin */
      }
      body {
        margin: 0;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        background: white !important;
      }
      .print-area {
        width: 210mm !important;
        min-height: 297mm !important;
        padding: 15mm; /* Customize padding */
        box-sizing: border-box;
        margin: 0 auto !important;
        overflow: hidden !important;
        page-break-inside: avoid;
      }
      button {
        display: none !important;
      }
      * {
        font-family: Arial, sans-serif !important;
        font-weight: 600 !important;
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
        <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10 print:py-0">
            <button
                onClick={handlePrint}
                className="mb-6 bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-md shadow-md font-semibold print:hidden"
            >
                🖨️ Print Money Receipt
            </button>

            <div
                ref={componentRef}
                className="print-area bg-white rounded-md shadow-md print:rounded-none print:shadow-none"
            >
                <ReceiptSection
                    title="MONEY RECEIPT (OFFICE COPY)"
                    receipt={receipt}
                    formatDate={formatDate}
                    showAuthTable={false}
                />

                <hr className="my-6 border-dashed border-gray-700" />

                <ReceiptSection
                    title="MONEY RECEIPT (PASSENGER COPY)"
                    receipt={receipt}
                    formatDate={formatDate}
                    showAuthTable={true}
                />
            </div>
        </div>
    );
};

const ReceiptSection = ({ title, receipt, formatDate, showAuthTable }) => (
    <div className="text-[12px] text-gray-900 leading-relaxed font-semibold">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
            <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />
            <div className="flex-1 text-center">
                <h1 className="text-xl font-bold tracking-wide uppercase">
                    MEDICAL CENTRE
                </h1>
                <p className="text-xs font-medium">
                    953, Nizam Road, Panchlaish, Chattogram-4000
                </p>
                <p className="text-xs font-medium">
                    Mobile: +88 01883077569 | Email: medicalcentrebd@gmail.com
                </p>
                <p className="text-xs font-bold mt-1">
                    GCC Code: <span className="font-bold">05.02.23</span>
                </p>
            </div>
            <div className="w-14 h-14" />
        </div>

        {/* Title + Photo */}
        <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
            <h2 className="text-lg font-bold underline text-center flex-1 uppercase">
                {title}
            </h2>
            {receipt?.photo && (
                <img
                    src={`/images/passengers/${receipt.photo}`}
                    alt="Passenger"
                    className="w-24 h-24 object-cover rounded border border-gray-700 ml-4"
                />
            )}
        </div>

        {/* Info Rows */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-2 mb-4">
            <div className="space-y-1">
                <p className="border border-gray-700 rounded px-2 py-1 inline-block bg-gray-50">
                    <strong>ID No:</strong> {receipt?.pre_medical_id}
                </p>
                <p>
                    <strong>Passenger Name:</strong> {receipt?.first_name} {receipt?.last_name}
                </p>
                <p>
                    <strong>Passport No:</strong> {receipt?.passport_no}
                </p>
                <p>
                    <strong>Country Name:</strong> {receipt?.country_name}
                </p>
                <p>
                    <strong>Date of Birth:</strong> {formatDate(receipt?.date_of_birth)}
                </p>
                <p>
                    <strong>As Sum of Tk:</strong> {receipt?.amount} BDT
                </p>
                <p>
                    <strong>Received Date:</strong> {formatDate(receipt?.received_date)}
                </p>
                <p>
                    <strong>Report Date:</strong> {formatDate(receipt?.report_date)}
                </p>
            </div>
            <div className="space-y-1">
                <p>
                    <strong>Daily Serial No:</strong> {receipt?.serial_no}
                </p>
                <p>
                    <strong>GCC Slip No:</strong> {receipt?.gcc_slip_no}
                </p>
                <p>
                    <strong>GCC Slip Date:</strong> {formatDate(receipt?.gcc_slip_date)}
                </p>
                <p>
                    <strong>Expired Date:</strong> {formatDate(receipt?.expired_date)}
                </p>
                <p>
                    <strong>Passenger Mobile No:</strong> {receipt?.mobile_no}
                </p>
            </div>
        </div>

        {/* Authentication Table */}
        {showAuthTable && (
            <div className="border border-gray-800 mt-6 mb-4 text-center text-xs w-3/4 mx-auto rounded-md overflow-hidden">
                <div className="border-b border-gray-800 py-1 font-bold bg-gray-100">
                    Authentication of Examinee
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-800">
                    <div className="flex flex-col divide-y divide-gray-800">
                        {["Physician", "Radiographer", "Sample Collector", "Vaccinator"].map(
                            (role) => (
                                <div key={role} className="py-1 px-2">
                                    {role}
                                </div>
                            )
                        )}
                    </div>
                    <div className="flex flex-col divide-y divide-gray-800">
                        {Array(4)
                            .fill()
                            .map((_, i) => (
                                <div key={i} className="py-1 px-2">
                                    &nbsp;
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        )}

        {/* Signature */}
        {title.includes("OFFICE") ? (
            <div className="flex justify-between items-center mt-10 text-sm">
                <div className="border-t border-gray-800 w-48 text-center pt-1">
                    Passenger’s Signature
                </div>
                <div className="border-t border-gray-800 w-48 text-center pt-1">
                    Authorize Signature
                </div>
            </div>
        ) : (
            <div className="flex justify-end items-center mt-10 text-sm">
                <div className="border-t border-gray-800 w-48 text-center pt-1">
                    Authorize Signature
                </div>
            </div>
        )}

        {/* Footer */}
        <div className="mt-6 text-xs text-center text-gray-800 border-t border-dashed border-gray-800 pt-2 italic">
            শুক্রবার এবং সরকারি ছুটির দিন বন্ধ । In case of Technical / Electrical failure, delivery of reports may be delayed.
        </div>
    </div>
);

export default MoneyReceipt;
