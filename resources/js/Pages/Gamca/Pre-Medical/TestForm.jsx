// import React, { useRef } from "react";
// import { useReactToPrint } from "react-to-print";

// export default function MedicalCheckupStaticForm() {
//     const printRef = useRef();
//     const handlePrint = useReactToPrint({
//         content: () => printRef.current,
//         documentTitle: "Medical_Checkup_Form",
//     });

//     const cell = "border border-black px-2 py-2 h-9 align-top";
//     const wide = "w-56"; // wider field for easy writing

//     return (
//         <div className="bg-gray-100 p-6 min-h-screen">
//             <div
//                 ref={printRef}
//                 className="bg-white mx-auto p-10 shadow-lg w-[210mm] min-h-[297mm] text-[13px] border border-black print:shadow-none print:p-8"
//             >
//                 {/* Header */}
//                 <div className="text-center border-b border-black pb-3 mb-4">
//                     <h1 className="font-bold text-xl uppercase">Medical Centre</h1>
//                     <p>953, O.R. Nizam Road, Panchlaish, Chattogram-400</p>
//                     <p>Mobile: +88018883077569 | GCC Code: 05.02.23</p>
//                     <h2 className="font-bold underline mt-1 text-base">
//                         MEDICAL CHECK-UP FORM
//                     </h2>
//                 </div>

//                 {/* Patient Info */}
//                 <div className="grid grid-cols-2 gap-6 mb-4">
//                     <div className="space-y-2">
//                         <p>Reg No: __________________________</p>
//                         <p>Name: ____________________________</p>
//                         <p>Passport No: ______________________</p>
//                         <p>Profession: ________________________</p>
//                         <p>Country: __________________________</p>
//                     </div>
//                     <div className="space-y-2">
//                         <p>Date: ____________________________</p>
//                         <p>Age: _______ Sex: _______</p>
//                         <p>Date of Birth: ____________________</p>
//                         <p>Daily S/L: ________________________</p>
//                         <p>Physician: ________________________</p>
//                     </div>
//                 </div>

//                 {/* General */}
//                 <table className="w-full mb-3 border border-black text-sm">
//                     <tbody>
//                         <tr>
//                             <td className={cell}>BP</td>
//                             <td className={`${cell} ${wide}`}></td>
//                             <td className={cell}>Pulse/min</td>
//                             <td className={`${cell} ${wide}`}></td>
//                             <td className={cell}>RR/min</td>
//                             <td className={`${cell} ${wide}`}></td>
//                         </tr>
//                     </tbody>
//                 </table>

//                 {/* Vision Section */}
//                 <h4 className="font-semibold underline mb-1">
//                     Visual Acuity (Aided & Unaided)
//                 </h4>
//                 <table className="w-full mb-3 border border-black">
//                     <tbody>
//                         <tr>
//                             <td className={cell}>Colour Vision</td>
//                             <td className={`${cell} ${wide}`}></td>
//                             <td className={cell}>Comments</td>
//                             <td className={`${cell} ${wide}`}></td>
//                         </tr>
//                         <tr className="bg-gray-100 font-semibold text-center">
//                             <td colSpan="4" className={cell}>
//                                 Distant Vision
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className={cell}>Left Eye (Aided)</td>
//                             <td className={`${cell} ${wide}`}></td>
//                             <td className={cell}>Right Eye (Aided)</td>
//                             <td className={`${cell} ${wide}`}></td>
//                         </tr>
//                         <tr>
//                             <td className={cell}>Left Eye (Unaided)</td>
//                             <td className={`${cell} ${wide}`}></td>
//                             <td className={cell}>Right Eye (Unaided)</td>
//                             <td className={`${cell} ${wide}`}></td>
//                         </tr>
//                         <tr className="bg-gray-100 font-semibold text-center">
//                             <td colSpan="4" className={cell}>
//                                 Near Vision
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className={cell}>Left Eye (Aided)</td>
//                             <td className={`${cell} ${wide}`}></td>
//                             <td className={cell}>Right Eye (Aided)</td>
//                             <td className={`${cell} ${wide}`}></td>
//                         </tr>
//                         <tr>
//                             <td className={cell}>Left Eye (Unaided)</td>
//                             <td className={`${cell} ${wide}`}></td>
//                             <td className={cell}>Right Eye (Unaided)</td>
//                             <td className={`${cell} ${wide}`}></td>
//                         </tr>
//                     </tbody>
//                 </table>

