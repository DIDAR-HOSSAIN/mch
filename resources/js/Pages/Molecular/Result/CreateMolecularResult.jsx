import React from "react";
import { useForm } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const CreateMolecularResult = ({ auth, tests }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        results: tests.map((test) => ({
            sample_id: test.sample?.sample_id || "",
            patient_id: test.patient_id || "",
            test_id: test.test_id || test.id, // Use test.id as fallback
            investigation: test.test_name || "",
            result: "",
            unit: "",
            methodology: "Real-Time PCR based on TaqMan Technology",
            remarks: "",
            comments: "",
        })),
    });

    console.log('create molecular redults', data)

    const handleChange = (index, field, value) => {
        const updatedResults = [...data.results];
        updatedResults[index][field] = value;
        setData("results", updatedResults);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("results.store"), {
            onSuccess: () => {
                alert("Results submitted successfully!");
                reset();
            },
        });
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Molecular Results
                </h2>
            }
        >
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-8 text-center text-blue-700">
                Enter Test Results
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {data.results.map((result, index) => (
                    <div
                        key={index}
                        className="p-4 border rounded-lg bg-gray-50 shadow-md"
                    >
                        {/* Test Header */}
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">
                                {tests[index].test_name}{" "}
                                <span className="text-sm text-gray-500">
                                    (Fee: {tests[index].test_fee} | Date: {tests[index].test_date})
                                </span>
                            </h3>
                        </div>

                        {/* Test Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Sample ID
                                </label>
                                <input
                                    type="text"
                                    defaultValue={result.sample_id}
                                    readOnly
                                    className="w-full px-4 py-2 border rounded-md bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Patient ID
                                </label>
                                <input
                                    type="text"
                                    defaultValue={result.patient_id}
                                    readOnly
                                    className="w-full px-4 py-2 border rounded-md bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Test ID
                                </label>
                                <input
                                    type="text"
                                    defaultValue={result.test_id}
                                    readOnly
                                    className="w-full px-4 py-2 border rounded-md bg-gray-100"
                                />
                            </div>
                        </div>

                        {/* Editable Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Investigation
                                </label>
                                <input
                                    type="text"
                                    value={result.investigation}
                                    readOnly
                                    className="w-full px-4 py-2 border rounded-md bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Result
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Result"
                                    value={result.result}
                                    onChange={(e) =>
                                        handleChange(index, "result", e.target.value)
                                    }
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Unit
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Unit"
                                    value={result.unit}
                                    onChange={(e) =>
                                        handleChange(index, "unit", e.target.value)
                                    }
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Methodology
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Methodology"
                                    value={result.methodology}
                                    onChange={(e) =>
                                        handleChange(index, "methodology", e.target.value)
                                    }
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Remarks
                                </label>
                                <textarea
                                    placeholder="Enter Remarks"
                                    value={result.remarks}
                                    onChange={(e) =>
                                        handleChange(index, "remarks", e.target.value)
                                    }
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                    rows="3"
                                ></textarea>
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Comments
                            </label>
                            <textarea
                                placeholder="Enter Comments"
                                value={result.comments}
                                onChange={(e) =>
                                    handleChange(index, "comments", e.target.value)
                                }
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                rows="3"
                            ></textarea>
                        </div>
                    </div>
                ))}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                        disabled={processing}
                    >
                        {processing ? "Submitting..." : "Submit Results"}
                    </button>
                </div>
            </form>
        </div>
        </AdminDashboardLayout>
    );
};

export default CreateMolecularResult;
