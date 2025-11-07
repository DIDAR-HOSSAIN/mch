import React from "react";
import logo from "../../../assets/images/Logo/mch-logo.png";

export default function MedicalExaminationForm({ receipt }) {


    const cell = "border border-black px-3 py-2 text-sm align-middle font-bold";
    const val = "border border-black px-3 py-6 text-sm w-56 text-center align-middle";

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="a4-page w-[210mm] mx-auto bg-white p-4">
                <div className="flex justify-between items-center mb-2">
                    <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
                    {/* Header */}
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

                {/* Patient Info */}
                <div className="grid grid-cols-2 gap-6 mb-4">
                    <div>
                        <p>Reg No: {receipt.pre_medical_id} </p>
                        <p>Name: {receipt.first_name} {receipt.last_name}</p>
                        <p>Passport No: {receipt.passport_no}</p>
                        <p>Profession: {receipt.profession}</p>
                        <p>Country: {receipt.country_name}</p>
                    </div>
                    <div>
                        <p>Date: {receipt.entry_date}</p>
                        <p>Age: _______ Sex: {receipt.sex}</p>
                        <p>Date of Birth: {receipt.date_of_birth}</p>
                    </div>
                </div>

                {/* --- General --- */}
                <h4 className="font-semibold underline mb-1">
                    Medical Examination: General
                </h4>
                <table className="w-full mb-3 border border-black">
                    <tbody className="[&>tr>td]:py-2 [&>tr>td]:px-2">
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
                    <tbody className="[&>tr>td]:py-1 [&>tr>td]:px-2">
                        <tr>
                            <td className={cell}>Colour Vision</td>
                            <td className={`${val} text-left`}>
                                <div className="flex items-center justify-around gap-2">
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
                    <tbody className="[&>tr>td]:py-1 [&>tr>td]:px-2">
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
                    <tbody className="[&>tr>td]:py-1 [&>tr>td]:px-2">
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
                    <tbody className="[&>tr>td]:py-1 [&>tr>td]:px-2">
                        <tr className="bg-gray-100 font-semibold text-center">
                            <td colSpan="8" className={cell}>Gastro Intestinal</td>
                        </tr>
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
                    <tbody className="[&>tr>td]:py-1 [&>tr>td]:px-2">
                        <tr className="bg-gray-100 font-semibold text-center">
                            <td colSpan="8" className={cell}>Genitourinary</td>
                        </tr>
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
                    <tbody className="[&>tr>td]:py-1 [&>tr>td]:px-2">
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
                    <tbody className="[&>tr>td]:py-1 [&>tr>td]:px-2">
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
                    <tbody className="[&>tr>td]:py-1 [&>tr>td]:px-2">
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
                    <tbody className="[&>tr>td]:py-1 [&>tr>td]:px-2">
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
                    <tbody className="[&>tr>td]:py-1 [&>tr>td]:px-2">
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
                    <tbody className="[&>tr>td]:py-1 [&>tr>td]:px-2">
                        <tr className="bg-gray-100 font-semibold text-center">
                            <td colSpan="8" className={cell}>Thick film for</td>
                        </tr>
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
                    <tbody className="[&>tr>td]:py-1 [&>tr>td]:px-2">
                        <tr className="bg-gray-100 font-semibold text-center">
                            <td colSpan="8" className={cell}>Biochemistry</td>
                        </tr>
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
                    <tbody className="[&>tr>td]:py-1 [&>tr>td]:px-2">
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
                    <tbody className="[&>tr>td]:py-1 [&>tr>td]:px-2">
                        <tr className="bg-gray-100 font-semibold text-center">
                            <td colSpan="8" className={cell}>Urine</td>
                        </tr>
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
                    <tbody className="[&>tr>td]:py-1 [&>tr>td]:px-2">
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
                    <tbody className="[&>tr>td]:py-1 [&>tr>td]:px-2">
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

            {/* Print CSS */}
            <style>{`
        @media print {
          @page {
            size: A4;
            margin: 10mm 12mm;
          }

          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .a4-page {
            page-break-inside: auto;
            break-inside: auto;
          }

          table, tr, td, th {
            page-break-inside: avoid;
            break-inside: avoid;
          }

          div {
            overflow: visible !important;
          }
        }
      `}</style>
        </div>
    );
}


