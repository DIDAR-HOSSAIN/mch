// import React from "react";

// export default function StaticMedicalForm() {
//     return (
//         <div className="w-[210mm] min-h-[297mm] mx-auto bg-white text-[12px] p-8 border border-gray-300 font-serif">
//             {/* Header */}
//             <div className="text-center mb-2">
//                 <h1 className="font-bold text-lg">Medical Centre</h1>
//                 <p>953, O.R Nizam Road, Panchlaish, Chattogram-400.</p>
//                 <p className="font-semibold">Mobile Phone :+88018883077569</p>
//                 <p className="font-semibold mt-2">
//                     GCC Code : 05/02/23
//                 </p>
//                 <p className="font-semibold mt-2">
//                 MEDICAL CHECK-UP FORM
//                 </p>
//             </div>

//             {/* Date & Reg Section */}
//             <div className="flex justify-between mt-4 border-b border-gray-400 pb-1 text-sm">
//                 <div>Date : ____________</div>
//                 <div>Physician : ___________________________</div>
//             </div>

//             {/* Personal Info */}
//             <div className="mt-2 grid grid-cols-2 gap-y-1 text-sm">
//                 <div>Reg No. : __________________________</div>
//                 <div>Age : __________</div>
//                 <div>Name : ____________________________</div>
//                 <div>Sex : __________</div>
//                 <div>Passport No. : ____________________</div>
//                 <div>Date of Birth : ____________________</div>
//                 <div>Profession : _______________________</div>
//                 <div>Daily S/L : ________________________</div>
//                 <div>Country Name : ___________________</div>
//             </div>

//             {/* Staff info */}
//             <div className="mt-2 grid grid-cols-4 text-sm border-b border-gray-400 pb-1">
//                 <div>Doc. Insp/Cashier : __________________</div>
//                 <div>Scan Oper./RO : __________________</div>
//                 <div>Radiographer : __________________</div>
//                 <div>Sample Collector : ________________</div>
//             </div>

//             {/* Physical Exam */}
//             <h3 className="mt-3 font-semibold underline">
//                 PHYSICAL EXAM. REPORT
//             </h3>

//             {/* Examination Table */}
//             <div className="border border-black mt-2 text-sm">
//                 <div className="flex justify-between border-b border-black p-1">
//                     <div>
//                         <b>GENERAL :</b> Height: ____ cm &nbsp;&nbsp; Weight: ____ Kg &nbsp;&nbsp;
//                         Marital Status: ☐ Married ☐ Unmarried &nbsp;&nbsp; Pulse: ____ RR: ____
//                     </div>
//                 </div>

//                 {/* Two Column Grid */}
//                 <div className="grid grid-cols-2 divide-x divide-black">
//                     {/* Left Column */}
//                     <div className="p-2">
//                         <b>TYPE OF EXAMINATION</b>
//                         <div className="flex justify-between">
//                             <span>Eye Rt. :</span> <span>__________</span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span>Eye Lt. :</span> <span>__________</span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span>Color Vision :</span> <span>__________</span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span>Ear Rt. :</span> <span>__________</span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span>Ear Lt. :</span> <span>__________</span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span>Mouth :</span> <span>__________</span>
//                         </div>
//                         <div className="flex justify-between mt-1">
//                             <span>Systemic Examination :</span> <span>__________</span>
//                         </div>
//                         <div className="flex justify-between mt-1">
//                             <span>Cardio-Vascular :</span> <span>__________</span>
//                         </div>
//                         <div className="flex justify-between mt-1">
//                             <span>Respiratory System :</span> <span>__________</span>
//                         </div>
//                     </div>

//                     {/* Right Column */}
//                     <div className="p-2">
//                         <b>TYPE OF EXAMINATION</b>
//                         <div className="flex justify-between">
//                             <span>Gastro Intestinal :</span> <span>__________</span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span>Abdomen :</span> <span>__________</span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span>Hernia :</span> <span>__________</span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span>Hydrocele :</span> <span>__________</span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span>Varicose Veins :</span> <span>__________</span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span>Skin :</span> <span>__________</span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span>Psychiatry :</span> <span>__________</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Comments */}
//             <div className="mt-3">
//                 <b>Comments:</b> ___________________________________________________________
//             </div>

//             {/* Lab Investigation */}
//             <h3 className="mt-4 font-semibold underline">
//                 LABORATORY INVESTIGATION
//             </h3>
//             <div className="border border-black mt-1">
//                 <div className="grid grid-cols-2 divide-x divide-black text-sm">
//                     {/* Left column */}
//                     <div className="p-2">
//                         <b>URINE</b>
//                         <div>Sugar : Present ☐ Absent ☐</div>
//                         <div>Albumin : Present ☐ Absent ☐</div>
//                         <div>Bilharzia : Found ☐ Not Found ☐</div>
//                         <div>Pregnancy Test : NA ☐ Positive ☐ Negative ☐</div>

