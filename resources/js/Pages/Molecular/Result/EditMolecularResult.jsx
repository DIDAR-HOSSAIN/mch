import React from "react";
import { useForm } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const EditMolecularResult = ({ auth, molecularResult }) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        results: molecularResult.map((result) => ({
            id: result.id,
            sample_id: result.sample_id || "",
            patient_id: result.patient_id || "",
            test_id: result.test_id || "",
            investigation: result.investigation || "",
            result: result.result || "",
            unit: result.unit || "",
            result_status: result.result_status || "",
            specimen: result.specimen || "",
            result_copies: result.result_copies || "",
            methodology: result.methodology || "Real-Time PCR based on TaqMan Technology",
            remarks: result.remarks || "",
            comments: result.comments || "",
        })),
    });

    const handleChange = (index, field, value) => {
        const updatedResults = [...data.results];
        updatedResults[index][field] = value;
        setData("results", updatedResults);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        data.results.forEach((result) => {
            put(route("results.update", { result: result.id }), {
                data: result,
                onSuccess: () => {
                    alert("Results updated successfully!");
                    reset();
                },
                onError: () => {
                    console.error("Error updating results");
                },
            });
        });
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Molecular Results
                </h2>
            }
        >
            <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-4">
                <h2 className="text-2xl font-bold mb-8 text-center text-blue-700">
                    Update Test Results
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {data.results.map((result, index) => (
                        <div
                            key={result.id}
                            className="p-4 border rounded-lg bg-gray-50 shadow-md"
                        >
                            {/* Static Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                {["sample_id", "patient_id", "test_id"].map((field) => (
                                    <div key={field}>
                                        <label className="block text-gray-700 font-medium mb-1">
                                            {field.replace("_", " ").toUpperCase()}
                                        </label>
                                        <input
                                            type="text"
                                            value={result[field]}
                                            readOnly
                                            className="w-full px-4 py-2 border rounded-md bg-gray-100"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Editable Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                {[
                                    { field: "investigation", type: "text", readOnly: true },
                                    { field: "methodology", type: "text", readOnly: false },
                                    { field: "result_status", type: "select", options: ["Negative", "Positive"] },
                                    { field: "specimen", type: "select", options: ["Whole Blood", "Plasma", "Serum", "Cervical Swab"] },
                                    { field: "result", type: "text", readOnly: false },
                                    ...(result.result_status === "Negative" && result.investigation !== "Human Leukocyte Antigen B 27 (HLA B27) Qualitative"
                                        ? [{ field: "unit", type: "text", readOnly: false }]
                                        : []),
                                    ...(result.result_status === "Positive" && result.investigation !== "Human Leukocyte Antigen B 27 (HLA B27) Qualitative"
                                        ? [{ field: "result_copies", type: "text", readOnly: false }]
                                        : []),
                                ].map(({ field, type, options, readOnly }) => (
                                    <div key={field}>
                                        <label className="block text-gray-700 font-medium mb-1">
                                            {field.replace("_", " ").toUpperCase()}
                                        </label>
                                        {type === "select" ? (
                                            <select
                                                value={result[field]}
                                                onChange={(e) =>
                                                    handleChange(index, field, e.target.value)
                                                }
                                                className="block w-full mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="" disabled>
                                                    Select {field.replace("_", " ")}
                                                </option>
                                                {options.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type={type}
                                                value={result[field]}
                                                onChange={(e) =>
                                                    handleChange(index, field, e.target.value)
                                                }
                                                readOnly={readOnly}
                                                className={`w-full px-4 py-2 border rounded-md ${
                                                    readOnly ? "bg-gray-100" : "focus:ring-2 focus:ring-blue-500"
                                                }`}
                                            />
                                        )}
                                        {errors[`results.${index}.${field}`] && (
                                            <span className="text-red-500 text-sm">
                                                {errors[`results.${index}.${field}`]}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Remarks and Comments */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {["remarks", "comments"].map((field) => (
                                    <div key={field}>
                                        <label className="block text-gray-700 font-medium mb-1">
                                            {field.toUpperCase()}
                                        </label>
                                        <textarea
                                            value={result[field]}
                                            onChange={(e) =>
                                                handleChange(index, field, e.target.value)
                                            }
                                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                            rows="3"
                                        ></textarea>
                                        {errors[`results.${index}.${field}`] && (
                                            <span className="text-red-500 text-sm">
                                                {errors[`results.${index}.${field}`]}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md"
                        >
                            {processing ? "Updating..." : "Update Results"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default EditMolecularResult;
