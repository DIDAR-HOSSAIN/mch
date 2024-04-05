import CustomDatePicker from "@/Components/DatePicker";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Inertia } from "@inertiajs/inertia";

const CreateForm = ({ auth }) => {
    const [resultDate, setResultDate] = useState(new Date());

    const { data, setData, post, processing, errors, reset } = useForm({
        sample_id: "",
        patient_id: "",
        name: "",
        status: "",
        remarks: "",
        // other form fields...
    });

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
            case "result_date":
                setResultDate(date);
                break;
            default:
                break;
        }

        setData(field, date ? date.toISOString().split("T")[0] : null);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("result.store"));
        Inertia.visit(route("result.index"));
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    Result Entry
                </h1>
            }
        >
            <Head title="Result Entry" />
            <div className="py-2">
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <InputLabel htmlFor="sample_id" value="Sample ID" />
                            <TextInput
                                id="sample_id"
                                name="sample_id"
                                value={data.sample_id}
                                className="mt-1 block w-full"
                                autoComplete="sample_id"
                                onChange={(e) =>
                                    setData("sample_id", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.sample_id}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="patient_id"
                                value="Patient ID"
                            />
                            <TextInput
                                id="patient_id"
                                name="patient_id"
                                value={data.patient_id}
                                className="mt-1 block w-full"
                                autoComplete="patient_id"
                                onChange={(e) =>
                                    setData("patient_id", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.patient_id}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="name" value="Name" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
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
                                htmlFor="result_date"
                                value="Result Date"
                            />

                            <CustomDatePicker
                                selectedDate={resultDate || new Date()}
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
                            <InputLabel htmlFor="status" value="Status" />
                            <TextInput
                                id="status"
                                name="status"
                                value={data.status}
                                className="mt-1 block w-full"
                                autoComplete="status"
                                onChange={(e) =>
                                    setData("status", e.target.value)
                                }
                                required
                            />
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
                                required
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