//                         <b className="mt-2 block">STOOL</b>
//                         <div>Bilharzia : Found ☐ Not Found ☐</div>
//                         <div>Helminthes : Found ☐ Not Found ☐</div>
//                         <div>Giardia : Found ☐ Not Found ☐</div>
//                         <div>Culture : Growth ☐ No Growth ☐</div>
//                         <div>Thick Film : Malaria Parasite ☐ Microfilaria ☐</div>
//                     </div>

//                     {/* Right column */}
//                     <div className="p-2">
//                         <b>BIOCHEMISTRY</b>
//                         <div>R.B.S : __________ mg/dl</div>
//                         <div>S. Creatinine : __________ mg/dl</div>
//                         <div>SGPT : __________ IU/L</div>
//                         <div>SGOT : __________ IU/L</div>
//                         <div>S. Bilirubin : __________ mg/dl</div>
//                         <div>BUN : __________</div>

//                         <b className="mt-2 block">IMMUNOLOGY</b>
//                         <div>HBsAg : Positive ☐ Negative ☐</div>
//                         <div>Anti-HCV : Positive ☐ Negative ☐</div>
//                         <div>HIV 1&2 Test : Positive ☐ Negative ☐</div>

//                         <b className="mt-2 block">SEROLOGY</b>
//                         <div>VDRL : Reactive ☐ Non-Reactive ☐</div>
//                         <div>TPHA : Positive ☐ Negative ☐</div>

//                         <b className="mt-2 block">BLOOD</b>
//                         <div>Haemoglobin : __________ gm/dl</div>
//                         <div>ESR : __________</div>
//                         <div>Blood Group : __________</div>
//                     </div>
//                 </div>
//             </div>

//             {/* Footer */}
//             <div className="mt-4 text-sm">
//                 <div className="flex justify-between border-t border-gray-400 pt-2">
//                     <span>Lab Incharge: ________________</span>
//                     <span>Pathologist: ________________</span>
//                     <span>Bio Chemist: ________________</span>
//                 </div>

//                 <div className="mt-2 border-t border-gray-400 pt-2">
//                     <b>X-RAY FINDINGS:</b> ____________________________________________
//                 </div>

//                 <div className="mt-3">
//                     <b>Final Comments:</b> ____________________________________________
//                 </div>

//                 <div className="mt-4 flex justify-between">
//                     <span>Card Prepared By: ___________________</span>
//                     <span>Checked By: ___________________</span>
//                     <span>Signed By: ___________________</span>
//                 </div>
//             </div>
//         </div>
//     );
// }