//                 {/* Hearing */}
//                 <table className="w-full mb-3 border border-black">
//                     <tbody>
//                         <tr className="bg-gray-100 font-semibold text-center">
//                             <td colSpan="4" className={cell}>
//                                 Hearing
//                             </td>
//                         </tr>
//                         <tr>
//                             <td className={cell}>Left Ear</td>
//                             <td className={`${cell} ${wide}`}></td>
//                             <td className={cell}>Right Ear</td>
//                             <td className={`${cell} ${wide}`}></td>
//                         </tr>
//                     </tbody>
//                 </table>

//                 {/* System Examination */}
//                 <h4 className="font-semibold underline mb-1">System Examination</h4>
//                 <table className="w-full mb-3 border border-black">
//                     <tbody>
//                         {[
//                             ["General Appearance", "Cardiovascular"],
//                             ["Respiratory", "ENT"],
//                             ["Abdomen (Mass, Tenderness)", "Hernia"],
//                             ["Genitourinary", "Hydrocele"],
//                             ["Extremities", "Back"],
//                             ["Skin", "C.N.S."],
//                         ].map((pair, i) => (
//                             <tr key={i}>
//                                 <td className={cell}>{pair[0]}</td>
//                                 <td className={`${cell} ${wide}`}></td>
//                                 <td className={cell}>{pair[1]}</td>
//                                 <td className={`${cell} ${wide}`}></td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>

//                 {/* Mental Status */}
//                 <h4 className="font-semibold underline mb-1">
//                     Mental Status Examination
//                 </h4>
//                 <table className="w-full mb-3 border border-black">
//                     <tbody>
//                         {[
//                             ["Appearance", "Speech"],
//                             ["Behaviour", "Cognition"],
//                             ["Orientation", "Memory"],
//                             ["Mood", "Thoughts"],
//                             ["Others", "Remarks"],
//                         ].map((pair, i) => (
//                             <tr key={i}>
//                                 <td className={cell}>{pair[0]}</td>
//                                 <td className={`${cell} ${wide}`}></td>
//                                 <td className={cell}>{pair[1]}</td>
//                                 <td className={`${cell} ${wide}`}></td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>

//                 {/* Investigation */}
//                 <h4 className="font-semibold underline mb-1">Investigation</h4>
//                 <table className="w-full mb-3 border border-black">
//                     <tbody>
//                         <tr>
//                             <td className={cell}>Chest X-Ray</td>
//                             <td className={`${cell} ${wide}`}></td>
//                             <td className={cell}>Comment</td>
//                             <td className={`${cell} ${wide}`}></td>
//                         </tr>
//                     </tbody>
//                 </table>

//                 {/* Laboratory */}
//                 <h4 className="font-semibold underline mb-1">
//                     Laboratory Investigation
//                 </h4>
//                 <table className="w-full mb-3 border border-black">
//                     <tbody>
//                         {[
//                             ["Blood Group", "Haemoglobin (g/dL)"],
//                             ["Malaria", "Micro Filaria"],
//                             ["R.B.S", "Creatinine"],
//                             ["L.F.T", "HIV I & II"],
//                             ["HBs Ag", "Anti HCV"],
//                             ["VDRL", "TPHA (if VDRL +ve)"],
//                             ["Urine Sugar", "Albumin"],
//                             ["Helminthes", "Ova / Cyst"],
//                         ].map((pair, i) => (
//                             <tr key={i}>
//                                 <td className={cell}>{pair[0]}</td>
//                                 <td className={`${cell} ${wide}`}></td>
//                                 <td className={cell}>{pair[1]}</td>
//                                 <td className={`${cell} ${wide}`}></td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>

