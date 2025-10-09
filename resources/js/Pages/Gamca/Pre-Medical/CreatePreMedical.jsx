import React from "react";
import { useForm } from "@inertiajs/react";

const CreatePreMedical = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        short_code: "",
        passport_no: "",
        ten_years: false,
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
        free_amount: "",
        gcc_slip_no: "",
        gcc_slip_date: "",
        expire_days: "",
        photo: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("pre-medical.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="bg-[#dbe5f1] min-h-screen flex justify-center items-center p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-xl border border-gray-300 rounded-md w-full max-w-5xl p-6"
            >
                <h2 className="text-xl font-bold text-center text-gray-800 mb-4 border-b pb-2">
                    Entry Passenger Info
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* LEFT COLUMN */}
                    <div className="space-y-3">
                        {/* SHORT CODE */}
                        <div>
                            <label className="block text-sm font-semibold text-green-700 mb-1">
                                SHORT CODE #
                            </label>
                            <input
                                type="text"
                                value={data.short_code}
                                onChange={(e) => setData("short_code", e.target.value)}
                                className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>

                        {/* PASSPORT */}
                        <div className="flex items-end gap-3">
                            {/* Passport Input */}
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
                            </div>

                            {/* Checkbox perfectly aligned */}
                            <div className="flex items-center h-full mb-[6px]">
                                <label className="flex items-center text-sm font-semibold text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={data.ten_years}
                                        onChange={(e) => setData("ten_years", e.target.checked)}
                                        className="mr-1 accent-blue-600 w-4 h-4"
                                    />
                                    10 Yrs
                                </label>
                            </div>
                        </div>


                        {/* Names */}
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-sm font-semibold mb-1">
                                    First Name *
                                </label>
                                <input
                                    type="text"
                                    value={data.first_name}
                                    onChange={(e) =>
                                        setData("first_name", e.target.value)
                                    }
                                    className="w-full border rounded px-2 py-1"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">
                                    Last Name *
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
                                    Date of Issue
                                </label>
                                <input
                                    type="date"
                                    value={data.date_of_issue}
                                    onChange={(e) =>
                                        setData("date_of_issue", e.target.value)
                                    }
                                    className="w-full border rounded px-2 py-1"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">
                                    Place of Issue
                                </label>
                                <select
                                    value={data.place_of_issue}
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
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    value={data.date_of_birth}
                                    onChange={(e) =>
                                        setData("date_of_birth", e.target.value)
                                    }
                                    className="w-full border rounded px-2 py-1"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">
                                    Sex
                                </label>
                                <select
                                    value={data.sex}
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
                                    Nationality
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nationality"
                                    value={data.nationality}
                                    onChange={(e) =>
                                        setData("nationality", e.target.value)
                                    }
                                    className="w-full border rounded px-2 py-1"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-1">
                                    Religion
                                </label>
                                <input
                                    type="text"
                                    placeholder="Religion"
                                    value={data.religion}
                                    onChange={(e) => setData("religion", e.target.value)}
                                    className="w-full border rounded px-2 py-1"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-sm font-semibold mb-1">
                                    Profession
                                </label>
                                <input
                                    type="text"
                                    placeholder="Profession"
                                    value={data.profession}
                                    onChange={(e) =>
                                        setData("profession", e.target.value)
                                    }
                                    className="w-full border rounded px-2 py-1"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-1">
                                    Mobile No
                                </label>
                                <input
                                    type="text"
                                    value={data.mobile_no}
                                    onChange={(e) => setData("mobile_no", e.target.value)}
                                    className="w-full border rounded px-2 py-1"
                                />
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="After"
                                value={data.report_after_days}
                                onChange={(e) =>
                                    setData("report_after_days", e.target.value)
                                }
                                className="w-20 border rounded px-2 py-1"
                            />
                            <input
                                type="date"
                                value={data.report_date}
                                onChange={(e) =>
                                    setData("report_date", e.target.value)
                                }
                                className="flex-1 border rounded px-2 py-1"
                            />
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-3">

                        {/* Photo Upload */}

                        <div className="mx-auto border border-gray-400 w-[140px] h-[160px] bg-gray-100 flex items-center justify-center text-sm text-gray-500">
                            Photo Preview
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData("photo", e.target.files[0])}
                            className="w-full mt-2 border rounded px-2 py-1"
                        />

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
                                Country Name
                            </label>
                            <input
                                type="text"
                                value={data.country_name}
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
                                    value={data.amount}
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

                        {/* Free Amount */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1">
                                Free Amount
                            </label>
                            <input
                                type="number"
                                value={data.free_amount}
                                onChange={(e) => setData("free_amount", e.target.value)}
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

                        {/* GCC Slip Date + Expire Days */}
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-1">
                                    GCC Slip Date
                                </label>
                                <input
                                    type="date"
                                    value={data.gcc_slip_date}
                                    onChange={(e) => setData("gcc_slip_date", e.target.value)}
                                    className="w-full border rounded px-2 py-1"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-1">
                                    Expire Days
                                </label>
                                <input
                                    type="number"
                                    value={data.expire_days}
                                    onChange={(e) => setData("expire_days", e.target.value)}
                                    className="w-full border rounded px-2 py-1"
                                />
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
    );
};

export default CreatePreMedical;
