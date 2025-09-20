import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import CustomDatePicker from "@/Components/DatePicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const CreateMolecularSample = ({ auth, regIds }) => {
    const [selectedPatient, setSelectedPatient] = useState("");
    const [sampleCollectionDate, setSampleCollectionDate] = useState(
        new Date()
    );

    const { data, setData, post, processing, errors } = useForm({
        patient_id: "",
        name: "",
        collection_date: "",
        collection_status: "Collected",
        remarks: "",
        user_name: auth.user.name,
    });

    useEffect(() => {
        if (data.patient_id) {
            const patient = regIds.find(
                (p) => String(p.patient_id) === String(data.patient_id)
            );

            if (patient) {
                setSelectedPatient(patient);

                const createdDate = patient.created_at
                    ? new Date(patient.created_at)
                    : new Date();

                setSampleCollectionDate(createdDate);

                setData((prev) => ({
                    ...prev,
                    name: patient.name || "",
                    collection_date: format(createdDate, "yyyy-MM-dd HH:mm:ss"),
                }));
            } else {
                setSelectedPatient("");
                setSampleCollectionDate(new Date());
                setData((prev) => ({
                    ...prev,
                    name: "",
                    collection_date: "",
                }));
            }
        }
    }, [data.patient_id, regIds]);



    const handleCollectionDateChange = (date) => {
        setSampleCollectionDate(date);
        const formattedDate = format(date, "yyyy-MM-dd HH:mm:ss");
        setData("collection_date", formattedDate);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("samples.store"));
    };

    return (
        <AdminDashboardLayout user={auth.user}>
            <div className="flex justify-center bg-gradient-to-br from-blue-100 to-blue-300 py-10 px-4">
                <form
                    onSubmit={submit}
                    className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 space-y-6"
                >
                    <h1 className="text-2xl font-bold text-gray-800 text-center">
                        Molecular Sample Collection
                    </h1>

                    {/* Patient ID and Name */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div>
                            <InputLabel
                                htmlFor="patient_id"
                                value="Patient ID"
                            />
                            <select
                                id="patient_id"
                                value={data.patient_id}
                                onChange={(e) => setData("patient_id", e.target.value)}
                                className="block w-full mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Patient</option>
                                {regIds.map((patient) => (
                                    <option
                                        key={patient.id}
                                        value={patient.patient_id}
                                    >
                                        {patient.patient_id} - {patient.name}
                                    </option>
                                ))}
                            </select>

                            <InputError
                                message={errors.patient_id}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="name" value="Name" />
                            <TextInput
                                id="name"
                                value={data.name}
                                readOnly
                                className="block w-full mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Collection Date and Status */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div>
                            <InputLabel
                                htmlFor="collection_date"
                                value="Collection Date"
                            />
                            <CustomDatePicker
                                selectedDate={sampleCollectionDate}
                                handleDateChange={handleCollectionDateChange}
                            />
                            <InputError
                                message={errors.collection_date}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="collection_status"
                                value="Collection Status"
                            />
                            <select
                                id="collection_status"
                                value={data.collection_status}
                                onChange={(e) =>
                                    setData("collection_status", e.target.value)
                                }
                                className="block w-full mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="Pending">Pending</option>
                                <option value="Collected">Collected</option>
                                <option value="Failed">Failed</option>
                            </select>
                            <InputError
                                message={errors.collection_status}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    {/* Remarks */}
                    <div>
                        <InputLabel htmlFor="remarks" value="Remarks" />
                        <textarea
                            id="remarks"
                            value={data.remarks}
                            onChange={(e) => setData("remarks", e.target.value)}
                            className="block w-full mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            rows="3"
                        />
                        <InputError message={errors.remarks} className="mt-2" />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
                            disabled={processing}
                        >
                            {processing ? "Creating..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default CreateMolecularSample;
