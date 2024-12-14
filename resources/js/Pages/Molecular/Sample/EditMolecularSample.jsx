import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import "react-datepicker/dist/react-datepicker.css";
import InputLabel from "@/Components/InputLabel";
import CustomDatePicker from "@/Components/DatePicker";
import { format, parseISO } from "date-fns";
import InputError from "@/Components/InputError";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

export default function EditMolecularSample({ auth, sample }) {
    const [sampleReceivedDate, setSampleReceivedDate] = useState(
        sample.received_date ? parseISO(sample.received_date) : new Date()
    );
    const [sampleCollectionDate, setSampleCollectionDate] = useState(
        sample.collection_date ? parseISO(sample.collection_date) : new Date()
    );

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

    const handleCollectionDateChange = (date) => {
        setSampleCollectionDate(date);
        setData("collection_date", format(date, "yyyy-MM-dd HH:mm:ss"));
    };

    const handleReceivedDateChange = (date) => {
        setSampleReceivedDate(date);
        setData("received_date", format(date, "yyyy-MM-dd HH:mm:ss"));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("samples.update", sample.id));
    };

    return (
        <AdminDashboardLayout user={auth.user}>
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                        Edit Molecular Sample
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Grid Container */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Patient ID */}
                            <div>
                                <InputLabel htmlFor="patient_id" value="Patient ID" />
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
                                <InputError message={errors.patient_id} className="mt-2" />
                            </div>

                            {/* Name */}
                            <div>
                                <InputLabel htmlFor="name" value="Name" />
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                                        errors.name ? "border-red-500" : ""
                                    }`}
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            {/* Collection Date */}
                            <div>
                                <InputLabel htmlFor="collection_date" value="Collection Date" />
                                <CustomDatePicker
                                    selectedDate={sampleCollectionDate}
                                    handleDateChange={handleCollectionDateChange}
                                />
                                <InputError message={errors.collection_date} className="mt-2" />
                            </div>

                            {/* Received Date */}
                            <div>
                                <InputLabel htmlFor="received_date" value="Received Date" />
                                <CustomDatePicker
                                    selectedDate={sampleReceivedDate}
                                    handleDateChange={handleReceivedDateChange}
                                />
                                <InputError message={errors.received_date} className="mt-2" />
                            </div>

                            {/* Received By */}
                            <div>
                                <InputLabel htmlFor="received_by" value="Received By" />
                                <input
                                    id="received_by"
                                    type="text"
                                    value={data.received_by}
                                    onChange={(e) => setData("received_by", e.target.value)}
                                    className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                                        errors.received_by ? "border-red-500" : ""
                                    }`}
                                />
                                <InputError message={errors.received_by} className="mt-2" />
                            </div>

                            {/* Collection Status */}
                            <div>
                                <InputLabel htmlFor="collection_status" value="Collection Status" />
                                <select
                                    id="collection_status"
                                    value={data.collection_status}
                                    onChange={(e) => setData("collection_status", e.target.value)}
                                    className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                                        errors.collection_status ? "border-red-500" : ""
                                    }`}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Collected">Collected</option>
                                    <option value="Failed">Failed</option>
                                </select>
                                <InputError message={errors.collection_status} className="mt-2" />
                            </div>

                            {/* Received Status */}
                            <div>
                                <InputLabel htmlFor="received_status" value="Received Status" />
                                <select
                                    id="received_status"
                                    value={data.received_status}
                                    onChange={(e) => setData("received_status", e.target.value)}
                                    className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                                        errors.received_status ? "border-red-500" : ""
                                    }`}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Received">Received</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                                <InputError message={errors.received_status} className="mt-2" />
                            </div>

                            {/* Remarks */}
                            <div className="md:col-span-2">
                                <InputLabel htmlFor="remarks" value="Remarks" />
                                <textarea
                                    id="remarks"
                                    value={data.remarks}
                                    onChange={(e) => setData("remarks", e.target.value)}
                                    className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                                        errors.remarks ? "border-red-500" : ""
                                    }`}
                                    rows="4"
                                ></textarea>
                                <InputError message={errors.remarks} className="mt-2" />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-blue-600 text-white font-semibold text-sm tracking-wider rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                                disabled={processing}
                            >
                                {processing ? "Updating..." : "Update Sample"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminDashboardLayout>
    );
}
