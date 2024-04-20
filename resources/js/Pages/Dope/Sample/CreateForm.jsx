import CustomDatePicker from "@/Components/DatePicker";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const CreateForm = ({ auth, dopeIds }) => {
    console.log("dope head", dopeIds);
    const [sampleCollectionDate, setSampleCollectionDate] = useState(
        new Date()
    );
    const [selectedPatientId, setSelectedPatientId] = useState(""); // Add this line
    const [selectedPatientName, setSelectedPatientName] = useState("");

    useEffect(() => {
        // Find the selected patient object from dopeIds array based on selectedPatientId
        const selectedPatient = dopeIds.find(
            (patient) => patient.patient_id === selectedPatientId
        );
        // Update the selected patient name
        if (selectedPatient) {
            setSelectedPatientName(selectedPatient.name);
        } else {
            setSelectedPatientName(""); // Reset name if no patient is selected
        }
    }, [selectedPatientId, dopeIds]);

    const { data, setData, post, processing, errors, reset } = useForm({
        patient_id: "",
        name: "",
        sample_collection_date: "",
        status: "",
        remarks: "",
        // other form fields...
    });

    const handlePatientChange = (e) => {
        setSelectedPatientId(e.target.value);
        // Automatically populate the name field when a patient is selected
        const selectedPatient = dopeIds.find(
            (patient) => patient.patient_id === e.target.value
        );
        if (selectedPatient) {
            setData("name", selectedPatient.name);
        }
    };

    console.log("from sample create", data);

    const handleDateChange = (date, field) => {
        switch (field) {
            case "entry_date":
                setEntryDate(date);
                break;
            case "brta_form_date":
                setBrtaFormDate(date);
                break;
            case "brta_serial_date":
                setBrtaSerialDate(date);
                break;
            case "sample_collection_date":
                setSampleCollectionDate(date);
                break;
            default:
                break;
        }

        setData(field, date ? date.toISOString().split("T")[0] : null);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("sample.store"));
        // Inertia.visit(route("sample.store"));
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
            <div className="py-2">
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <InputLabel htmlFor="patient_id">
                                Patient ID:
                            </InputLabel>
                            <select
                                id="patient_id"
                                onChange={handlePatientChange}
                                value={selectedPatientId}
                            >
                                <option value="">Select a patient</option>
                                {dopeIds.map((dope) => (
                                    <option
                                        key={dope.id}
                                        value={dope.patient_id}
                                    >
                                        {dope.patient_id}
                                        {/* Display both patient_id and id */}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <InputLabel htmlFor="name" value="Name" />
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
                            <InputLabel
                                htmlFor="sample_collection_date"
                                value="Sample Collection Date"
                            />

                            <CustomDatePicker
                                selectedDate={
                                    sampleCollectionDate || new Date()
                                }
                                handleDateChange={(date) =>
                                    handleDateChange(
                                        date,
                                        "sample_collection_date"
                                    )
                                }
                            />

                            <InputError
                                message={errors.sample_collection_date}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="status" value="Status" />
                            <div className="mt-1">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300"
                                        value={1} // Set value to integer 1 for collected
                                        checked={data.status === 1}
                                        onChange={() => setData("status", 1)} // Set status to 1 when selected
                                    />
                                    <span className="ml-2">Collected</span>
                                </label>
                                <label className="inline-flex items-center ml-6">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300"
                                        value={0} // Set value to integer 0 for not collected
                                        checked={data.status === 0}
                                        onChange={() => setData("status", 0)} // Set status to 0 when selected
                                    />
                                    <span className="ml-2">Not Collected</span>
                                </label>
                            </div>
                            <InputError
                                message={errors.status}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="remarks" value="Remarks" />
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
                    <PrimaryButton
                        className="mx-auto block w-full mt-2"
                        disabled={processing}
                    >
                        Register
                    </PrimaryButton>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default CreateForm;
