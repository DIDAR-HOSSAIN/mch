import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EditMolecularSample({ sample }) {
    const { data, setData, errors, put, processing } = useForm({
        patient_id: sample.patient_id || "",
        name: sample.name || "",
        collection_date: sample.collection_date || "",
        received_date: sample.received_date || "",
        received_by: sample.received_by || "",
        collection_status: sample.collection_status || "Pending",
        received_status: sample.received_status || "Pending",
        remarks: sample.remarks || "",
    });

    const [collectionDate, setCollectionDate] = useState(
        sample.collection_date ? new Date(sample.collection_date) : null
    );
    const [receivedDate, setReceivedDate] = useState(
        sample.received_date ? new Date(sample.received_date) : null
    );

    // Update the state with the selected date and format it for frontend display
    const handleCollectionDateChange = (date) => {
        setCollectionDate(date);
        setData(
            "collection_date",
            date ? date.toISOString().split("T")[0] : "" // Store as YYYY-MM-DD in backend
        );
    };

    // Update the state with the selected date and format it for frontend display
    const handleReceivedDateChange = (date) => {
        setReceivedDate(date);
        setData(
            "received_date",
            date ? date.toISOString().split("T")[0] : "" // Store as YYYY-MM-DD in backend
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("samples.update", sample.id));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Edit Molecular Sample
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Patient ID */}
                <div>
                    <label
                        htmlFor="patient_id"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Patient ID
                    </label>
                    <input
                        id="patient_id"
                        type="text"
                        value={data.patient_id}
                        onChange={(e) => setData("patient_id", e.target.value)}
                        className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                            errors.patient_id ? "border-red-500" : ""
                        }`}
                        disabled
                    />
                    {errors.patient_id && (
                        <p className="mt-2 text-sm text-red-600">
                            {errors.patient_id}
                        </p>
                    )}
                </div>

                {/* Name */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                            errors.name ? "border-red-500" : ""
                        }`}
                    />
                    {errors.name && (
                        <p className="mt-2 text-sm text-red-600">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Collection Date */}
                <div>
                    <label
                        htmlFor="collection_date"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Collection Date
                    </label>
                    <DatePicker
                        selected={collectionDate}
                        dateFormat="dd/MM/yyyy" // Display as DD-MM-YYYY
                        onChange={handleCollectionDateChange}
                        className={`mt-1 block w-full px-4 py-2 rounded-md shadow-sm sm:text-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.collection_date ? "border-red-500" : ""
                        }`}
                        placeholderText="Select a date"
                    />
                    {errors.collection_date && (
                        <p className="mt-2 text-sm text-red-600">
                            {errors.collection_date}
                        </p>
                    )}
                </div>

                {/* Received Date */}
                <div>
                    <label
                        htmlFor="received_date"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Received Date
                    </label>
                    <DatePicker
                        selected={receivedDate}
                        dateFormat="dd/MM/yyyy" // Display as DD-MM-YYYY
                        onChange={handleReceivedDateChange}
                        className={`mt-1 block w-full px-4 py-2 rounded-md shadow-sm sm:text-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.received_date ? "border-red-500" : ""
                        }`}
                        placeholderText="Select a date"
                    />
                    {errors.received_date && (
                        <p className="mt-2 text-sm text-red-600">
                            {errors.received_date}
                        </p>
                    )}
                </div>

                {/* Received By */}
                <div>
                    <label
                        htmlFor="received_by"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Received By
                    </label>
                    <input
                        id="received_by"
                        type="text"
                        value={data.received_by}
                        onChange={(e) => setData("received_by", e.target.value)}
                        className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                            errors.received_by ? "border-red-500" : ""
                        }`}
                    />
                    {errors.received_by && (
                        <p className="mt-2 text-sm text-red-600">
                            {errors.received_by}
                        </p>
                    )}
                </div>

                {/* Collection Status */}
                <div>
                    <label
                        htmlFor="collection_status"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Collection Status
                    </label>
                    <select
                        id="collection_status"
                        value={data.collection_status}
                        onChange={(e) =>
                            setData("collection_status", e.target.value)
                        }
                        className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                            errors.collection_status ? "border-red-500" : ""
                        }`}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Collected">Collected</option>
                        <option value="Failed">Failed</option>
                    </select>
                    {errors.collection_status && (
                        <p className="mt-2 text-sm text-red-600">
                            {errors.collection_status}
                        </p>
                    )}
                </div>

                {/* Received Status */}
                <div>
                    <label
                        htmlFor="received_status"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Received Status
                    </label>
                    <select
                        id="received_status"
                        value={data.received_status}
                        onChange={(e) =>
                            setData("received_status", e.target.value)
                        }
                        className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                            errors.received_status ? "border-red-500" : ""
                        }`}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Received">Received</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                    {errors.received_status && (
                        <p className="mt-2 text-sm text-red-600">
                            {errors.received_status}
                        </p>
                    )}
                </div>

                {/* Remarks */}
                <div>
                    <label
                        htmlFor="remarks"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Remarks
                    </label>
                    <textarea
                        id="remarks"
                        value={data.remarks}
                        onChange={(e) => setData("remarks", e.target.value)}
                        className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                            errors.remarks ? "border-red-500" : ""
                        }`}
                    ></textarea>
                    {errors.remarks && (
                        <p className="mt-2 text-sm text-red-600">
                            {errors.remarks}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                        disabled={processing}
                    >
                        {processing ? "Updating..." : "Update Sample"}
                    </button>
                </div>
            </form>
        </div>
    );
}