//                 {/* Vaccination */}
//                 <h4 className="font-semibold underline mb-1">Vaccination Status</h4>
//                 <table className="w-full mb-6 border border-black">
//                     <tbody>
//                         {[
//                             ["Polio", "Date"],
//                             ["MMR 1", "Date"],
//                             ["MMR 2", "Date"],
//                             ["Meningococcal", "Date"],
//                             ["COVID-19", "Date"],
//                         ].map((pair, i) => (
//                             <tr key={i}>
//                                 <td className={cell}>{pair[0]}</td>
//                                 <td className={`${cell} ${wide}`}></td>
//                                 <td className={cell}>{pair[1]}</td>
//                                 <td className={`${cell} ${wide}`}></td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>

//                 {/* Signature */}
//                 <div className="flex justify-between mt-10 text-sm">
//                     <div>
//                         <p>Examined By: ____________________________</p>
//                         <p>Designation: ____________________________</p>
//                     </div>
//                     <div className="text-right">
//                         <p>Doctor’s Signature & Seal</p>
//                         <div className="border-t border-black w-48 mt-8 mx-auto"></div>
//                     </div>
//                 </div>
//             </div>

//             <div className="text-center mt-6">
//                 <button
//                     onClick={handlePrint}
//                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 shadow-md"
//                 >
//                     🖨️ Print Form
//                 </button>
//             </div>
//         </div>
//     );
// }



