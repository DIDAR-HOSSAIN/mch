import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const CreateMolecularResult = ({ auth, tests }) => {
    const { message } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        results: tests.map((test) => ({
            sample_id: test.sample?.sample_id || "",
            patient_id: test.patient_id || "",
            test_id: test.test_id || test.id, // Use test.id as fallback
            investigation: test.test_name || "",
            result: "",
            unit: "",
            result_status: "Negative",
            specimen: "",
            result_copies: "",
            methodology: "Real-Time PCR based on TaqMan Technology",
            remarks: "",
            comments: "",
        })),
    });

    console.log("create molecular redults", data);

    const handleChange = (index, field, value) => {
        const updatedResults = [...data.results];
        updatedResults[index][field] = value;
        setData("results", updatedResults);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("results.store"), {
                onSuccess: () => {
                    console.log("Form submitted successfully!");
                },
            
            onError: (errors) => {
                alert("An error occurred. Please try again.");
                console.error(errors);
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
            <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-4">
                <h2 className="text-2xl font-bold mb-8 text-center text-blue-700">
                    Enter Test Results
                </h2>

                {message && (
                    <div
                        className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md my-3"
                        role="alert"
                    >
                        <div className="flex">
                            <div>
                                <p className="text-sm">{message}</p>
                            </div>
                        </div>
                    </div>
                )}

                {errors.error && (
                    <div
                        className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md my-3"
                        role="alert"
                    >
                        <div className="flex">
                            <div>
                                <p className="text-sm">{errors.error}</p>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {data.results.map((result, index) => (
                        <div
                            key={index}
                            className="p-4 border rounded-lg bg-gray-50 shadow-md"
                        >
                            {/* Test Header */}
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-700">
                                    {tests[index].test_name}
                                    <span className="text-sm text-gray-500">
                                        (Fee: {tests[index].test_fee} | Date:{" "}
                                        {tests[index].test_date})
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
                                        Methodology
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Methodology"
                                        value={result.methodology}
                                        readOnly
                                        className="w-full px-4 py-2 border rounded-md bg-gray-100"
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "methodology",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">
                                        Result Status
                                    </label>
                                    <select
                                        id={`result_status_${index}`} // Unique id for each select
                                        value={result.result_status}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "result_status",
                                                e.target.value
                                            )
                                        }
                                        className="block w-full mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="Negative">
                                            Negative
                                        </option>
                                        <option value="Positive">
                                            Positive
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">
                                        Specimen Type
                                    </label>
                                    <select
                                        id={`specimen${index}`} // Unique id for each select
                                        value={result.specimen}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "specimen",
                                                e.target.value
                                            )
                                        }
                                        className="block w-full mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="" disabled>
                                            Select Specimen
                                        </option>
                                        <option value="Whole Blood">
                                            Whole Blood
                                        </option>
                                        <option value="Plasma">Plasma</option>
                                        <option value="Serum">Serum</option>
                                        <option value="Cervical Swab">
                                            Cervical Swab
                                        </option>
                                    </select>
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
                                            handleChange(
                                                index,
                                                "result",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {result.investigation !== "Human Leukocyte Antigen B 27 (HLA B27) Qualitative" && result.result_status === "Negative" && (
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Unit</label>
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
                                )}

                                {result.investigation !== "Human Leukocyte Antigen B 27 (HLA B27) Qualitative" && result.result_status === "Positive" && (
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Result Copies</label>
                                        <input
                                            type="text"
                                            placeholder="Result Copies"
                                            value={result.result_copies}
                                            onChange={(e) =>
                                                handleChange(index, "result_copies", e.target.value)
                                            }
                                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                )}

                            </div>

                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <label className="block text-gray-700 font-medium mb-1">
                                        Remarks
                                    </label>
                                    <textarea
                                        placeholder="Enter Remarks"
                                        value={result.remarks}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "remarks",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                        rows="3"
                                    ></textarea>
                                </div>

                                <div className="w-1/2">
                                    <label className="block text-gray-700 font-medium mb-1">
                                        Comments
                                    </label>
                                    <textarea
                                        placeholder="Enter Comments"
                                        value={result.comments}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "comments",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                        rows="3"
                                    ></textarea>
                                </div>
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
