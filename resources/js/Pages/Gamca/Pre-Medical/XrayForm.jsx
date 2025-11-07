import React from "react";
import logo from "../../../assets/images/Logo/mch-logo.png";

const XrayReport = ({ receipt }) => {
    return (
        <div className="flex flex-col items-center my-6">
            {/* মূল কনটেন্ট */}
            <div className="a4-page w-[210mm]">
                {/* Header */}
                <div className="flex justify-between items-center mb-2">
                    <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
                    <div className="text-center pb-2 mb-4">
                        <h1 className="font-bold text-xl uppercase">Medical Centre</h1>
                        <p>953, O.R. Nizam Road, Panchlaish, Chattogram-400</p>
                        <p>Mobile: +88018883077569 | GCC Code: 05/02/23</p>
                        <h2 className="font-bold underline mt-1 text-base">
                            MEDICAL EXAMINATION REPORT
                        </h2>
                    </div>
                    <div className="w-10 h-2" />
                </div>

                {/* Report Title */}
                <div className="text-center mb-3">
                    <h2 className="border border-black inline-block px-4 py-1 font-bold tracking-wide bg-gray-100">
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
                            <td className="px-2">
                                {receipt?.first_name || ""} {receipt?.last_name || ""}
                            </td>
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
                <h3 className="text-center text-[14px] font-bold mb-2 text-gray-800">
                    X-RAY CHEST P / A VIEW
                </h3>

                <div className="border border-black h-[500px] w-full mb-6 rounded-sm"></div>

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