import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function MedicalCheckupStaticForm() {
    const printRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: "Medical_Checkup_Form",
    });

    return (
        <div className="bg-gray-100 p-4 min-h-screen">
            <div
                ref={printRef}
                className="bg-white mx-auto p-8 shadow-lg w-[210mm] min-h-[297mm] text-[12px]"
            >
                {/* Header */}
                <div className="text-center border-b pb-2 mb-3">
                    <h1 className="font-bold text-xl uppercase">Medical Centre</h1>
                    <p>953, O.R Nizam Road, Panchlaish, Chattogram-400</p>
                    <p className="font-semibold">Mobile Phone: +88 018883077569</p>
                    <p className="font-semibold mt-1">GCC Code: 05.02.23</p>
                    <h2 className="font-bold underline text-base mt-1">
                        MEDICAL CHECK-UP FORM
                    </h2>
                </div>

                {/* Top Info */}
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                        <p>Reg No: __________________________</p>
                        <p>Name: ____________________________</p>
                        <p>Passport No: ______________________</p>
                        <p>Profession: ________________________</p>
                        <p>Country: __________________________</p>
                    </div>
                    <div>
                        <p>Date: ____________________________</p>
                        <p>Age: _______ Sex: _______</p>
                        <p>Date of Birth: ____________________</p>
                        <p>Daily S/L: ________________________</p>
                        <p>Physician: ________________________</p>
                    </div>
                </div>

                {/* MEDICAL EXAMINATION */}
                <h3 className="font-bold underline mb-1 text-center">
                    MEDICAL EXAMINATION
                </h3>

                {/* General */}
                <table className="w-full border text-sm mb-2">
                    <tbody>
                        <tr className="bg-gray-100 font-semibold">
                            <td colSpan="4" className="border px-2 py-1">
                                General
                            </td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">Blood Pressure</td>
                            <td className="border px-2 py-1">120/85 mmHg</td>
                            <td className="border px-2 py-1">Pulse/min</td>
                            <td className="border px-2 py-1">84 | RR/min: 16</td>
                        </tr>
                    </tbody>
                </table>

                {/* Visual Acuity */}
                <h4 className="font-semibold underline mb-1">
                    Visual Acuity (Aided & Unaided)
                </h4>
                <table className="w-full border text-sm mb-2">
                    <tbody>
                        <tr>
                            <td className="border px-2 py-1">Colour Vision</td>
                            <td className="border px-2 py-1">Normal</td>
                            <td className="border px-2 py-1">Comments</td>
                            <td className="border px-2 py-1"></td>
                        </tr>
                        <tr className="bg-gray-50 font-semibold">
                            <td colSpan="4" className="border px-2 py-1">
                                Distant Vision
                            </td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">Left Eye (Aided)</td>
                            <td className="border px-2 py-1">6/</td>
                            <td className="border px-2 py-1">Right Eye (Aided)</td>
                            <td className="border px-2 py-1">6/</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">Left Eye (Unaided)</td>
                            <td className="border px-2 py-1">6/6</td>
                            <td className="border px-2 py-1">Right Eye (Unaided)</td>
                            <td className="border px-2 py-1">6/6</td>
                        </tr>
                        <tr className="bg-gray-50 font-semibold">
                            <td colSpan="4" className="border px-2 py-1">
                                Near Vision
                            </td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">Left Eye (Aided)</td>
                            <td className="border px-2 py-1">20/</td>
                            <td className="border px-2 py-1">Right Eye (Aided)</td>
                            <td className="border px-2 py-1">20/</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">Left Eye (Unaided)</td>
                            <td className="border px-2 py-1">20</td>
                            <td className="border px-2 py-1">Right Eye (Unaided)</td>
                            <td className="border px-2 py-1">20</td>
                        </tr>
                    </tbody>
                </table>

                {/* Hearing */}
                <table className="w-full border text-sm mb-2">
                    <tbody>
                        <tr className="bg-gray-100 font-semibold">
                            <td colSpan="4" className="border px-2 py-1">
                                Hearing
                            </td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">Left Ear</td>
                            <td className="border px-2 py-1">Normal</td>
                            <td className="border px-2 py-1">Right Ear</td>
                            <td className="border px-2 py-1">Normal</td>
                        </tr>
                    </tbody>
                </table>

                {/* System Examination */}
                <h4 className="font-semibold underline mb-1">
                    System Examination
                </h4>
                <table className="w-full border text-sm mb-2">
                    <tbody>
                        <tr>
                            <td className="border px-2 py-1">General Appearance</td>
                            <td className="border px-2 py-1">NAD</td>
                            <td className="border px-2 py-1">Cardiovascular</td>
                            <td className="border px-2 py-1">NAD</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">Respiratory</td>
                            <td className="border px-2 py-1">NAD</td>
                            <td className="border px-2 py-1">ENT</td>
                            <td className="border px-2 py-1">NAD</td>
                        </tr>
                        <tr className="bg-gray-50 font-semibold">
                            <td colSpan="4" className="border px-2 py-1">
                                Gastro Intestinal
                            </td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">Abdomen (Mass, Tenderness)</td>
                            <td className="border px-2 py-1">NAD</td>
                            <td className="border px-2 py-1">Hernia</td>
                            <td className="border px-2 py-1">NAD</td>
                        </tr>
                        <tr className="bg-gray-50 font-semibold">
                            <td colSpan="4" className="border px-2 py-1">
                                Genitourinary
                            </td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">Genitourinary</td>
                            <td className="border px-2 py-1">NAD</td>
                            <td className="border px-2 py-1">Hydrocele</td>
                            <td className="border px-2 py-1">NAD</td>
                        </tr>
                        <tr className="bg-gray-50 font-semibold">
                            <td colSpan="4" className="border px-2 py-1">
                                Musculoskeletal
                            </td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">Extremities</td>
                            <td className="border px-2 py-1">NAD</td>
                            <td className="border px-2 py-1">Back</td>
                            <td className="border px-2 py-1">NAD</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">Skin</td>
                            <td className="border px-2 py-1">NAD</td>
                            <td className="border px-2 py-1">C.N.S.</td>
                            <td className="border px-2 py-1">NAD</td>
                        </tr>
                    </tbody>
                </table>

                {/* Mental Status Examination */}
                <h4 className="font-semibold underline mb-1">
                    Mental Status Examination
                </h4>
                <table className="w-full border text-sm mb-2">
                    <tbody>
                        <tr>
                            <td className="border px-2 py-1">Appearance</td>
                            <td className="border px-2 py-1">NAD</td>
                            <td className="border px-2 py-1">Speech</td>
                            <td className="border px-2 py-1">NAD</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">Behaviour</td>
                            <td className="border px-2 py-1">NAD</td>
                            <td className="border px-2 py-1">Cognition</td>
                            <td className="border px-2 py-1">NAD</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">Orientation</td>
                            <td className="border px-2 py-1">NAD</td>
                            <td className="border px-2 py-1">Memory</td>
                            <td className="border px-2 py-1">NAD</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">Mood</td>
                            <td className="border px-2 py-1">NAD</td>
                            <td className="border px-2 py-1">Thoughts</td>
                            <td className="border px-2 py-1">NAD</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">Others</td>
                            <td className="border px-2 py-1"></td>
                            <td className="border px-2 py-1">Remarks</td>
                            <td className="border px-2 py-1"></td>
                        </tr>
                    </tbody>
                </table>

                {/* Investigation */}
                <h4 className="font-semibold underline mb-1">Investigation</h4>
                <table className="w-full border text-sm mb-2">
                    <tbody>
                        <tr>
                            <td className="border px-2 py-1">Chest X-Ray</td>
                            <td className="border px-2 py-1">NAD</td>
                            <td className="border px-2 py-1">Comment</td>
                            <td className="border px-2 py-1"></td>
                        </tr>
                    </tbody>
                </table>

                {/* Laboratory Investigation */}
                <h4 className="font-semibold underline mb-1">
                    Laboratory Investigation
                </h4>
                <table className="w-full border text-sm mb-2">
                    <tbody>
                        <tr className="bg-gray-100 font-semibold">
                            <td colSpan="4" className="border px-2 py-1">
                                Blood
                            </td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">Blood Group</td>
                            <td className="border px-2 py-1">B+</td>
                            <td className="border px-2 py-1">Haemoglobin (g/dL)</td>
                            <td className="border px-2 py-1">15.6</td>
                        </tr>
                        <tr className="bg-gray-100 font-semibold">
                            <td colSpan="4" className="border px-2 py-1">
                                Thick Film For
                            </td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">Malaria</td>
                            <td className="border px-2 py-1">Absent</td>
                            <td className="border px-2 py-1">Micro Filaria</td>
                            <td className="border px-2 py-1">Absent</td>
                        </tr>
                        <tr className="bg-gray-100 font-semibold">
                            <td colSpan="4" className="border px-2 py-1">
                                Biochemistry
                            </td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">R.B.S</td>
                            <td className="border px-2 py-1">99.0</td>
                            <td className="border px-2 py-1">Creatinine</td>
                            <td className="border px-2 py-1">1.23</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">L.F.T</td>
                            <td className="border px-2 py-1">Normal</td>
                            <td className="border px-2 py-1"></td>
                            <td className="border px-2 py-1"></td>
                        </tr>
                        <tr className="bg-gray-100 font-semibold">
                            <td colSpan="4" className="border px-2 py-1">
                                Serology
                            </td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">HIV I & II</td>
                            <td className="border px-2 py-1">Negative</td>
                            <td className="border px-2 py-1">HBs Ag</td>
                            <td className="border px-2 py-1">Negative</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">Anti HCV</td>
                            <td className="border px-2 py-1">Negative</td>
                            <td className="border px-2 py-1">VDRL</td>
                            <td className="border px-2 py-1">Negative</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">TPHA (if VDRL +ve)</td>
                            <td className="border px-2 py-1">Negative</td>
                            <td className="border px-2 py-1"></td>
                            <td className="border px-2 py-1"></td>
                        </tr>
                        <tr className="bg-gray-100 font-semibold">
                            <td colSpan="4" className="border px-2 py-1">
                                Urine
                            </td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">Sugar</td>
                            <td className="border px-2 py-1">Negative</td>
                            <td className="border px-2 py-1">Albumin</td>
                            <td className="border px-2 py-1">Negative</td>
                        </tr>
                        <tr className="bg-gray-100 font-semibold">
                            <td colSpan="4" className="border px-2 py-1">
                                Stool
                            </td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">Helminthes</td>
                            <td className="border px-2 py-1">Absent</td>
                            <td className="border px-2 py-1">Ova / Cyst</td>
                            <td className="border px-2 py-1">Absent</td>
                        </tr>
                    </tbody>
                </table>

                {/* Vaccination */}
                {/* <h4 className="font-semibold underline mb-1">Vaccination Status</h4>
                <table className="w-full border text-sm mb-4">
                    <tbody>
                        <tr>
                            <td className="border px-2 py-1">Polio</td>
                            <td className="border px-2 py-1">Yes</td>
                            <td className="border px-2 py-1">Date</td>
                            <td className="border px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">MMR 1</td>
                            <td className="border px-2 py-1">Yes</td>
                            <td className="border px-2 py-1">Date</td>
                            <td className="border px-2 py- */}

            </div>
        </div>

    );
}

