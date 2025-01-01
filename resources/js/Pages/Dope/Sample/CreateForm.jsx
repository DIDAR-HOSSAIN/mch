import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import NormalDatePicker from "@/Components/NormalDatePicker";
import TextInput from "@/Components/TextInput";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const CreateForm = ({ auth, dopeIds }) => {
    const [sampleCollectionDate, setSampleCollectionDate] = useState(
        new Date()
    );
    const [selectedPatientId, setSelectedPatientId] = useState("");
    const [selectedPatientName, setSelectedPatientName] = useState("");

    useEffect(() => {
        // Update the selected patient name when selectedPatientId changes
        if (Array.isArray(dopeIds) && selectedPatientId) {
            const selectedPatient = dopeIds.find(
                (patient) => patient.patient_id === selectedPatientId
            );
            setSelectedPatientName(selectedPatient ? selectedPatient.name : "");
        }
    }, [selectedPatientId, dopeIds]);

    const { data, setData, post, processing, errors } = useForm({
        patient_id: "",
        name: "",
        sample_collection_date: "",
        sample_status: "",
        remarks: "",
    });

    const handlePatientChange = (e) => {
        const selectedPatientId = e.target.value;
        setSelectedPatientId(selectedPatientId);
        setData((prevData) => ({
            ...prevData,
            patient_id: selectedPatientId,
        }));
        const selectedPatient = dopeIds.find(
            (patient) => patient.patient_id === selectedPatientId
        );
        if (selectedPatient) {
            setData((prevData) => ({
                ...prevData,
                name: selectedPatient.name,
            }));
        }
    };

    const handleDateChange = (date) => {
        setSampleCollectionDate(date);
        setData(
            "sample_collection_date",
            date ? date.toISOString().split("T")[0] : null
        );
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("sample.store"));
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    Sample Entry
                </h1>
            }
        >
            <Head title="Sample Entry" />
            <div className="py-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <form
                    onSubmit={submit}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                            <InputLabel htmlFor="patient_id">
                                Patient ID:
                            </InputLabel>
                            <select
                                id="patient_id"
                                onChange={handlePatientChange}
                                value={selectedPatientId}
                                className="block w-full mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select a patient</option>
                                {Array.isArray(dopeIds) &&
                                    dopeIds.map((dope) => (
                                        <option
                                            key={dope.id}
                                            value={dope.patient_id}
                                        >
                                            {dope.patient_id}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div>
                            <InputLabel htmlFor="name">Name:</InputLabel>
                            <TextInput
                                id="name"
                                name="name"
                                value={selectedPatientName}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                readOnly
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="sample_collection_date">
                                Sample Collection Date:
                            </InputLabel>
                            <NormalDatePicker
                                selectedDate={sampleCollectionDate}
                                handleDateChange={handleDateChange}
                            />
                            <InputError
                                message={errors.sample_collection_date}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="sample_status">
                                Sample Status:
                            </InputLabel>
                            <div className="mt-1">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300"
                                        value="Collected"
                                        checked={
                                            data.sample_status === "Collected"
                                        }
                                        onChange={() =>
                                            setData(
                                                "sample_status",
                                                "Collected"
                                            )
                                        }
                                    />
                                    <span className="ml-2">Collected</span>
                                </label>

                                <label className="inline-flex items-center ml-6">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300"
                                        value="Not Collected"
                                        checked={
                                            data.sample_status ===
                                            "Not Collected"
                                        }
                                        onChange={() =>
                                            setData(
                                                "sample_status",
                                                "Not Collected"
                                            )
                                        }
                                    />
                                    <span className="ml-2">Not Collected</span>
                                </label>
                            </div>
                            <InputError
                                message={errors.sample_status}
                                className="mt-2"
                            />
                        </div>

                        <div className="md:col-span-2 lg:col-span-4">
                            <InputLabel htmlFor="remarks">Remarks:</InputLabel>
                            <TextInput
                                id="remarks"
                                name="remarks"
                                value={data.remarks}
                                className="mt-1 block w-full"
                                autoComplete="remarks"
                                onChange={(e) =>
                                    setData("remarks", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.remarks}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            disabled={processing}
                        >
                            {processing ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default CreateForm;
