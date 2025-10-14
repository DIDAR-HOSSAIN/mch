import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const MoneyReceipt = () => {
    const componentRef = useRef();

    // ✅ Print function
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Money Receipt",
    });

    // ✅ Dummy data (তুমি এখানে তোমার আসল ডেটা বসাতে পারো)
    const data = {
        id_no: "25OM092",
        passenger_name: "ABDULLAH AL MASUM",
        passport_no: "S599998",
        country: "SULTANATE OF OMAN",
        dob: "25-Sep-2002",
        slip_date: "27-Sep-2025",
        report_date: "01/10/2025",
        amount: "8,500.00",
        phone: "01856444444",
        daily_serial: "4",
        photo: "https://i.ibb.co/D8W3LJ0/sample-photo.jpg", // তোমার ইমেজ URL বসাও
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            {/* Print Button */}
            <button
                onClick={handlePrint}
                className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md"
            >
                🖨️ Print Money Receipt
            </button>

            {/* Printable Area */}
            <div
                ref={componentRef}
                className="bg-white p-6 w-[210mm] shadow-md rounded-md border border-gray-300"
            >
                {/* Office Copy */}
                <ReceiptSection data={data} title="Money Receipt (Office Copy)" />

                <hr className="my-6 border-dashed border-gray-400" />

                {/* Passenger Copy */}
                <ReceiptSection data={data} title="Money Receipt (Passenger Copy)" />
            </div>
        </div>
    );
};

// 🔹 Component for One Copy
const ReceiptSection = ({ data, title }) => {
    return (
        <div className="text-sm text-gray-800">
            <div className="flex justify-between items-start mb-3">
                <h2 className="text-lg font-bold text-center w-full underline">
                    {title}
                </h2>
                <img
                    src={data.photo}
                    alt="Passenger"
                    className="w-16 h-16 object-cover border rounded ml-4"
                />
            </div>

            <div className="grid grid-cols-2 gap-x-6 mb-2">
                <p>
                    <strong>ID No:</strong> {data.id_no}
                </p>
                <p>
                    <strong>Daily Serial No:</strong> {data.daily_serial}
                </p>
                <p>
                    <strong>Passenger Name:</strong> {data.passenger_name}
                </p>
                <p>
                    <strong>Passport No:</strong> {data.passport_no}
                </p>
                <p>
                    <strong>Country Name:</strong> {data.country}
                </p>
                <p>
                    <strong>GHC Slip Date:</strong> {data.slip_date}
                </p>
                <p>
                    <strong>Date Of Birth:</strong> {data.dob}
                </p>
                <p>
                    <strong>Report Date:</strong> {data.report_date}
                </p>
            </div>

            <p>
                <strong>As Sum of Tk:</strong> {data.amount} BDT
            </p>
            <p className="mb-3">
                <strong>Mobile Phone:</strong> {data.phone}
            </p>

            <p className="text-justify text-xs mt-2 leading-relaxed">
                I, the undersigned expatriate coming to GHC states for work or residence,
                hereby consent to and authorize IFTHI MEDICAL & DIAGNOSTIC LTD for the
                performance of any examinations, medical services, and diagnostic
                procedures as ordered or approved by the Regulations of Medical
                Examination of Expatriates Coming to GHC States for Work or Residence.
            </p>

            <div className="flex justify-between items-center mt-6 text-sm">
                <div className="border-t border-gray-400 w-48 text-center pt-1">
                    Passenger’s Signature
                </div>
                <div className="border-t border-gray-400 w-48 text-center pt-1">
                    Authorize Signature
                </div>
            </div>

            <div className="mt-4 text-center text-xs text-gray-600">
                <p>Medical Centre</p>
                <p>953, On Nizam Road, Panchlaish, Chattogram-400</p>
                <p>Mobile: +88 01883077569</p>
                <p className="mt-1">GCC Code: 05.02.23</p>
            </div>
        </div>
    );
};

export default MoneyReceipt;
