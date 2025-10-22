import React, { useState, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";

export default function CreateRepeatTest({ auth, preMedical, tests }) {
    console.log('premedical',preMedical);
    const { data, setData, post, processing, reset } = useForm({
        pre_medical_id: preMedical?.id || "",
        delivery_date: "",
        is_free: false,
        deduct: 0,
        total: 0,
        net_pay: 0,
        items: [],
    });

    const [selectedTests, setSelectedTests] = useState([]);

    const handleSelectTest = (test) => {
        const exists = selectedTests.find((t) => t.id === test.id);
        if (exists) {
            setSelectedTests(selectedTests.filter((t) => t.id !== test.id));
        } else {
            setSelectedTests([...selectedTests, test]);
        }
    };

    // ✅ Keep calculation logic here
    useEffect(() => {
        const total = selectedTests.reduce((sum, t) => sum + Number(t.fee || 0), 0);
        const deduct = Number(data.deduct || 0);
        const net = data.is_free ? 0 : total - deduct;
        setData("total", total);
        setData("net_pay", net);
    }, [selectedTests, data.deduct, data.is_free]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const items = selectedTests.map((t) => ({
            medical_test_id: t.id,
            amount: t.fee,
        }));
        post(route("repeat-tests.store"), { ...data, items });
    };


    return (
        <>
            <Head title="Repeat Test Entry" />
            <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left - Patient Info */}
                <div className="space-y-3">
                    <h2 className="text-lg font-semibold text-blue-700 border-b pb-1">
                        Patient Information
                    </h2>
                    <div className="text-sm space-y-2">
                        <p><strong>Serial No:</strong> {preMedical?.serial_no}</p>
                        <p><strong>Name:</strong> {preMedical?.first_name} {preMedical?.last_name}</p>
                        <p><strong>Passport:</strong> {preMedical?.passport_no}</p>
                        <p><strong>Country:</strong> {preMedical?.country_name}</p>
                        <p><strong>Agency:</strong> {preMedical?.agency_name}</p>
                        <img
                            src={`/images/passengers/${preMedical.photo}`}
                            alt="patient"
                            className="rounded-lg w-36 h-36 border object-cover"
                        />
                        <div>
                            <label className="block text-sm font-medium">Delivery Date</label>
                            <input
                                type="date"
                                value={data.delivery_date}
                                onChange={(e) => setData("delivery_date", e.target.value)}
                                className="border rounded-md w-full px-2 py-1 text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Middle - Test List */}
                <div className="col-span-1 md:col-span-1 overflow-y-auto max-h-[70vh] border rounded-lg p-2">
                    <h2 className="text-lg font-semibold text-blue-700 border-b pb-1 mb-2">
                        Test List
                    </h2>
                    <div className="space-y-2">
                        {tests.map((test) => (
                            <div
                                key={test.id}
                                className="flex justify-between items-center border-b py-1"
                            >
                                <label className="text-sm">{test.test_name}</label>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">{test.fee} Tk</span>
                                    <input
                                        type="checkbox"
                                        checked={selectedTests.some((t) => t.id === test.id)}
                                        onChange={() => handleSelectTest(test)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right - Summary */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-blue-700 border-b pb-1">
                        Summary
                    </h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span>Total:</span>
                            <span>{data.total} Tk</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <label>Deduct:</label>
                            <input
                                type="number"
                                value={data.deduct}
                                onChange={(e) => setData("deduct", e.target.value)}
                                className="border rounded-md w-20 px-2 text-sm"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={data.is_free}
                                onChange={(e) => setData("is_free", e.target.checked)}
                            />
                            <label>Free</label>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <span>Net Pay:</span>
                            <span>{data.net_pay} Tk</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <input type="checkbox" />
                            <label>Print X-Ray Report</label>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={handleSubmit}
                            disabled={processing}
                            className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md w-full"
                        >
                            {processing ? "Saving..." : "Save"}
                        </button>
                        <button
                            type="button"
                            onClick={() => reset()}
                            className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-md w-full"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}


