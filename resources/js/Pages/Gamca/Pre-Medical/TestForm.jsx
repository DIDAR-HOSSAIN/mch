import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function MedicalExaminationForm() {
    const printRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: "Medical_Examination_Report",
    });

    const cell = "border border-black px-3 py-2 text-sm align-middle font-bold";
    const val = "border border-black px-3 py-6 text-sm w-56 text-center align-middle";

    return (
        <div className="bg-gray-100 p-6 min-h-screen">
            <div
                ref={printRef}
                className="bg-white mx-auto p-8 shadow-lg w-[210mm] min-h-[297mm] text-[13px] border border-black print:shadow-none print:p-8"
            >
                {/* Header */}
                <div className="text-center border-b border-black pb-3 mb-4">
                    <h1 className="font-bold text-xl uppercase">Medical Centre</h1>
                    <p>953, O.R. Nizam Road, Panchlaish, Chattogram-400</p>
                    <p>Mobile: +88018883077569 | GCC Code: 05.02.23</p>
                    <h2 className="font-bold underline mt-1 text-base">
                        MEDICAL EXAMINATION REPORT
                    </h2>
                </div>

                {/* Patient Info */}
                <div className="grid grid-cols-2 gap-6 mb-4">
                    <div className="space-y-2">
                        <p>Reg No: __________________________</p>
                        <p>Name: ____________________________</p>
                        <p>Passport No: ______________________</p>
                        <p>Profession: ________________________</p>
                        <p>Country: __________________________</p>
                    </div>
                    <div className="space-y-2">
                        <p>Date: ____________________________</p>
                        <p>Age: _______ Sex: _______</p>
                        <p>Date of Birth: ____________________</p>
                        <p>Daily S/L: ________________________</p>
                        <p>Physician: ________________________</p>
                    </div>
                </div>

                {/* --- General --- */}
                <h4 className="font-semibold underline mb-1">
                    Medical Examination: General
                </h4>
                <table className="w-full mb-3 border border-black">
                    <tbody>
                        <tr>
                            <td className={cell}>BP</td>
                            <td className={val}></td>
                            <td className={cell}>Pulse/min</td>
                            <td className={val}></td>
                            <td className={cell}>RR/min</td>
                            <td className={val}></td>
                        </tr>
                    </tbody>
                </table>

                {/* --- Vision --- */}
                <h4 className="font-semibold underline mb-1">
                    Visual Acuity (Aided & Unaided)
                </h4>
                <table className="w-full mb-3 border border-black">
                    <tbody>
                        <tr>
                            <td className={cell}>Colour Vision</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-4">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Normal</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Doubtful</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Defective</span>
                                    </label>
                                </div>
                            </td>

                            <td className={cell}>Comments</td>
                            <td className={val}></td>
                        </tr>

                        <tr className="bg-gray-100 font-semibold text-center">
                            <td colSpan="4" className={cell}>Distant / Aided</td>
                        </tr>
                        <tr>
                            <td className={cell}>Left Eye 6/</td>
                            <td className={val}></td>
                            <td className={cell}>Right Eye 6/</td>
                            <td className={val}></td>
                        </tr>
                        <tr className="bg-gray-100 font-semibold text-center">
                            <td colSpan="4" className={cell}>Distant / Unaided</td>
                        </tr>
                        <tr>
                            <td className={cell}>Left Eye 6/</td>
                            <td className={val}></td>
                            <td className={cell}>Right Eye 6/</td>
                            <td className={val}></td>
                        </tr>
                        <tr className="bg-gray-100 font-semibold text-center">
                            <td colSpan="4" className={cell}>Near / Aided</td>
                        </tr>
                        <tr>
                            <td className={cell}>Left Eye 20/</td>
                            <td className={val}></td>
                            <td className={cell}>Right Eye 20/</td>
                            <td className={val}></td>
                        </tr>
                        <tr className="bg-gray-100 font-semibold text-center">
                            <td colSpan="4" className={cell}>Near / Unaided</td>
                        </tr>
                        <tr>
                            <td className={cell}>Left Eye 20/</td>
                            <td className={val}></td>
                            <td className={cell}>Right Eye 20/</td>
                            <td className={val}></td>
                        </tr>
                    </tbody>
                </table>

                {/* --- Hearing --- */}
                <h4 className="font-semibold underline mb-1">Hearing</h4>
                <table className="w-full mb-3 border border-black">
                    <tbody>
                        <tr>
                            <td className={cell}>Left Ear</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Normal</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Abnormal</span>
                                    </label>
                                </div>
                            </td>

                            <td className={cell}>Right Ear</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Normal</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Abnormal</span>
                                    </label>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>


                {/* {System Examination} */}
                <h4 className="font-semibold underline mb-1">System Examination</h4>
                <table className="w-full mb-3 border border-black">
                    <tbody>
                        <tr>
                            <td className={cell}>General Appearance</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>NAD</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Abnormal</span>
                                    </label>
                                </div>
                            </td>

                            <td className={cell}>Cardiovascular</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>NAD</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Abnormal</span>
                                    </label>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className={cell}>Respiratory</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>NAD</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Abnormal</span>
                                    </label>
                                </div>
                            </td>

                            <td className={cell}>ENT</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>NAD</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Abnormal</span>
                                    </label>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* {Gastro Intestinal } */}
                <table className="w-full mb-3 border border-black">
                    <tr className="bg-gray-100 font-semibold text-center">
                        <td colSpan="8" className={cell}>Gastro Intestinal</td>
                    </tr>
                    <tbody>
                        <tr>
                            <td className={cell}>Abdomen (Mass, tenderness)
                            </td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>NAD</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Abnormal</span>
                                    </label>
                                </div>
                            </td>

                            <td className={cell}>Hernia</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>NAD</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Abnormal</span>
                                    </label>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* {Genitourinary} */}
                <table className="w-full mb-3 border border-black">
                    <tr className="bg-gray-100 font-semibold text-center">
                        <td colSpan="8" className={cell}>Genitourinary</td>
                    </tr>
                    <tbody>
                        <tr>
                            <td className={cell}>Genitourinary
                            </td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>NAD</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Abnormal</span>
                                    </label>
                                </div>
                            </td>

                            <td className={cell}>Hydrocele</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>NAD</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Abnormal</span>
                                    </label>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* {Musculoskeletal } */}
                <table className="w-full mb-3 border border-black">
                    <tbody>
                        <tr className="bg-gray-100 font-semibold text-center">
                            <td colSpan="8" className={cell}>Musculoskeletal</td>
                        </tr>

                        <tr>
                            <td className={cell}>Extremities</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>NAD</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Abnormal</span>
                                    </label>
                                </div>
                            </td>

                            <td className={cell}>Back</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>NAD</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Abnormal</span>
                                    </label>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className={cell}>Skin</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>NAD</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Abnormal</span>
                                    </label>
                                </div>
                            </td>

                            <td className={cell}>C.N.S.</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>NAD</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Abnormal</span>
                                    </label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className={cell}>Deformities</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>NAD</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Abnormal</span>
                                    </label>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* --- Mental Status --- */}
                <table className="w-full mb-3 border border-black">
                    <tbody>
                        <tr className="bg-gray-100 font-semibold text-center">
                            <td colSpan="8" className={cell}>Mental status examination</td>
                        </tr>

                        <tr>
                            <td className={cell}>Appearance</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>NAD</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Abnormal</span>
                                    </label>
                                </div>
                            </td>

                            <td className={cell}>Speech</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>NAD</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Abnormal</span>
                                    </label>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className={cell}>Behaviour</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>NAD</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Abnormal</span>
                                    </label>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* {Cognition} */}
                <table className="w-full mb-3 border border-black">
                    <tbody>
                        <tr className="bg-gray-100 font-semibold text-center">
                            <td colSpan="8" className={cell}>Cognition</td>
                        </tr>

                        <tr>
                            <td className={cell}>Cognition</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>NAD</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Abnormal</span>
                                    </label>
                                </div>
                            </td>

                            <td className={cell}>Orientation</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>NAD</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Abnormal</span>
                                    </label>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className={cell}>Memory</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>NAD</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Abnormal</span>
                                    </label>
                                </div>
                            </td>

                            <td className={cell}>Concentration</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>NAD</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Abnormal</span>
                                    </label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className={cell}>Mood</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>NAD</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Abnormal</span>
                                    </label>
                                </div>
                            </td>
                            <td className={cell}>Thoughts</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>NAD</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Abnormal</span>
                                    </label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className={cell}>Others </td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">

                                </div>
                            </td>
                            <td className={cell}>Remarks </td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">

                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* --- Investigation --- */}
                <h4 className="font-semibold underline mb-1">Investigation</h4>
                <table className="w-full mb-3 border border-black">
                    <tbody>
                        <tr>
                            <td className={cell}>Chest X-Ray</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>NAD</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Abnormal</span>
                                    </label>
                                </div>
                            </td>
                            <td className={cell}>Comment</td>
                            <td className={val}></td>
                        </tr>
                    </tbody>
                </table>

                {/* --- Laboratory Investigation --- */}
                <h4 className="font-semibold underline mb-1">Laboratory Investigation</h4>
                <table className="w-full mb-3 border border-black">
                    <tbody>
                        <tr className="bg-gray-100 font-semibold text-center">
                            <td colSpan="8" className={cell}>Blood</td>
                        </tr>
                        <tr>
                            <td className={cell}>Blood Group</td>
                            <td className={val}></td>
                            <td className={cell}>Haemoglobin</td>
                            <td className={val}></td>
                        </tr>
                    </tbody>
                </table>

                {/* {Thick film for} */}
                <table className="w-full mb-3 border border-black">
                    <tr className="bg-gray-100 font-semibold text-center">
                        <td colSpan="8" className={cell}>Thick film for</td>
                    </tr>
                    <tbody>
                        <tr>
                            <td className={cell}>Malaria
                            </td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Absent</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Present</span>
                                    </label>
                                </div>
                            </td>

                            <td className={cell}>Micro filaria</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Absent</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Present</span>
                                    </label>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* {Biochemistry} */}
                <table className="w-full mb-3 border border-black">
                    <tr className="bg-gray-100 font-semibold text-center">
                        <td colSpan="8" className={cell}>Biochemistry</td>
                    </tr>
                    <tbody>
                        <tr>
                            <td className={cell}>R.B.S
                            </td>
                            <td className={`${val} text-left`}>

                            </td>

                            <td className={cell}>L.F.T</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Normal</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Abnormal</span>
                                    </label>
                                </div>
                            </td>
                            <td className={cell}>Creatinine</td>
                            <td className={`${val} text-left`}>

                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* {Serology } */}
                <table className="w-full mb-3 border border-black">
                    <tbody>
                        <tr className="bg-gray-100 font-semibold text-center">
                            <td colSpan="8" className={cell}>Serology</td>
                        </tr>

                        <tr>
                            <td className={cell}>HIVI&II</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Negative</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Positive</span>
                                    </label>
                                </div>
                            </td>

                            <td className={cell}>HBs Ag</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Negative</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Positive</span>
                                    </label>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className={cell}>Anti HCV</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Negative</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Positive</span>
                                    </label>
                                </div>
                            </td>

                            <td className={cell}>VDRL</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Negative</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Positive</span>
                                    </label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className={cell}>TPHA (if VDRL positive)</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Negative</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Positive</span>
                                    </label>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* {Urine } */}
                <table className="w-full mb-3 border border-black">
                    <tr className="bg-gray-100 font-semibold text-center">
                        <td colSpan="8" className={cell}>Urine</td>
                    </tr>
                    <tbody>
                        <tr>
                            <td className={cell}>Sugar
                            </td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Negative</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Positive</span>
                                    </label>
                                </div>
                            </td>

                            <td className={cell}>Albumin</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Negative</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Positive</span>
                                    </label>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>


                {/* {Stool/Routine } */}
                <h4 className="font-semibold underline mb-1">Stool/Routine </h4>
                <table className="w-full mb-3 border border-black">
                    <tbody>
                        <tr>
                            <td className={cell}>Helminthes</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Absent</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Present</span>
                                    </label>
                                </div>
                            </td>

                            <td className={cell}>OVA</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Absent</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Prsent</span>
                                    </label>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className={cell}>CYST</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around px-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Absent</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>Presnt</span>
                                    </label>
                                </div>
                            </td>

                            <td className={cell}>Others </td>
                            <td className={`${val} text-left`}>

                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* --- Vaccination --- */}
                <h4 className="font-semibold underline mb-1">Vaccination Status</h4>
                <table className="w-full mb-6 border border-black">
                    <tbody>
                        <tr>
                            <td className={cell}>Polio</td>
                            <td className={val}></td>
                            <td className={cell}>Date</td>
                            <td className={val}></td>
                            <td className={cell}>MMR</td>
                            <td className={val}></td>
                            <td className={cell}>Date</td>
                            <td className={val}></td>
                        </tr>
                        <tr>
                            <td className={cell}>COVID-19</td>
                            <td className={val}></td>
                            <td className={cell}>Date</td>
                            <td className={val}></td>
                            <td className={cell}>Others</td>
                            <td className={val}></td>
                            <td className={cell}>Date</td>
                            <td className={val}></td>
                        </tr>
                    </tbody>
                </table>

                {/* Signature */}
                <div className="flex justify-between mt-10 text-sm">
                    <div>
                        <p>Examined By: ____________________________</p>
                        <p>Designation: ____________________________</p>
                    </div>
                    <div className="text-right">
                        <p>Doctor’s Signature & Seal</p>
                        <div className="border-t border-black w-48 mt-8 mx-auto"></div>
                    </div>
                </div>
            </div>

            {/* Print Button */}
            <div className="text-center mt-6">
                <button
                    onClick={handlePrint}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 shadow-md"
                >
                    🖨️ Print Blank Form
                </button>
            </div>
        </div>
    );
}


