import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import logo from "../../../assets/images/Logo/mch-logo.png"; // ← তোমার লোগো ফাইলের পথ ঠিক করে নিও

const XrayReport = ({ receipt }) => {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "X-Ray Report",
        pageStyle: `
      @page {
        size: A4;
        margin: 15mm;
      }
      body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      button {
        display: none !important;
      }
    `,
    });

    return (
        <div className="flex flex-col items-center my-6">
            <button
                onClick={handlePrint}
                className="mb-4 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 print:hidden"
            >
                🖨️ Print X-Ray Report
            </button>

            <div
                ref={componentRef}
                className="a4-page w-[210mm] h-[297mm] bg-white border border-black p-10 text-[12px] leading-tight font-sans"
            >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <img src={logo} alt="Logo" className="w-20 h-20 object-contain" />
                    <div className="text-center flex-1">
                        <h1 className="text-lg font-bold uppercase">Medical Centre</h1>
                        <p className="text-[11px] leading-tight">
                            953, O.R Nizam Road, Panchlaish, Chattogram-4000.
                        </p>
                        <p className="text-[11px] leading-tight font-semibold">
                            Mobile Phone: +88 01883077569
                        </p>
                        <p className="text-[11px] italic">www.medicalcentreg.com</p>
                        <p className="text-[11px] font-bold mt-1">GCC Code : 05.02.23</p>
                    </div>
                </div>

                {/* Report Title */}
                <div className="text-center mb-3">
                    <h2 className="border border-black inline-block px-4 py-1 font-bold">
                        X-RAY REPORT
                    </h2>
                </div>

                {/* Date & ID Section */}
                <table className="w-full border border-black text-[12px] mb-2">
                    <tbody>
                        <tr className="border-b border-black">
                            <td className="w-1/6 font-semibold px-2 py-1">DATE</td>
                            <td className="w-1/2 border-l border-black px-2 py-1">
                                {receipt?.entry_date || ""}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold px-2 py-1">ID. NO.</td>
                            <td className="border-l border-black px-2 py-1">
                                {receipt?.pre_medical_id || ""}
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Info Table */}
                <table className="w-full border border-black text-[12px] mb-6">
                    <tbody>
                        <tr className="border-b border-black">
                            <td className="w-[40px] text-center border-r border-black">1</td>
                            <td className="px-2 py-1 w-1/4">Name</td>
                            <td className="w-1 text-center">:</td>
                            <td className="px-2">{receipt?.first_name || ""} {receipt?.last_name || ""}</td>
                        </tr>
                        <tr className="border-b border-black">
                            <td className="text-center border-r border-black">2</td>
                            <td className="px-2 py-1">Sex</td>
                            <td className="text-center">:</td>
                            <td className="px-2">{receipt?.sex || ""}</td>
                        </tr>
                        <tr className="border-b border-black">
                            <td className="text-center border-r border-black">3</td>
                            <td className="px-2 py-1">Date of birth</td>
                            <td className="text-center">:</td>
                            <td className="px-2">{receipt?.date_of_birth || ""}</td>
                        </tr>
                        <tr>
                            <td className="text-center border-r border-black">4</td>
                            <td className="px-2 py-1">Passport No.</td>
                            <td className="text-center">:</td>
                            <td className="px-2">{receipt?.passport_no || ""}</td>
                        </tr>
                    </tbody>
                </table>

                {/* X-Ray Section */}
                <h3 className="text-center text-[14px] font-bold mb-2">
                    X-RAY CHEST P / A VIEW
                </h3>

                <div className="border border-black h-[500px] w-full mb-6"></div>

                {/* Doctor Info */}
                <div className="text-right mt-8 text-[11px] leading-tight">
                    <p>...............................................................</p>
                    <p className="font-semibold">DR. JUSTIN CLUMP</p>
                    <p>MBBS, MCPS, MD</p>
                    <p>Consultant Radiologist</p>
                    <p>BMDC Reg. A-47535</p>
                </div>
            </div>
        </div>
    );
};

export default XrayReport;
