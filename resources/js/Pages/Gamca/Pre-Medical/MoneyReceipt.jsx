import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import logo from "../../../assets/images/Logo/mch-logo.png";
import MedicalExaminationForm from "./TestForm";
import XrayReport from "./XrayForm";

const MoneyReceipt = ({ receipt }) => {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `Money Receipt - ${receipt?.pre_medical_id || ""}`,
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
        height: 297mm !important;
        margin: 0 auto !important;
        background: white !important;
        border: 1px solid #333 !important;
        box-sizing: border-box !important;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly !important; /* আগে ছিল space-evenly */
        padding: 10mm 12mm !important;
      }
      * {
        font-family: Arial, sans-serif !important;
        box-sizing: border-box !important;
      }
      button {
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
        <div className="min-h-screen justify-between items-center w-2/3 mx-auto print:py-0">
            <button
                onClick={handlePrint}
                className="mb-6 bg-blue-700 hover:bg-blue-800 text-white px-2 py-2 rounded-md shadow-md font-semibold print:hidden"
            >
                🖨️ Print Money Receipt
            </button>

            <div
                ref={componentRef}
                className="a4-page shadow-lg rounded-md print:shadow-none print:rounded-none"
            >
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

            {/* পেজ ২: Medical Examination Form */}
            <div className="page a4-page border border-gray-400 rounded-md shadow-md p-6">
                <MedicalExaminationForm receipt={receipt} />
            </div>

            {/* পেজ 3: Medical Examination Form */}
            <div className="page a4-page border border-gray-400 rounded-md shadow-md p-6">
                <XrayReport receipt={receipt} />
            </div>
        </div>
    );
};

const ReceiptSection = ({ title, receipt, formatDate, showAuthTable }) => (
    <div className="text-[10px] text-gray-900 leading-tight font-semibold">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
            <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
            <div className="flex-1 text-center">
                <h1 className="text-lg font-bold uppercase leading-none">MEDICAL CENTRE</h1>
                <p className="text-[9px] leading-none">953, Nizam Road, Panchlaish, Chattogram-4000</p>
                <p className="text-[9px] leading-none">Mobile: +88 01883077569 | Email: medicalcentrebd@gmail.com</p>
                <p className="text-[9px] font-bold leading-none">GCC Code: 05/02/23</p>
            </div>
            <div className="w-10 h-2" />
        </div>

        {/* Title + Photo */}
        <div className="flex justify-between items-center mb-2 border-b border-gray-800 pb-1">
            <h2 className="text-[11px] font-bold underline text-center flex-1 uppercase">{title}</h2>
            {receipt?.photo && (
                <img
                    src={`/images/passengers/${receipt.photo}`}
                    alt="Passenger"
                    className="w-16 h-16 object-cover rounded border border-gray-700 ml-2"
                />
            )}
        </div>

        {/* Info Rows */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-2">
            <div className="space-y-1">
                <p className="border border-gray-700 rounded px-1 py-0.5 inline-block bg-gray-50">
                    <strong>ID No:</strong> {receipt?.pre_medical_id}
                </p>
                <p><strong>Name:</strong> {receipt?.first_name} {receipt?.last_name}</p>
                <p><strong>Passport:</strong> {receipt?.passport_no}</p>
                <p><strong>Country:</strong> {receipt?.country_name}</p>
                <p><strong>DOB:</strong> {formatDate(receipt?.date_of_birth)}</p>
                <p><strong>Amount:</strong> {receipt?.amount} BDT</p>
                <p><strong>Received:</strong> {formatDate(receipt?.received_date)}</p>
                <p><strong>Report:</strong> {formatDate(receipt?.report_date)}</p>
            </div>

            <div className="space-y-1">
                <p><strong>Daily Serial:</strong> {receipt?.serial_no}</p>
                <p><strong>GCC Slip No:</strong> {receipt?.gcc_slip_no}</p>
                <p><strong>GCC Date:</strong> {formatDate(receipt?.gcc_slip_date)}</p>
                <p><strong>Expired:</strong> {formatDate(receipt?.expired_date)}</p>
                <p><strong>Mobile:</strong> {receipt?.mobile_no}</p>
            </div>
        </div>

        {/* Authentication Table */}
        {showAuthTable && (
            <div className="border border-gray-800 mt-2 mb-2 text-center text-[9px] w-3/4 mx-auto rounded-md overflow-hidden">
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

        {/* Signatures */}
        <div className="flex justify-between items-center mt-10 text-[9px]">
            <div className="border-t border-gray-800 w-32 text-center pt-1">
                Passenger’s Signature
            </div>
            <div className="border-t border-gray-800 w-32 text-center pt-1">
                Authorize Signature
            </div>
        </div>

        {/* Footer */}
        <div className="mt-2 text-[8px] text-center text-gray-800 border-t border-dashed border-gray-800 pt-1 italic">
            শুক্রবার এবং সরকারি ছুটির দিন বন্ধ । In case of Technical / Electrical failure, delivery of reports may be delayed.
        </div>
    </div>
);

export default MoneyReceipt;
