import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head, useForm } from "@inertiajs/react";
import CustomDatePicker from "@/Components/DatePicker";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import "react-datepicker/dist/react-datepicker.css";

const EditForm = ({ auth, result }) => {
    // Initialize form data with sampleEdit values
    const initialData = {
        patient_id: result.patient_id || "",
        name: result.name || "",
        result_date: result.result_date || "",
        alcohol: result.alcohol || "",
        benzodiazepines: result.benzodiazepines || "",
        cannabinoids: result.cannabinoids || "",
        amphetamine: result.amphetamine || "",
        opiates: result.opiates || "",
        result_status: result.result_status || "",
        remarks: result.remarks || "",
    };

    // useForm hook to handle form data and submission
    const { data, setData, patch, processing, errors } = useForm(initialData);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("result.update", result.id), data);
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
                    Update Result
                </h1>
            }
        >
            <Head title="Update Result" />
            <div className="py-2 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                            <InputLabel htmlFor="patient_id" value="Patient ID" />
                            <TextInput
                                type="text"
                                className="mt-1 block w-full"
                                label="patient_id"
                                name="patient_id"
                                value={data.patient_id}
                                onChange={(e) => setData("patient_id", e.target.value)}
                                readOnly
                            />
                            <InputError message={errors.patient_id} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="name" value="Name" />
                            <TextInput
                                type="text"
                                className="mt-1 block w-full"
                                label="name"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="result_date" value="Result Date" />
                            <CustomDatePicker
                                selectedDate={data.result_date}
                                handleDateChange={(date) => handleDateChange(date, "result_date")}
                            />
                            <InputError message={errors.result_date} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="alcohol" value="Alcohol" />
                            <div className="mt-1">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300"
                                        value="Negative"
                                        checked={data.alcohol === "Negative"}
                                        onChange={() => setData("alcohol", "Negative")}
                                    />
                                    <span className="ml-2">Negative</span>
                                </label>
                                <label className="inline-flex items-center ml-6">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300"
                                        value="Positive"
                                        checked={data.alcohol === "Positive"}
                                        onChange={() => setData("alcohol", "Positive")}
                                    />
                                    <span className="ml-2">Positive</span>
                                </label>
                            </div>
                            <InputError message={errors.alcohol} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="benzodiazepines" value="Benzodiazepines" />
                            <div className="mt-1">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300"
                                        value="Negative"
                                        checked={data.benzodiazepines === "Negative"}
                                        onChange={() => setData("benzodiazepines", "Negative")}
                                    />
                                    <span className="ml-2">Negative</span>
                                </label>
                                <label className="inline-flex items-center ml-6">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300"
                                        value="Positive"
                                        checked={data.benzodiazepines === "Positive"}
                                        onChange={() => setData("benzodiazepines", "Positive")}
                                    />
                                    <span className="ml-2">Positive</span>
                                </label>
                            </div>
                            <InputError message={errors.benzodiazepines} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="cannabinoids" value="Cannabinoids" />
                            <div className="mt-1">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300"
                                        value="Negative"
                                        checked={data.cannabinoids === "Negative"}
                                        onChange={() => setData("cannabinoids", "Negative")}
                                    />
                                    <span className="ml-2">Negative</span>
                                </label>
                                <label className="inline-flex items-center ml-6">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300"
                                        value="Positive"
                                        checked={data.cannabinoids === "Positive"}
                                        onChange={() => setData("cannabinoids", "Positive")}
                                    />
                                    <span className="ml-2">Positive</span>
                                </label>
                            </div>
                            <InputError message={errors.cannabinoids} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="amphetamine" value="Amphetamine" />
                            <div className="mt-1">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300"
                                        value="Negative"
                                        checked={data.amphetamine === "Negative"}
                                        onChange={() => setData("amphetamine", "Negative")}
                                    />
                                    <span className="ml-2">Negative</span>
                                </label>
                                <label className="inline-flex items-center ml-6">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300"
                                        value="Positive"
                                        checked={data.amphetamine === "Positive"}
                                        onChange={() => setData("amphetamine", "Positive")}
                                    />
                                    <span className="ml-2">Positive</span>
                                </label>
                            </div>
                            <InputError message={errors.amphetamine} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="opiates" value="Opiates" />
                            <div className="mt-1">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300"
                                        value="Negative"
                                        checked={data.opiates === "Negative"}
                                        onChange={() => setData("opiates", "Negative")}
                                    />
                                    <span className="ml-2">Negative</span>
                                </label>
                                <label className="inline-flex items-center ml-6">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300"
                                        value="Positive"
                                        checked={data.opiates === "Positive"}
                                        onChange={() => setData("opiates", "Positive")}
                                    />
                                    <span className="ml-2">Positive</span>
                                </label>
                            </div>
                            <InputError message={errors.opiates} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="result_status" value="Result Status" />
                            <div className="mt-1">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300"
                                        value="Approve"
                                        checked={data.result_status === "Approve"}
                                        onChange={() => setData("result_status", "Approve")}
                                    />
                                    <span className="ml-2">Approve</span>
                                </label>
                                <label className="inline-flex items-center ml-6">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300"
                                        value="Pending"
                                        checked={data.result_status === "Pending"}
                                        onChange={() => setData("result_status", "Pending")}
                                    />
                                    <span className="ml-2">Pending</span>
                                </label>
                            </div>
                            <InputError message={errors.result_status} className="mt-2" />
                        </div>

                        <div className="sm:col-span-2 lg:col-span-4">
                            <InputLabel htmlFor="remarks" value="Remarks" />
                            <TextInput
                                type="text"
                                className="mt-1 block w-full"
                                label="remarks"
                                name="remarks"
                                value={data.remarks}
                                onChange={(e) => setData("remarks", e.target.value)}
                            />
                            <InputError message={errors.remarks} className="mt-2" />
                        </div>
                    </div>
                    <PrimaryButton type="submit" className="mx-auto block w-full mt-4" disabled={processing}>
                        {processing ? "Updating..." : "Update"}
                    </PrimaryButton>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default EditForm;