import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function MedicalExaminationForm() {
    const printRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: "Medical_Examination_Report",
    });

    const cell = "border border-black px-3 py-2 text-sm align-middle";
    const val = "border border-black px-3 py-5 text-sm w-40 text-center"; // ← বড় writing area

    return (
        <div className="bg-gray-100 p-6 min-h-screen">
            <div
                ref={printRef}
                className="bg-white mx-auto p-10 shadow-lg w-[210mm] min-h-[297mm] text-[13px] border border-black print:shadow-none print:p-8"
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
                            <td className={val}></td>
                            <td className={cell}>Comments</td>
                            <td className={val}></td>
                        </tr>
                        <tr className="bg-gray-100 font-semibold">
                            <td colSpan="4" className={cell}>Distant / Aided</td>
                        </tr>
                        <tr>
                            <td className={cell}>Left Eye 6/</td>
                            <td className={val}></td>
                            <td className={cell}>Right Eye 6/</td>
                            <td className={val}></td>
                        </tr>
                        <tr className="bg-gray-100 font-semibold">
                            <td colSpan="4" className={cell}>Distant / Unaided</td>
                        </tr>
                        <tr>
                            <td className={cell}>Left Eye 6/</td>
                            <td className={val}></td>
                            <td className={cell}>Right Eye 6/</td>
                            <td className={val}></td>
                        </tr>
                        <tr className="bg-gray-100 font-semibold">
                            <td colSpan="4" className={cell}>Near / Aided</td>
                        </tr>
                        <tr>
                            <td className={cell}>Left Eye 20/</td>
                            <td className={val}></td>
                            <td className={cell}>Right Eye 20/</td>
                            <td className={val}></td>
                        </tr>
                        <tr className="bg-gray-100 font-semibold">
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
                            <td className={val}></td>
                            <td className={cell}>Right Ear</td>
                            <td className={val}></td>
                        </tr>
                    </tbody>
                </table>

                {/* --- System Examination --- */}
                <h4 className="font-semibold underline mb-1">System Examination</h4>
                <table className="w-full mb-3 border border-black">
                    <tbody>
                        <tr>
                            <td className="border border-black px-2 py-2 text-sm w-32">General Appearance</td>
                            <td className="border border-black px-2 py-2 text-sm w-64"></td>

                            <td className="border border-black px-2 py-2 text-sm w-32">Cardiovascular</td>
                            <td className="border border-black px-2 py-2 text-sm w-64"></td>

                            <td className="border border-black px-2 py-2 text-sm w-32">Respiratory</td>
                            <td className="border border-black px-2 py-2 text-sm w-64"></td>

                            <td className="border border-black px-2 py-2 text-sm w-32">ENT</td>
                            <td className="border border-black px-2 py-2 text-sm w-64"></td>
                        </tr>

                        <tr className="bg-gray-100 font-semibold">
                            <td colSpan="8" className="border border-black px-2 py-2 text-sm">Gastro Intestinal</td>
                        </tr>

                        <tr>
                            <td className="border border-black px-2 py-2 text-sm w-40">
                                Abdomen (Mass, tenderness)
                            </td>
                            <td className="border border-black px-2 py-2 text-sm w-80" colSpan="4"></td>

                            <td className="border border-black px-2 py-2 text-sm w-40">Hernia</td>
                            <td className="border border-black px-2 py-2 text-sm w-80" colSpan="4"></td>
                        </tr>


                        <tr className="bg-gray-100 font-semibold">
                            <td colSpan="8" className="border border-black px-2 py-2 text-sm">Genitourinary</td>
                        </tr>

                        <tr>
                            <td className="border border-black px-2 py-2 text-sm w-32">Genitourinary</td>
                            <td className="border border-black px-2 py-2 text-sm w-64"></td>

                            <td className="border border-black px-2 py-2 text-sm w-32">Hydrocele</td>
                            <td className="border border-black px-2 py-2 text-sm w-64"></td>
                        </tr>

                        <tr className="bg-gray-100 font-semibold">
                            <td colSpan="8" className="border border-black px-2 py-2 text-sm">Musculoskeletal</td>
                        </tr>

                        <tr>
                            <td className="border border-black px-2 py-2 text-sm w-32">Extremities</td>
                            <td className="border border-black px-2 py-2 text-sm w-64"></td>

                            <td className="border border-black px-2 py-2 text-sm w-32">Back</td>
                            <td className="border border-black px-2 py-2 text-sm w-64"></td>

                            <td className="border border-black px-2 py-2 text-sm w-32">Skin</td>
                            <td className="border border-black px-2 py-2 text-sm w-64"></td>

                            <td className="border border-black px-2 py-2 text-sm w-32">C.N.S.</td>
                            <td className="border border-black px-2 py-2 text-sm w-64"></td>
                        </tr>

                        <tr>
                            <td className="border border-black px-2 py-2 text-sm w-32">Deformities</td>
                            <td className="border border-black px-2 py-2 text-sm w-64"></td>
                        </tr>
                    </tbody>
                </table>

                {/* --- Mental Status --- */}
                <h4 className="font-semibold underline mb-1">Mental Status Examination</h4>
                <table className="w-full mb-3 border border-black">
                    <tbody>
                        <tr>
                            <td className={cell}>Appearance</td>
                            <td className={val}></td>
                            <td className={cell}>Speech</td>
                            <td className={val}></td>
                            <td className={cell}>Behaviour</td>
                            <td className={val}></td>
                        </tr>
                        <tr className="bg-gray-100 font-semibold">
                            <td colSpan="6" className={cell}>Cognition</td>
                        </tr>
                        <tr>
                            <td className={cell}>Cognition</td>
                            <td className={val}></td>
                            <td className={cell}>Orientation</td>
                            <td className={val}></td>
                            <td className={cell}>Memory</td>
                            <td className={val}></td>
                            <td className={cell}>Concentration</td>
                            <td className={val}></td>
                        </tr>
                        <tr>
                            <td className={cell}>Mood</td>
                            <td className={val}></td>
                            <td className={cell}>Thoughts</td>
                            <td className={val}></td>
                            <td className={cell}>Others</td>
                            <td className={val}></td>
                            <td className={cell}>Remarks</td>
                            <td className={val}></td>
                        </tr>
                    </tbody>
                </table>

                {/* --- Investigation --- */}
                <h4 className="font-semibold underline mb-1">Investigation</h4>
                <table className="w-full mb-3 border border-black">
                    <tbody>
                        <tr>
                            <td className={cell}>Chest X-Ray</td>
                            <td className={val}></td>
                            <td className={cell}>Comment</td>
                            <td className={val}></td>
                        </tr>
                    </tbody>
                </table>

                {/* --- Laboratory Investigation --- */}
                <h4 className="font-semibold underline mb-1">Laboratory Investigation</h4>
                <table className="w-full mb-3 border border-black">
                    <tbody>
                        <tr className="bg-gray-100 font-semibold">
                            <td colSpan="4" className={cell}>Blood</td>
                        </tr>
                        <tr>
                            <td className={cell}>Blood Group</td>
                            <td className={val}></td>
                            <td className={cell}>Haemoglobin (g/dL)</td>
                            <td className={val}></td>
                        </tr>
                        <tr className="bg-gray-100 font-semibold">
                            <td colSpan="4" className={cell}>Thick Film For</td>
                        </tr>
                        <tr>
                            <td className={cell}>Malaria</td>
                            <td className={val}></td>
                            <td className={cell}>Micro Filaria</td>
                            <td className={val}></td>
                        </tr>
                        <tr className="bg-gray-100 font-semibold">
                            <td colSpan="4" className={cell}>Biochemistry</td>
                        </tr>
                        <tr>
                            <td className={cell}>R.B.S</td>
                            <td className={val}></td>
                            <td className={cell}>L.F.T</td>
                            <td className={val}></td>
                            <td className={cell}>Creatinine</td>
                            <td className={val}></td>
                        </tr>
                        <tr className="bg-gray-100 font-semibold">
                            <td colSpan="4" className={cell}>Serology</td>
                        </tr>
                        <tr>
                            <td className={cell}>HIV I & II</td>
                            <td className={val}></td>
                            <td className={cell}>HBs Ag</td>
                            <td className={val}></td>
                            <td className={cell}>Anti HCV</td>
                            <td className={val}></td>
                        </tr>
                        <tr>
                            <td className={cell}>VDRL</td>
                            <td className={val}></td>
                            <td className={cell}>TPHA (if VDRL +)</td>
                            <td className={val}></td>
                        </tr>
                        <tr className="bg-gray-100 font-semibold">
                            <td colSpan="4" className={cell}>Urine</td>
                        </tr>
                        <tr>
                            <td className={cell}>Sugar</td>
                            <td className={val}></td>
                            <td className={cell}>Albumin</td>
                            <td className={val}></td>
                        </tr>
                        <tr className="bg-gray-100 font-semibold">
                            <td colSpan="4" className={cell}>Stool Routine</td>
                        </tr>
                        <tr>
                            <td className={cell}>Helminthes</td>
                            <td className={val}></td>
                            <td className={cell}>OVA</td>
                            <td className={val}></td>
                            <td className={cell}>CYST</td>
                            <td className={val}></td>
                            <td className={cell}>Others</td>
                            <td className={val}></td>
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
                            <td className={cell}>MMR 1</td>
                            <td className={val}></td>
                            <td className={cell}>Date</td>
                            <td className={val}></td>
                        </tr>
                        <tr>
                            <td className={cell}>MMR 2</td>
                            <td className={val}></td>
                            <td className={cell}>Date</td>
                            <td className={val}></td>
                            <td className={cell}>Meningococcal</td>
                            <td className={val}></td>
                            <td className={cell}>Date</td>
                            <td className={val}></td>
                        </tr>
                        <tr>
                            <td className={cell}>COVID-19</td>
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

