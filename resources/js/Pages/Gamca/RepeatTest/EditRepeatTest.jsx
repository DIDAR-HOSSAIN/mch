import React, { useEffect, useState } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

export default function EditRepeatTest({ auth, repeatTest, tests }) {
    const { data, setData, put, processing, errors } = useForm({
        delivery_date: repeatTest.delivery_date || "",
        is_free: repeatTest.is_free || false,
        deduct: repeatTest.deduct || 0,
        total: repeatTest.total || 0,
        net_pay: repeatTest.net_pay || 0,
        items: repeatTest.items.map((item) => ({
            medical_test_id: item.medical_test_id,
            amount: item.amount,
        })),
    });

    const [selectedTests, setSelectedTests] = useState(
        repeatTest.items.map((item) => ({
            id: item.medical_test_id,
            fee: item.amount,
        }))
    );

    // ✅ handle test selection toggle
    const handleSelectTest = (test) => {
        const exists = selectedTests.find((t) => t.id === test.id);
        if (exists) {
            setSelectedTests(selectedTests.filter((t) => t.id !== test.id));
        } else {
            setSelectedTests([...selectedTests, { id: test.id, fee: test.fee }]);
        }
    };

    // ✅ calculate totals automatically
    useEffect(() => {
        const total = selectedTests.reduce((sum, t) => sum + Number(t.fee || 0), 0);
        const deduct = Number(data.deduct || 0);
        const net = data.is_free ? 0 : total - deduct;

        setData("total", total);
        setData("net_pay", net);
    }, [selectedTests, data.deduct, data.is_free]);

    // ✅ handle update submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const items = selectedTests.map((t) => ({
            medical_test_id: t.id,
            amount: t.fee,
        }));

        const payload = { ...data, items };

        router.put(route("repeat-test.update", repeatTest.id), payload, {
            preserveScroll: true,
            onStart: () => console.log("Updating..."),
            onSuccess: () => console.log("✅ Updated successfully!"),
            onError: (err) => console.error("❌ Error:", err),
        });
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold">Edit Repeat Test</h2>}
        >
            <Head title="Edit Repeat Test" />

            <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-6 space-y-6">
                {/* Patient Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                        <h2 className="text-lg font-semibold text-blue-700 border-b pb-1">
                            Patient Information
                        </h2>

                        {repeatTest.pre_medical ? (
                            <div className="text-sm space-y-2">
                                <p>
                                    <strong>Serial No:</strong>{" "}
                                    {repeatTest.pre_medical.serial_no}
                                </p>
                                <p>
                                    <strong>Name:</strong>{" "}
                                    {repeatTest.pre_medical.first_name}{" "}
                                    {repeatTest.pre_medical.last_name}
                                </p>
                                <p>
                                    <strong>Passport:</strong>{" "}
                                    {repeatTest.pre_medical.passport_no}
                                </p>
                                <p>
                                    <strong>Country:</strong>{" "}
                                    {repeatTest.pre_medical.country_name}
                                </p>
                                <p>
                                    <strong>Agency:</strong>{" "}
                                    {repeatTest.pre_medical.agency_name}
                                </p>
                                {repeatTest.pre_medical.photo && (
                                    <img
                                        src={`/images/passengers/${repeatTest.pre_medical.photo}`}
                                        alt="patient"
                                        className="rounded-lg w-36 h-36 border object-cover"
                                    />
                                )}

                                <div>
                                    <label className="block text-sm font-medium">
                                        Delivery Date
                                    </label>
                                    <input
                                        type="date"
                                        value={data.delivery_date}
                                        onChange={(e) =>
                                            setData("delivery_date", e.target.value)
                                        }
                                        className="border rounded-md w-full px-2 py-1 text-sm"
                                    />
                                    {errors.delivery_date && (
                                        <p className="text-red-600 text-xs mt-1">
                                            {errors.delivery_date}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">
                                No patient information available.
                            </p>
                        )}
                    </div>

                    {/* Test List */}
                    <div className="col-span-1 overflow-y-auto max-h-[70vh] border rounded-lg p-2">
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
                                        <span className="text-sm text-gray-600">
                                            {test.fee} Tk
                                        </span>
                                        <input
                                            type="checkbox"
                                            checked={selectedTests.some(
                                                (t) => t.id === test.id
                                            )}
                                            onChange={() => handleSelectTest(test)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Summary */}
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
                                    onChange={(e) =>
                                        setData("deduct", e.target.value)
                                    }
                                    className="border rounded-md w-20 px-2 text-sm"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={data.is_free}
                                    onChange={(e) =>
                                        setData("is_free", e.target.checked)
                                    }
                                />
                                <label>Free</label>
                            </div>
                            <div className="flex justify-between font-semibold">
                                <span>Net Pay:</span>
                                <span>{data.net_pay} Tk</span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={handleSubmit}
                                disabled={processing}
                                className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md w-full"
                            >
                                {processing ? "Updating..." : "Update"}
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    router.visit(route("repeat-tests.index"))
                                }
                                className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded-md w-full"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    );
}
