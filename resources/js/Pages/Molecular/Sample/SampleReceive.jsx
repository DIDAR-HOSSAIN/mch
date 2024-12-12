import CustomDatePicker from "@/Components/DatePicker";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const CreateMolecularSample = ({ auth, regIds, collectors, technicians }) => {
    const [sampleCollectionDate, setSampleCollectionDate] = useState(new Date());
    const [sampleReceivedDate, setSampleReceivedDate] = useState(new Date());
    const [selectedPatientId, setSelectedPatientId] = useState("");
    const [selectedPatientName, setSelectedPatientName] = useState("");

    useEffect(() => {
        if (Array.isArray(regIds) && selectedPatientId) {
            const selectedPatient = regIds.find(
                (patient) => patient.patient_id === selectedPatientId
            );
            setSelectedPatientName(selectedPatient ? selectedPatient.name : "");
        }
    }, [selectedPatientId, regIds]);

    const { data, setData, post, processing, errors } = useForm({
        patient_id: "",
        name: "",
        collection_date: "",
        received_date: "",
        collected_by: "",
        received_by: "",
        status: "",
        remarks: "",
    });

    const handlePatientChange = (e) => {
        const selectedPatientId = e.target.value;
        setSelectedPatientId(selectedPatientId);
        setData("patient_id", selectedPatientId);

        const selectedPatient = regIds.find(
            (patient) => patient.patient_id === selectedPatientId
        );
        if (selectedPatient) {
            setData("name", selectedPatient.name);
        }
    };

    const handleCollectionDateChange = (date) => {
        setSampleCollectionDate(date);
        setData("collection_date", date ? date.toISOString().split("T")[0] : null);
    };

    const handleReceivedDateChange = (date) => {
        setSampleReceivedDate(date);
        setData("received_date", date ? date.toISOString().split("T")[0] : null);
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
                    Molecular Sample Entry
                </h1>
            }
        >
            <Head title="Molecular Sample Entry" />
            <div className="py-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <form
                    onSubmit={submit}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Patient ID */}
                        <div>
                            <InputLabel htmlFor="patient_id">Patient ID:</InputLabel>
                            <select
                                id="patient_id"
                                onChange={handlePatientChange}
                                value={selectedPatientId}
                                className="block w-full mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select a patient</option>
                                {Array.isArray(regIds) &&
                                    regIds.map((patient) => (
                                        <option
                                            key={patient.id}
                                            value={patient.patient_id}
                                        >
                                            {patient.patient_id}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {/* Name */}
                        <div>
                            <InputLabel htmlFor="name">Name:</InputLabel>
                            <TextInput
                                id="name"
                                name="name"
                                value={selectedPatientName}
                                className="mt-1 block w-full"
                                readOnly
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        {/* Collection Date */}
                        <div>
                            <InputLabel htmlFor="collection_date">Collection Date:</InputLabel>
                            <CustomDatePicker
                                selectedDate={sampleCollectionDate}
                                handleDateChange={handleCollectionDateChange}
                            />
                            <InputError message={errors.collection_date} className="mt-2" />
                        </div>

                        {/* Received Date */}
                        <div>
                            <InputLabel htmlFor="received_date">Received Date:</InputLabel>
                            <CustomDatePicker
                                selectedDate={sampleReceivedDate}
                                handleDateChange={handleReceivedDateChange}
                            />
                            <InputError message={errors.received_date} className="mt-2" />
                        </div>

                        {/* Received By */}
                        <div>
                            <InputLabel htmlFor="received_by">Received By:</InputLabel>
                            <select
                                id="received_by"
                                value={data.received_by}
                                onChange={(e) => setData("received_by", e.target.value)}
                                className="block w-full mt-1 bg-white border border-gray-300 rounded-md shadow-sm"
                            >
                                <option value="">Select Technician</option>
                                {Array.isArray(technicians) &&
                                    technicians.map((technician) => (
                                        <option key={technician.id} value={technician.id}>
                                            {technician.name}
                                        </option>
                                    ))}
                            </select>
                            <InputError message={errors.received_by} className="mt-2" />
                        </div>

                        {/* Remarks */}
                        <div className="md:col-span-2 lg:col-span-4">
                            <InputLabel htmlFor="remarks">Remarks:</InputLabel>
                            <TextInput
                                id="remarks"
                                name="remarks"
                                value={data.remarks}
                                className="mt-1 block w-full"
                                onChange={(e) => setData("remarks", e.target.value)}
                            />
                            <InputError message={errors.remarks} className="mt-2" />
                        </div>
                    </div>
                    <div className="flex items-center justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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

export default CreateMolecularSample;
