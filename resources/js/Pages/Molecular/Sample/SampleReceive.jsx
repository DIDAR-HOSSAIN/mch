import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const SampleReceive = ({ auth, collectedSamples }) => {
    const { data, setData, put, processing, errors } = useForm({
        patient_id: "",
        name: "",
        collection_date: "",
        collection_status: "",
        received_date: new Date().toISOString().split("T")[0], // Default to today
        received_by: auth.user.name,
        received_status: "Received",
        remarks: "",
    });

    const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(() => {
        if (data.patient_id) {
            const patient = collectedSamples.find((sample) => sample.patient_id === data.patient_id);
            if (patient) {
                setSelectedPatient(patient);
                setData((prev) => ({
                    ...prev,
                    name: patient.name || "",
                    collection_date: patient.collection_date || "",
                    collection_status: patient.collection_status || "",
                }));
            }
        } else {
            setSelectedPatient(null);
            setData((prev) => ({
                ...prev,
                name: "",
                collection_date: "",
                collection_status: "",
            }));
        }
    }, [data.patient_id, collectedSamples]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedPatient) {
            put(route("samples.receive.update", selectedPatient.id), {
                onSuccess: () => alert("Sample updated successfully!"),
                onError: () => alert("Failed to update sample."),
            });
        } else {
            alert("Please select a valid patient.");
        }
    };

    return (
        <AdminDashboardLayout user={auth.user}>
            <form
                onSubmit={handleSubmit}
                className="space-y-6 max-w-3xl mx-auto px-4 py-6 bg-white shadow-md rounded-lg"
            >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Patient ID Selection */}
                    <div>
                        <InputLabel htmlFor="patient_id" value="Patient ID" />
                        <select
                            id="patient_id"
                            value={data.patient_id}
                            onChange={(e) => setData("patient_id", e.target.value)}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        >
                            <option value="">Select Patient</option>
                            {collectedSamples.map((sample) => (
                                <option key={sample.id} value={sample.patient_id}>
                                    {sample.patient_id}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.patient_id} className="mt-2" />
                    </div>

                    {/* Patient Name */}
                    <div>
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput
                            id="name"
                            value={data.name}
                            readOnly
                            className="block w-full bg-gray-100 border-gray-300 rounded-md"
                        />
                    </div>
                </div>

                {/* Collection Date */}
                <div>
                    <InputLabel htmlFor="collection_date" value="Collection Date" />
                    <TextInput
                        id="collection_date"
                        value={data.collection_date}
                        readOnly
                        className="block w-full bg-gray-100 border-gray-300 rounded-md"
                    />
                </div>

                {/* Collection Status */}
                <div>
                    <InputLabel htmlFor="collection_status" value="Collection Status" />
                    <select
                        id="collection_status"
                        value={data.collection_status}
                        onChange={(e) => setData("collection_status", e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        disabled
                    >
                        <option value="Pending">Pending</option>
                        <option value="Collected">Collected</option>
                        <option value="Failed">Failed</option>
                    </select>
                    <InputError message={errors.collection_status} className="mt-2" />
                </div>

                {/* Received Date */}
                <div>
                    <InputLabel htmlFor="received_date" value="Received Date" />
                    <TextInput
                        id="received_date"
                        type="date"
                        value={data.received_date}
                        onChange={(e) => setData("received_date", e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                    <InputError message={errors.received_date} className="mt-2" />
                </div>

                {/* Received By */}
                <div>
                    <InputLabel htmlFor="received_by" value="Received By" />
                    <TextInput
                        id="received_by"
                        value={data.received_by}
                        readOnly
                        className="block w-full bg-gray-100 border-gray-300 rounded-md"
                    />
                </div>

                {/* Received Status */}
                <div>
                    <InputLabel htmlFor="received_status" value="Received Status" />
                    <select
                        id="received_status"
                        value={data.received_status}
                        onChange={(e) => setData("received_status", e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    >
                        <option value="Received">Received</option>
                        <option value="Pending">Pending</option>
                    </select>
                    <InputError message={errors.received_status} className="mt-2" />
                </div>

                {/* Remarks */}
                <div>
                    <InputLabel htmlFor="remarks" value="Remarks" />
                    <textarea
                        id="remarks"
                        value={data.remarks}
                        onChange={(e) => setData("remarks", e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        rows="4"
                    />
                    <InputError message={errors.remarks} className="mt-2" />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {processing ? "Processing..." : "Submit"}
                    </button>
                </div>
            </form>
        </AdminDashboardLayout>
    );
};

export default SampleReceive;
