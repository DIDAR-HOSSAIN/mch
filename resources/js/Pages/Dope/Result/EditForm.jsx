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
        status: result.status || "",
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
                                htmlFor="result_date"
                                value="Result Date"
                            />
                            <CustomDatePicker
                                selectedDate={data.result_date}
                                handleDateChange={(date) =>
                                    handleDateChange(date, "result_date")
                                }
                            />
                            <InputError
                                message={errors.result_date}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="alcohol" value="Alcohol" />
                            <div className="mt-1">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300"
                                        value={1}
                                        checked={data.alcohol == 1}
                                        onChange={() => setData("alcohol", 1)}
                                    />
                                    <span className="ml-2">Negative</span>
                                </label>
                                <label className="inline-flex items-center ml-6">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300"
                                        value={0}
                                        checked={data.alcohol == 0}
                                        onChange={() => setData("alcohol", 0)}
                                    />
                                    <span className="ml-2">Positive</span>
                                </label>
                            </div>
                            <InputError
                                message={errors.alcohol}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="benzodiazepines"
                                value="Benzodiazepines"
                            />
                            <div className="mt-1">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300"
                                        value={1}
                                        checked={data.benzodiazepines == 1}
                                        onChange={() =>
                                            setData("benzodiazepines", 1)
                                        }
                                    />
                                    <span className="ml-2">Negative</span>
                                </label>
                                <label className="inline-flex items-center ml-6">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300"
                                        value={0}
                                        checked={data.benzodiazepines == 0}
                                        onChange={() =>
                                            setData("benzodiazepines", 0)
                                        }
                                    />
                                    <span className="ml-2">Positive</span>
                                </label>
                            </div>
                            <InputError
                                message={errors.benzodiazepines}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="cannabinoids"
                                value="Cannabinoids"
                            />
                            <div className="mt-1">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300"
                                        value={1}
                                        checked={data.cannabinoids == 1}
                                        onChange={() =>
                                            setData("cannabinoids", 1)
                                        }
                                    />
                                    <span className="ml-2">Negative</span>
                                </label>
                                <label className="inline-flex items-center ml-6">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300"
                                        value={0}
                                        checked={data.cannabinoids == 0}
                                        onChange={() =>
                                            setData("cannabinoids", 0)
                                        }
                                    />
                                    <span className="ml-2">Positive</span>
                                </label>
                            </div>
                            <InputError
                                message={errors.cannabinoids}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="amphetamine"
                                value="Amphetamine"
                            />
                            <div className="mt-1">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300"
                                        value={1}
                                        checked={data.amphetamine == 1}
                                        onChange={() =>
                                            setData("amphetamine", 1)
                                        }
                                    />
                                    <span className="ml-2">Negative</span>
                                </label>
                                <label className="inline-flex items-center ml-6">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300"
                                        value={0}
                                        checked={data.amphetamine == 0}
                                        onChange={() =>
                                            setData("amphetamine", 0)
                                        }
                                    />
                                    <span className="ml-2">Positive</span>
                                </label>
                            </div>
                            <InputError
                                message={errors.amphetamine}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="opiates" value="Opiates" />
                            <div className="mt-1">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300"
                                        value={1}
                                        checked={data.opiates == 1}
                                        onChange={() => setData("opiates", 1)}
                                    />
                                    <span className="ml-2">Negative</span>
                                </label>
                                <label className="inline-flex items-center ml-6">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300"
                                        value={0}
                                        checked={data.opiates == 0}
                                        onChange={() => setData("opiates", 0)}
                                    />
                                    <span className="ml-2">Positive</span>
                                </label>
                            </div>
                            <InputError
                                message={errors.opiates}
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
                                    <span className="ml-2">Approve</span>
                                </label>
                                <label className="inline-flex items-center ml-6">
                                    <input
                                        type="radio"
                                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300"
                                        value={0}
                                        checked={data.status == 0}
                                        onChange={() => setData("status", 0)}
                                    />
                                    <span className="ml-2">Pending</span>
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
