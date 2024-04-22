import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head, useForm } from "@inertiajs/react";
import CustomDatePicker from "@/Components/DatePicker";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import "react-datepicker/dist/react-datepicker.css";

const EditForm = ({ auth, sampleEdit }) => {
    // Initialize form data with sampleEdit values
    const initialData = {
        patient_id: sampleEdit.patient_id || "",
        name: sampleEdit.name || "",
        sample_collection_date: sampleEdit.sample_collection_date || "",
        status: sampleEdit.status || "",
        remarks: sampleEdit.remarks || "",
    };

    // useForm hook to handle form data and submission
    const { data, setData, patch, processing, errors } = useForm(initialData);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("sample.update", sampleEdit.id), data);
    };

    // Handle date change
    const handleDateChange = (date, fieldName) => {
        setData(fieldName, date); // Update form data with new date
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    Update Sample
                </h1>
            }
        >
            <Head title="Update Sample" />
            <div className="py-2">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <InputLabel
                                htmlFor="patient_id"
                                value="Patient ID"
                            />
                            <TextInput
                                type="text"
                                className="w-full px-4 py-2"
                                label="patient_id"
                                name="patient_id"
                                value={data.patient_id}
                                onChange={(e) =>
                                    setData("patient_id", e.target.value)
                                }
                                readOnly
                            />
                            <InputError
                                message={errors.patient_id}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="name" value="Name" />
                            <TextInput
                                type="text"
                                className="w-full px-4 py-2"
                                label="Name"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
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
                                selectedDate={data.sample_collection_date}
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
                                        value={1}
                                        checked={data.status == 1}
                                        onChange={() => setData("status", 1)}
                                    />
                                    <span className="ml-2">Collected</span>
                                </label>
                                <label className="inline-flex items-center ml-6">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300"
                                        value={0}
                                        checked={data.status == 0}
                                        onChange={() => setData("status", 0)}
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
                                type="text"
                                className="w-full px-4 py-2"
                                label="remarks"
                                name="remarks"
                                value={data.remarks}
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
                        type="submit"
                        className="mx-auto block w-full mt-2"
                        disabled={processing}
                    >
                        {processing ? "Updating..." : "Update"}
                    </PrimaryButton>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default EditForm;
