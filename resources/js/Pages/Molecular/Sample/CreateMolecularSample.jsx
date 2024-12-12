import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import CustomDatePicker from "@/Components/DatePicker";
import "react-datepicker/dist/react-datepicker.css";
const CreateSampleForm = ({ auth, regIds }) => {
    const [selectedPatient, setSelectedPatient] = useState("");
    const [sampleCollectionDate, setSampleCollectionDate] = useState(new Date());

    const { data, setData, post, processing, errors } = useForm({
        patient_id: "",
        name: "",
        collection_date: "",
        collection_status: "Collected", // Default value
        remarks: "",
        user_name: auth.user.name,
    });

    useEffect(() => {
        if (data.patient_id) {
            const patient = regIds.find((p) => p.patient_id === data.patient_id);
            setSelectedPatient(patient || "");
            setData("name", patient?.name || "");
        }
    }, [data.patient_id]);

    const handleCollectionDateChange = (date) => {
        setSampleCollectionDate(date);
        setData("collection_date", date ? date.toISOString().split("T")[0] : null);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("samples.store"));
    };

    return (
        <AdminDashboardLayout user={auth.user}>
            <form onSubmit={submit} className="space-y-6 max-w-3xl mx-auto px-4 py-6 bg-white shadow-md rounded-lg">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div>
                        <InputLabel htmlFor="patient_id" value="Patient ID" />
                        <select
                            id="patient_id"
                            value={data.patient_id}
                            onChange={(e) => setData("patient_id", Number(e.target.value))} // Ensure it's a number
                            className="block w-full"
                            >
                            <option value="">Select Patient</option>
                            {regIds.map((patient) => (
                            <option key={patient.patient_id} value={patient.id}> {/* Use numeric ID */}
                                {patient.patient_id}
                            </option>
                            ))}
                            </select>

                        <InputError message={errors.patient_id} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput
                            id="name"
                            value={data.name}
                            readOnly
                            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div>
                            <InputLabel htmlFor="collection_date">Collection Date:</InputLabel>
                            <CustomDatePicker
                                selectedDate={sampleCollectionDate}
                                handleDateChange={handleCollectionDateChange}
                            />
                            <InputError message={errors.collection_date} className="mt-2" />
                        </div>

                    <div>
                        <InputLabel htmlFor="collection_status" value="Collection Status" />
                        <select
                            id="collection_status"
                            value={data.collection_status}
                            onChange={(e) => setData("collection_status", e.target.value)}
                            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Collected">Collected</option>
                            <option value="Failed">Failed</option>
                        </select>
                        <InputError message={errors.collection_status} className="mt-2" />
                    </div>
                </div>

                <div>
                    <InputLabel htmlFor="remarks" value="Remarks" />
                    <textarea
                        id="remarks"
                        value={data.remarks}
                        onChange={(e) => setData("remarks", e.target.value)}
                        className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        rows="2"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        disabled={processing}
                    >
                        {processing ? "Creating..." : "Submit"}
                    </button>
                </div>
            </form>
        </AdminDashboardLayout>
    );
};

export default CreateSampleForm;
