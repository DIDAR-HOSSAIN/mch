import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import CustomDatePicker from "@/Components/DatePicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const SampleReceive = ({ auth, collectedSamples }) => {
    console.log('from sample receive',collectedSamples);
    const [sampleReceivedDate, setSampleReceivedDate] = useState(new Date());
    const [sampleCollectionDate, setSampleCollectionDate] = useState(new Date());
    const [selectedPatient, setSelectedPatient] = useState(null);

    const { data, setData, put, processing, errors, reset } = useForm({
        patient_id: "",
        name: "",
        collection_date: "",
        collection_status: "",
        received_date: "",
        received_by: auth.user.name,
        received_status: "Received",
        remarks: "",
    });


    useEffect(() => {
        if (data.patient_id) {
            const patient = collectedSamples.find(
                (sample) => sample.patient_id === data.patient_id
            );
            if (patient) {
                setSelectedPatient(patient);
                setData((prev) => ({
                    ...prev,
                    name: patient.molecular_patient_reg.name || "",
                    collection_date: patient.collection_date || "",
                    collection_status: patient.collection_status || "",
                    remarks: patient.remarks || "",
                }));
                if (patient.collection_date) {
                    setSampleCollectionDate(new Date(patient.collection_date));
                }
            }
        } else {
            setSelectedPatient(null);
            setData((prev) => ({
                ...prev,
                name: "",
                collection_date: "",
                collection_status: "",
                remarks: "",
            }));
            setSampleCollectionDate(new Date());
        }
    }, [data.patient_id, collectedSamples]);

    const handleCollectionDateChange = (date) => {
        setSampleCollectionDate(date);
        const formattedDate = format(date, "yyyy-MM-dd HH:mm:ss");
        setData("collection_date", formattedDate);
    };

    const handleReceivedDateChange = (date) => {
        setSampleReceivedDate(date);
        const formattedDate = format(date, "yyyy-MM-dd HH:mm:ss");
        setData("received_date", formattedDate);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedPatient) {
            put(route("samples.receive.update", selectedPatient.id), {
                onSuccess: () => alert("Sample updated successfully!"),
                onError: () => alert("Failed to update sample."),
            });
            reset();
        } else {
            alert("Please select a valid patient.");
        }
    };

    return (
        <AdminDashboardLayout user={auth.user}>
            <div className="container mx-auto px-4 py-4 max-w-3xl">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 bg-white shadow-md rounded-lg p-6"
                >
                    <h2 className="text-lg font-semibold text-gray-700 border-b pb-4">
                        Sample Receive Form
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Patient ID Selection */}
                        <div>
                            <InputLabel htmlFor="patient_id" value="Patient ID" />
                            <select
                                id="patient_id"
                                value={data.patient_id}
                                onChange={(e) => setData("patient_id", e.target.value)}
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Collection Date */}
                        <div>
                            <InputLabel htmlFor="collection_date" value="Collection Date" />
                            <CustomDatePicker
                                selectedDate={sampleCollectionDate}
                                handleDateChange={handleCollectionDateChange}
                                disabled
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
                            >
                                <option value="Received">Received</option>
                                <option value="Pending">Pending</option>
                            </select>
                            <InputError message={errors.received_status} className="mt-2" />
                        </div>
                    </div>

                    {/* Remarks */}
                    <div>
                        <InputLabel htmlFor="remarks" value="Remarks" />
                        <textarea
                            id="remarks"
                            value={data.remarks}
                            onChange={(e) => setData("remarks", e.target.value)}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
                            rows="2"
                        />
                        <InputError message={errors.remarks} className="mt-2" />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
                        >
                            {processing ? "Processing..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default SampleReceive;
