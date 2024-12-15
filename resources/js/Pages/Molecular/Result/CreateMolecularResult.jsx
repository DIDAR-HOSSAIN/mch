import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

const CreateMolecularResult = ({ tests }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        results: {}, // Object to hold the form data dynamically
    });

    const handleFieldChange = (testId, fieldName, value) => {
        setData("results", {
            ...data.results,
            [testId]: { ...data.results[testId], [fieldName]: value },
        });
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
        <div className="p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
                Enter Test Results
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {tests.map((test) => (
                    <div
                        key={test.id}
                        className="p-4 border rounded-lg bg-gray-50 shadow-sm"
                    >
                        {/* Test Title */}
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            {test.test_name} <span className="text-sm text-gray-500">(Fee: {test.test_fee} | Date: {test.test_date})</span>
                        </h3>

                        {/* Sample ID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Sample ID
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Sample ID"
                                    value={data.results[test.id]?.sample_id || ""}
                                    onChange={(e) =>
                                        handleFieldChange(test.id, "sample_id", e.target.value)
                                    }
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Patient ID
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Sample ID"
                                    value={data.results[test.id]?.patient_id || ""}
                                    onChange={(e) =>
                                        handleFieldChange(test.id, "patient_id", e.target.value)
                                    }
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Investigation */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Investigation
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Investigation"
                                    value={data.results[test.id]?.investigation || ""}
                                    onChange={(e) =>
                                        handleFieldChange(
                                            test.id,
                                            "investigation",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Result and Unit */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Result
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Result"
                                    value={data.results[test.id]?.result || ""}
                                    onChange={(e) =>
                                        handleFieldChange(test.id, "result", e.target.value)
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
                                    value={data.results[test.id]?.unit || ""}
                                    onChange={(e) =>
                                        handleFieldChange(test.id, "unit", e.target.value)
                                    }
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Methodology */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">
                                Methodology
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Methodology"
                                value={data.results[test.id]?.methodology || ""}
                                onChange={(e) =>
                                    handleFieldChange(
                                        test.id,
                                        "methodology",
                                        e.target.value
                                    )
                                }
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Remarks */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">
                                Remarks
                            </label>
                            <textarea
                                placeholder="Enter Remarks"
                                value={data.results[test.id]?.remarks || ""}
                                onChange={(e) =>
                                    handleFieldChange(test.id, "remarks", e.target.value)
                                }
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                rows="3"
                            ></textarea>
                        </div>

                        {/* Comments */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Comments
                            </label>
                            <textarea
                                placeholder="Enter Comments"
                                value={data.results[test.id]?.comments || ""}
                                onChange={(e) =>
                                    handleFieldChange(test.id, "comments", e.target.value)
                                }
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                rows="3"
                            ></textarea>
                        </div>
                    </div>
                ))}

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white w-full px-6 py-2 rounded-md hover:bg-blue-700"
                        disabled={processing}
                    >
                        {processing ? "Submitting..." : "Submit Results"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateMolecularResult;
