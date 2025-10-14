import React, { useEffect, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import NormalDatePicker from "@/Components/NormalDatePicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

const CreatePreMedical = ({ auth }) => {

    const [dateOfIssue, setDateOfIssue] = useState(new Date());
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [reportDate, setReportDate] = useState(new Date());
    const [gccSlipDate, setGccSlipDate] = useState(new Date());

    const countryOptions = [
        { value: "qa", label: "Qatar" },
        { value: "ksa", label: "Saudi Arabia" },
        { value: "bh", label: "Bahrain" },
        { value: "om", label: "Oman" },
        { value: "kw", label: "Kuwait" },
        { value: "ae", label: "United Arab Emirates" },
    ];

    const { data, setData, post, processing, errors, reset } = useForm({
        short_code: "",
        passport_no: "",
        passport_validity: false,
        first_name: "",
        last_name: "",
        father_name: "",
        mother_name: "",
        date_of_issue: "",
        place_of_issue: "DHAKA",
        date_of_birth: "",
        sex: "MALE",
        nationality: "BANGLADESHI",
        religion: "ISLAM",
        profession: "LABOUR",
        report_after_days: "",
        report_date: "",
        mobile_no: "",
        serial_no: "",
        country_name: "",
        amount: "",
        is_free: false,
        discount: "",
        gcc_slip_no: "",
        gcc_slip_date: "",
        expire_days: "",
        photo: null,
    });

    console.log(errors);


    // useEffect দিয়ে report_after_days অনুযায়ী report_date অটো ক্যালকুলেট
    useEffect(() => {
        if (data.report_after_days && !isNaN(data.report_after_days)) {
            const today = new Date();
            today.setDate(today.getDate() + parseInt(data.report_after_days));
            const formattedDate = today.toISOString().split("T")[0];
            setData("report_date", formattedDate);
            setReportDate(today); // datepicker-এর জন্যও সেট হবে
        }
    }, [data.report_after_days]);

    useEffect(() => {
        if (data.gcc_slip_date) {
            const slipDate = new Date(data.gcc_slip_date);
            const today = new Date();

            // সময় মুছে ফেলি যেন শুধু তারিখের পার্থক্য বের হয়
            slipDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);

            // slip date থেকে আজ পর্যন্ত কত দিন কেটেছে
            const diffDays = Math.floor((today - slipDate) / (1000 * 60 * 60 * 24));

            // মোট মেয়াদ ২০ দিন
            const expireAfterDays = 20;

            // বাকি দিনের হিসাব (যদি মেয়াদ শেষ না হয়)
            const remainingDays = Math.max(expireAfterDays - diffDays, 0);

            // এখন expire_days ফিল্ডে সেট করো
            setData("expire_days", remainingDays);
        }
    }, [data.gcc_slip_date]);



    const handleDateChange = (date, field) => {
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
            case "expire_days":
                setExpireDays(date);
                break;
            default:
                break;
        }

        setData(field, date ? date.toISOString().split("T")[0] : null);
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("pre-medical.store"), {
            onSuccess: () => reset(),
        });
    };

    // Get selected option for react-select
    const selectedShortCode = countryOptions.find(
        (option) => option.value === data.short_code
    );


    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold">
                    Pre Medical
                </h2>
            }
        >
            <Head title="Pre Medical" />
            <div className="bg-[#dbe5f1] min-h-screen flex justify-center items-center p-4">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-xl border border-gray-300 rounded-md w-full max-w-5xl p-6"
                >
                    <h2 className="text-xl font-bold text-center text-gray-800 mb-4 border-b pb-2">
                        Pre Medical
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* LEFT COLUMN */}
                        <div className="space-y-3 mt-[14px]">
                           {/* SHORT CODE */}
                        <div>
                            <label className="block text-sm font-semibold text-green-700 mb-1">
                                SHORT CODE # <span className="text-red-600">*</span>
                            </label>
                            <Select
                                options={countryOptions}
                                value={selectedShortCode || null}
                                onChange={(option) => {
                                    setData("short_code", option?.value || "");
                                    setData("country_name", option?.label || "");
                                }}
                                placeholder="Type or select short code..."
                                isClearable
                                className="w-full"
                            />
                        </div>
                            

                            {/* PASSPORT */}
                            <div className="flex items-end gap-3">
                                {/* Passport Input */}
                                <div className="flex-1">
                                    <label className="block text-sm font-semibold text-gray-800 mb-1">
                                        Passport No <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.passport_no}
                                        required
                                        onChange={(e) => setData("passport_no", e.target.value)}
                                        className="border border-gray-300 rounded px-2 py-1 w-full focus:ring focus:ring-blue-100 focus:border-blue-400"
                                    />
                                </div>

                                {/* Checkbox perfectly aligned */}
                                <div className="flex items-center h-full mb-[8px]">
                                    <label className="flex items-center text-sm font-semibold text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={!!data.passport_validity}
                                            onChange={(e) => setData("passport_validity", e.target.checked)}
                                        />

                                    </label>
                                </div>
                            </div>


                            {/* Names */}
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">
                                        First Name <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.first_name}
                                        required
                                        onChange={(e) =>
                                            setData("first_name", e.target.value)
                                        }
                                        className="w-full border rounded px-2 py-1"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.last_name}
                                        onChange={(e) =>
                                            setData("last_name", e.target.value)
                                        }
                                        className="w-full border rounded px-2 py-1"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-1">
                                    F/H Name
                                </label>
                                <input
                                    type="text"
                                    value={data.father_name}
                                    onChange={(e) =>
                                        setData("father_name", e.target.value)
                                    }
                                    className="w-full border rounded px-2 py-1"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">
                                        Date of Issue <span className="text-red-600">*</span>
                                    </label>
                                    <NormalDatePicker
                                        selectedDate={dateOfIssue || new Date()}
                                        handleDateChange={(date) =>
                                            handleDateChange(date, "date_of_issue")
                                        }
                                        className="w-full border rounded px-2 py-1"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">
                                        Place of Issue <span className="text-red-600">*</span>
                                    </label>
                                    <select
                                        value={data.place_of_issue}
                                        required
                                        onChange={(e) =>
                                            setData("place_of_issue", e.target.value)
                                        }
                                        className="w-full border rounded px-2 py-1"
                                    >
                                        <option>DHAKA</option>
                                        <option>CHATTOGRAM</option>
                                        <option>SYLHET</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">
                                        Date of Birth <span className="text-red-600">*</span>
                                    </label>
                                    <NormalDatePicker
                                        selectedDate={dateOfBirth || new Date()}
                                        handleDateChange={(date) =>
                                            handleDateChange(date, "date_of_birth")
                                        }
                                        className="w-full border rounded px-2 py-1"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">
                                        Sex <span className="text-red-600">*</span>
                                    </label>
                                    <select
                                        value={data.sex}
                                        required
                                        onChange={(e) =>
                                            setData("sex", e.target.value)
                                        }
                                        className="w-full border rounded px-2 py-1"
                                    >
                                        <option>MALE</option>
                                        <option>FEMALE</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">
                                        Nationality <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nationality"
                                        value={data.nationality}
                                        required
                                        onChange={(e) =>
                                            setData("nationality", e.target.value)
                                        }
                                        className="w-full border rounded px-2 py-1"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-1">
                                        Religion <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Religion"
                                        value={data.religion}
                                        required
                                        onChange={(e) => setData("religion", e.target.value)}
                                        className="w-full border rounded px-2 py-1"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">
                                        Profession <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Profession"
                                        value={data.profession}
                                        required
                                        onChange={(e) =>
                                            setData("profession", e.target.value)
                                        }
                                        className="w-full border rounded px-2 py-1"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-1">
                                        Mobile No <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.mobile_no}
                                        required
                                        onChange={(e) => setData("mobile_no", e.target.value)}
                                        className="w-full border rounded px-2 py-1"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                {/* After Days */}
                                <div className="flex items-center gap-2">
                                    <label htmlFor="report_after_days" className="block text-sm font-semibold text-gray-800">
                                        After
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={data.report_after_days || ""}
                                        onChange={(e) => setData("report_after_days", e.target.value)}
                                        className="w-28 border rounded px-2 py-1"
                                    />
                                    <span className="block text-sm font-semibold text-gray-800">days</span>
                                </div>

                                {/* Report Date */}
                                <div className="flex items-center gap-2">
                                    <label htmlFor="report_date" className="block text-sm font-semibold text-gray-800">
                                        Report Date
                                    </label>
                                    <NormalDatePicker
                                        selectedDate={reportDate}
                                        handleDateChange={(date) => handleDateChange(date, "report_date")}
                                        className="w-full border rounded px-2 py-1"
                                    />
                                </div>
                            </div>

                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="space-y-3">

                            {/* Photo Upload */}

                            <div className="mx-auto border border-gray-400 w-[140px] h-[160px] bg-gray-100 flex items-center justify-center text-sm text-gray-500">
                                Photo Preview
                            </div>
                            <input type="file" onChange={(e) => setData("photo", e.target.files[0])} />
                            {/* Serial No */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-1">
                                    Serial No #
                                </label>
                                <input
                                    type="text"
                                    value={data.serial_no}
                                    onChange={(e) => setData("serial_no", e.target.value)}
                                    className="w-full border rounded px-2 py-1"
                                />
                            </div>

                            {/* Country Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-1">
                                    Country Name <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.country_name}
                                    required
                                    onChange={(e) => setData("country_name", e.target.value)}
                                    className="w-full border rounded px-2 py-1"
                                />
                            </div>

                            {/* Amount + Free */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-1">
                                    Amount
                                </label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="number"
                                        value={data.amount || ""}
                                        onChange={(e) => setData("amount", e.target.value)}
                                        className="w-full border rounded px-2 py-1"
                                    />
                                    <label className="flex items-center text-sm font-medium text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={data.is_free}
                                            onChange={(e) => setData("is_free", e.target.checked)}
                                            className="mr-1 accent-blue-600 w-4 h-4"
                                        />
                                        Free
                                    </label>
                                </div>
                            </div>

                            {/* Discount */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-1">
                                    Discount
                                </label>
                                <input
                                    type="number"
                                    value={data.discount || ""}
                                    onChange={(e) => setData("discount", e.target.value)}
                                    className="w-full border rounded px-2 py-1"
                                />
                            </div>

                            {/* GCC Slip No */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-1">
                                    GCC Slip No
                                </label>
                                <input
                                    type="text"
                                    value={data.gcc_slip_no}
                                    onChange={(e) => setData("gcc_slip_no", e.target.value)}
                                    className="w-full border rounded px-2 py-1"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-end gap-3">
                                {/* GCC Slip Date */}
                                <div className="flex-1">
                                    <label className="block text-sm font-semibold text-gray-800 mb-1">
                                        GCC Slip Date
                                    </label>
                                    <NormalDatePicker
                                        selectedDate={gccSlipDate || new Date()}
                                        handleDateChange={(date) => handleDateChange(date, "gcc_slip_date")}
                                        className="w-full border rounded px-2 py-1"
                                    />
                                </div>

                                {/* Expire Days */}
                                <div className="flex items-end gap-2">
                                    <div>
                                        <label
                                            htmlFor="expire_days"
                                            className="block text-sm font-semibold text-gray-800 mb-1"
                                        >
                                            Expire
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                id="expire_days"
                                                value={data.expire_days || ""}
                                                onChange={(e) => setData("expire_days", e.target.value)}
                                                className="w-24 border border-gray-300 rounded px-2 py-[7px] focus:ring-2 focus:ring-blue-400 focus:outline-none text-[15px]"
                                            />
                                            <span className="text-sm font-semibold text-gray-800">days</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="mt-8 flex flex-col md:flex-row justify-between items-center border-t pt-4 gap-4">
                        <button
                            type="button"
                            className="bg-green-600 text-white font-semibold px-6 py-2 rounded hover:bg-green-700"
                            disabled={processing}
                        >
                            Refresh Scanner
                        </button>

                        <div className="text-red-600 font-bold text-lg text-center">
                            Scanner Disconnected
                        </div>

                        <div className="flex space-x-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => reset()}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default CreatePreMedical;
