import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
// 🔹 Add logo import
import logo from "../../../assets/images/Logo/mch-logo.png"; // adjust path if your file is deeper

const MoneyReceipt = ({ receipt }) => {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Money Receipt",
    });

    const photoUrl =
        receipt?.photo ||
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

    const passengerName = `${receipt?.first_name || ""} ${receipt?.last_name || ""}`.trim();

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
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            {/* Print Button */}
            <button
                onClick={handlePrint}
                className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
                🖨️ Print Money Receipt
            </button>

            {/* Printable Area */}
            <div
                ref={componentRef}
                className="bg-white p-6 w-[210mm] rounded-md border border-gray-300"
            >
                <ReceiptSection
                    title="Money Receipt (Office Copy)"
                    receipt={receipt}
                    passengerName={passengerName}
                    photoUrl={photoUrl}
                    formatDate={formatDate}
                    showAuthTable={false}
                />

                <hr className="my-6 border-dashed border-gray-400" />

                <ReceiptSection
                    title="Money Receipt (Passenger Copy)"
                    receipt={receipt}
                    passengerName={passengerName}
                    photoUrl={photoUrl}
                    formatDate={formatDate}
                    showAuthTable={true}
                />
            </div>
        </div>
    );
};

const ReceiptSection = ({
    title,
    receipt,
    passengerName,
    photoUrl,
    formatDate,
    showAuthTable,
}) => {
    return (
        <div className="text-sm text-gray-900">
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
                <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
                <div className="flex-1 text-center">
                    <h1 className="text-lg font-bold">MEDICAL CENTRE</h1>
                    <p className="text-xs">953, Nizam Road, Panchlaish, Chattogram-4000</p>
                    <p className="text-xs">
                        Mobile: +88 01883077569 | Email: medicalcentrebd@gmail.com
                    </p>
                    <p className="text-xs font-semibold mt-1">
                        GCC Code: <span className="font-bold">05.02.23</span>
                    </p>
                </div>
                <div className="w-12 h-12" />
            </div>

            {/* Title */}
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold underline text-center flex-1">
                    {title}
                </h2>
                <img
                    src={photoUrl}
                    alt="Passenger"
                    className="w-16 h-16 object-cover border rounded ml-4"
                />
            </div>

            {/* Info Rows */}
            <div className="grid grid-cols-2 gap-x-10 mb-4">
                {/* LEFT COLUMN */}
                <div className="space-y-1">
                    <p><strong>Passenger Name:</strong> {passengerName}</p>
                    <p><strong>Passport No:</strong> {receipt?.passport_no}</p>
                    <p><strong>Country Name:</strong> {receipt?.country_name}</p>
                    <p><strong>Date Of Birth:</strong> {formatDate(receipt?.date_of_birth)}</p>
                    <p><strong>As Sum of Tk:</strong> {receipt?.amount} BDT</p>
                    <p><strong>Received Date:</strong> {formatDate(receipt?.received_date)}</p>
                    <p><strong>Report Date:</strong> {formatDate(receipt?.report_date)}</p>
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-1">
                    <p><strong>Daily Serial No:</strong> {receipt?.serial_no}</p>
                    <p><strong>GCC Slip No:</strong> {receipt?.gcc_slip_no}</p>
                    <p><strong>GCC Slip Date:</strong> {formatDate(receipt?.gcc_slip_date)}</p>
                    <p><strong>Expired Date:</strong> {formatDate(receipt?.expired_date)}</p>
                    <p><strong>Passenger Mobile No:</strong> {receipt?.mobile_no}</p>
                </div>
            </div>

            {/* Authentication Table (only for Passenger Copy) */}
            {showAuthTable && (
                <div className="border border-gray-400 mt-3 mb-3 text-center text-xs w-2/3 mx-auto">
                    <div className="border-b border-gray-400 py-1 font-semibold bg-gray-50">
                        Authentication of Examinee
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-gray-400">
                        <div className="flex flex-col divide-y divide-gray-400">
                            <div className="py-1 px-2">Physician</div>
                            <div className="py-1 px-2">Radiographer</div>
                            <div className="py-1 px-2">Sample Collector</div>
                            <div className="py-1 px-2">Vaccinator</div>
                        </div>
                        <div className="flex flex-col divide-y divide-gray-400">
                            <div className="py-1 px-2">&nbsp;</div>
                            <div className="py-1 px-2">&nbsp;</div>
                            <div className="py-1 px-2">&nbsp;</div>
                            <div className="py-1 px-2">&nbsp;</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Signature Section */}
            {title === "Money Receipt (Office Copy)" ? (
                <div className="flex justify-between items-center mt-6 text-sm">
                    <div className="border-t border-gray-400 w-48 text-center pt-1">
                        Passenger’s Signature
                    </div>
                    <div className="border-t border-gray-400 w-48 text-center pt-1">
                        Authorize Signature
                    </div>
                </div>
            ) : (
                <div className="flex justify-end items-center mt-6 text-sm">
                    <div className="border-t border-gray-400 w-48 text-center pt-1">
                        Authorize Signature
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className="mt-3 text-xs text-center text-gray-600 border-t border-dashed pt-2">
                শুক্রবার এবং সরকারি ছুটির দিন বন্ধ । In case of Technical / Electrical failure,
                Delivery Reports may be Delayed.
            </div>
        </div>
    );
};

export default MoneyReceipt;
