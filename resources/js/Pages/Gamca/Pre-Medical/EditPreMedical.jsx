import React, { useEffect, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import NormalDatePicker from "@/Components/NormalDatePicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import Swal from "sweetalert2";

const EditPreMedical = ({ auth, preMedical }) => {
    // =================== Initial Dates ===================
    const initialDateOfIssue = preMedical.date_of_issue
        ? new Date(preMedical.date_of_issue)
        : new Date();
    const initialDateOfBirth = preMedical.date_of_birth
        ? new Date(preMedical.date_of_birth)
        : new Date();
    const initialReportDate = preMedical.report_date
        ? new Date(preMedical.report_date)
        : new Date();
    const initialGccSlipDate = preMedical.gcc_slip_date
        ? new Date(preMedical.gcc_slip_date)
        : new Date();

    const [dateOfIssue, setDateOfIssue] = useState(initialDateOfIssue);
    const [dateOfBirth, setDateOfBirth] = useState(initialDateOfBirth);
    const [reportDate, setReportDate] = useState(initialReportDate);
    const [gccSlipDate, setGccSlipDate] = useState(initialGccSlipDate);

    const countryOptions = [
        { value: "qa", label: "Qatar" },
        { value: "ksa", label: "Saudi Arabia" },
        { value: "bh", label: "Bahrain" },
        { value: "om", label: "Oman" },
        { value: "kw", label: "Kuwait" },
        { value: "ae", label: "United Arab Emirates" },
    ];

    // =================== useForm ===================
    const { data, setData, put, processing, errors, reset } = useForm({
        short_code: preMedical.short_code ?? "",
        passport_no: preMedical.passport_no ?? "",
        passport_validity: !!preMedical.passport_validity,
        first_name: preMedical.first_name ?? "",
        last_name: preMedical.last_name ?? "",
        father_name: preMedical.father_name ?? "",
        mother_name: preMedical.mother_name ?? "",
        date_of_issue:
            preMedical.date_of_issue ?? initialDateOfIssue.toISOString().split("T")[0],
        place_of_issue: preMedical.place_of_issue ?? "DHAKA",
        date_of_birth:
            preMedical.date_of_birth ?? initialDateOfBirth.toISOString().split("T")[0],
        sex: preMedical.sex ?? "MALE",
        nationality: preMedical.nationality ?? "BANGLADESHI",
        religion: preMedical.religion ?? "ISLAM",
        profession: preMedical.profession ?? "LABOUR",
        report_after_days: preMedical.report_after_days ?? "",
        report_date:
            preMedical.report_date ?? initialReportDate.toISOString().split("T")[0],
        mobile_no: preMedical.mobile_no ?? "",
        serial_no: preMedical.serial_no ?? "",
        country_name: preMedical.country_name ?? "",
        amount: preMedical.amount ?? 0,
        is_free: !!preMedical.is_free,
        discount: preMedical.discount ?? 0,
        gcc_slip_no: preMedical.gcc_slip_no ?? "",
        gcc_slip_date:
            preMedical.gcc_slip_date ?? initialGccSlipDate.toISOString().split("T")[0],
        expire_days: preMedical.expire_days ?? 0,
        photo: null,
    });

    const [imagePreview, setImagePreview] = useState(
        preMedical.photo ? `/images/passengers/${preMedical.photo}` : null
    );

    // =================== Auto report_date ===================
    useEffect(() => {
        if (data.report_after_days && !isNaN(data.report_after_days)) {
            const today = new Date();
            today.setDate(today.getDate() + parseInt(data.report_after_days));
            const formattedDate = today.toISOString().split("T")[0];
            setData("report_date", formattedDate);
            setReportDate(today);
        }
    }, [data.report_after_days]);

    // =================== Expire days calc ===================
    useEffect(() => {
        if (data.gcc_slip_date) {
            const slipDate = new Date(data.gcc_slip_date);
            const today = new Date();
            slipDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);
            const diffDays = Math.floor((today - slipDate) / (1000 * 60 * 60 * 24));
            const expireAfterDays = 20;
            const remainingDays = Math.max(expireAfterDays - diffDays, 0);
            setData("expire_days", remainingDays);
        }
    }, [data.gcc_slip_date]);

    // =================== Date Change Handler ===================
    const handleDateChange = (date, field) => {
        const formatted = date ? date.toISOString().split("T")[0] : "";
        setData(field, formatted);
        switch (field) {
            case "date_of_issue":
                setDateOfIssue(date);
                break;
            case "date_of_birth":
                setDateOfBirth(date);
                break;
            case "report_date":
                setReportDate(date);
                break;
            case "gcc_slip_date":
                setGccSlipDate(date);
                break;
            default:
                break;
        }
    };

    // =================== Photo Change Handler ===================
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData((prevData) => ({ ...prevData, photo: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // =================== Form Submit ===================
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (data[key] !== null && data[key] !== undefined) {
                formData.append(key, data[key]);
            }
        });

        put(route("pre-medical.update", preMedical.id), {
            data: formData,
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Updated Successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
            onError: () => {
                Swal.fire({
                    icon: "error",
                    title: "Error Updating!",
                    text: "Please check your input data.",
                });
            },
        });
    };

    const selectedShortCode = countryOptions.find(
        (option) => option.value === data.short_code
    );

    return (
        <AdminDashboardLayout user={auth.user} header={<h2 className="text-xl font-semibold">Edit Pre Medical</h2>}>
            <Head title="Edit Pre Medical" />
            <div className="bg-[#dbe5f1] min-h-screen flex justify-center items-center p-4">
                <form onSubmit={handleSubmit} className="bg-white shadow-xl border border-gray-300 rounded-md w-full max-w-5xl p-6">
                    <h2 className="text-xl font-bold text-center text-gray-800 mb-4 border-b pb-2">
                        Edit Pre Medical
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* LEFT SIDE */}
                        <div className="space-y-3 mt-[14px]">
                            <div>
                                <label className="block text-sm font-semibold text-green-700 mb-1">
                                    SHORT CODE #
                                </label>
                                <Select
                                    options={countryOptions}
                                    value={selectedShortCode || null}
                                    onChange={(option) => {
                                        if (option) {
                                            setData("short_code", option.value);
                                            setData("country_name", option.label);
                                        }
                                    }}
                                    placeholder="Select short code..."
                                    isClearable
                                    className="w-full"
                                />
                                {errors.short_code && <div className="text-red-500 text-sm">{errors.short_code}</div>}
                            </div>

                            <div className="flex items-end gap-3">
                                <div className="flex-1">
                                    <label className="block text-sm font-semibold text-gray-800 mb-1">
                                        Passport No
                                    </label>
                                    <input
                                        type="text"
                                        value={data.passport_no}
                                        onChange={(e) => setData("passport_no", e.target.value)}
                                        className="border border-gray-300 rounded px-2 py-1 w-full focus:ring focus:ring-blue-100 focus:border-blue-400"
                                    />
                                    {errors.passport_no && <div className="text-red-500 text-sm">{errors.passport_no}</div>}
                                </div>
                                <div className="flex items-center h-full mb-[8px]">
                                    <input
                                        type="checkbox"
                                        checked={!!data.passport_validity}
                                        onChange={(e) => setData("passport_validity", e.target.checked)}
                                    />
                                </div>
                            </div>

                            {/* Names */}
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">First Name</label>
                                    <input type="text" value={data.first_name} onChange={(e) => setData("first_name", e.target.value)} className="w-full border rounded px-2 py-1" />
                                    {errors.first_name && <div className="text-red-500 text-sm">{errors.first_name}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Last Name</label>
                                    <input type="text" value={data.last_name} onChange={(e) => setData("last_name", e.target.value)} className="w-full border rounded px-2 py-1" />
                                </div>
                            </div>

                            {/* F/H Name */}
                            <div>
                                <label className="block text-sm font-semibold mb-1">F/H Name</label>
                                <input type="text" value={data.father_name} onChange={(e) => setData("father_name", e.target.value)} className="w-full border rounded px-2 py-1" />
                            </div>

                            {/* Date / Place of Issue */}
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Date of Issue</label>
                                    <NormalDatePicker selectedDate={dateOfIssue} handleDateChange={(date) => handleDateChange(date, "date_of_issue")} />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Place of Issue</label>
                                    <select value={data.place_of_issue} onChange={(e) => setData("place_of_issue", e.target.value)} className="w-full border rounded px-2 py-1">
                                        <option>DHAKA</option>
                                        <option>CHATTOGRAM</option>
                                        <option>SYLHET</option>
                                    </select>
                                </div>
                            </div>

                            {/* DOB / Sex */}
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Date of Birth</label>
                                    <NormalDatePicker selectedDate={dateOfBirth} handleDateChange={(date) => handleDateChange(date, "date_of_birth")} />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Sex</label>
                                    <select value={data.sex} onChange={(e) => setData("sex", e.target.value)} className="w-full border rounded px-2 py-1">
                                        <option>MALE</option>
                                        <option>FEMALE</option>
                                        <option>OTHER</option>
                                    </select>
                                </div>
                            </div>

                            {/* Nationality / Religion */}
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Nationality</label>
                                    <input type="text" value={data.nationality} onChange={(e) => setData("nationality", e.target.value)} className="w-full border rounded px-2 py-1" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Religion</label>
                                    <input type="text" value={data.religion} onChange={(e) => setData("religion", e.target.value)} className="w-full border rounded px-2 py-1" />
                                </div>
                            </div>

                            {/* Profession / Mobile */}
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Profession</label>
                                    <input type="text" value={data.profession} onChange={(e) => setData("profession", e.target.value)} className="w-full border rounded px-2 py-1" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Mobile No</label>
                                    <input type="text" value={data.mobile_no} onChange={(e) => setData("mobile_no", e.target.value)} className="w-full border rounded px-2 py-1" />
                                </div>
                            </div>

                            {/* After Days / Report Date */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <label className="block text-sm font-semibold text-gray-800">After</label>
                                    <input type="number" min="0" value={data.report_after_days || ""} onChange={(e) => setData("report_after_days", e.target.value)} className="w-24 border rounded px-2 py-1" />
                                    <span className="text-sm font-semibold">days</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <label className="block text-sm font-semibold text-gray-800">Report Date</label>
                                    <NormalDatePicker selectedDate={reportDate} handleDateChange={(date) => handleDateChange(date, "report_date")} />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="space-y-3">
                            {/* <div className="mx-auto border border-gray-400 w-[140px] h-[160px] bg-gray-100 flex items-center justify-center text-sm text-gray-500">
                                Photo Preview
                            </div>
                            <input type="file" onChange={(e) => setData("photo", e.target.files[0])} /> */}

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Upload Image
                                </label>
                                <input
                                    type="file"
                                    name="photo"
                                    accept="photo/*"
                                    onChange={handleImageChange}
                                    className="mt-1 block w-full text-gray-700"
                                />
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="mt-2 h-32 w-32 object-cover"
                                    />
                                {errors.photo && (
                                    <div className="text-red-600 text-sm mt-1">
                                        {errors.photo}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-1">Serial No #</label>
                                <input type="text" value={data.serial_no} onChange={(e) => setData("serial_no", e.target.value)} className="w-full border rounded px-2 py-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-1">Country Name</label>
                                <input type="text" value={data.country_name} onChange={(e) => setData("country_name", e.target.value)} className="w-full border rounded px-2 py-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-1">Amount</label>
                                <div className="flex items-center gap-3">
                                    <input type="number" value={data.amount || ""} onChange={(e) => setData("amount", e.target.value)} className="w-full border rounded px-2 py-1" />
                                    <label className="flex items-center text-sm font-medium text-gray-700">
                                        <input type="checkbox" checked={data.is_free} onChange={(e) => setData("is_free", e.target.checked)} className="mr-1 accent-blue-600 w-4 h-4" />
                                        Free
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-1">Discount</label>
                                <input type="number" value={data.discount || ""} onChange={(e) => setData("discount", e.target.value)} className="w-full border rounded px-2 py-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-1">GCC Slip No</label>
                                <input type="text" value={data.gcc_slip_no} onChange={(e) => setData("gcc_slip_no", e.target.value)} className="w-full border rounded px-2 py-1" />
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-end gap-3">
                                <div className="flex-1">
                                    <label className="block text-sm font-semibold text-gray-800 mb-1">GCC Slip Date</label>
                                    <NormalDatePicker selectedDate={gccSlipDate} handleDateChange={(date) => handleDateChange(date, "gcc_slip_date")} />
                                </div>

                                <div className="flex items-end gap-2">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-800 mb-1">Expire</label>
                                        <div className="flex items-center gap-2">
                                            <input type="number" id="expire_days" value={data.expire_days || ""} onChange={(e) => setData("expire_days", e.target.value)} className="w-24 border border-gray-300 rounded px-2 py-[7px]" />
                                            <span className="text-sm font-semibold text-gray-800">days</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col md:flex-row justify-between items-center border-t pt-4 gap-4">
                        <button type="button" className="bg-green-600 text-white font-semibold px-6 py-2 rounded hover:bg-green-700" disabled={processing}>Refresh Scanner</button>

                        <div className="text-red-600 font-bold text-lg text-center">Scanner Disconnected</div>

                        <div className="flex space-x-2">
                            <button type="submit" disabled={processing} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update</button>
                            <button type="button" onClick={() => reset()} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Close</button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default EditPreMedical;
