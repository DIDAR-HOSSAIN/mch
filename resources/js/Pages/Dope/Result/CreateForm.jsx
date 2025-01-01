import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import NormalDatePicker from "@/Components/NormalDatePicker";
import TextInput from "@/Components/TextInput";
import axiosApi from "@/axios/axios";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";


const CreateForm = ({ auth }) => {
    const [resultDate, setResultDate] = useState(new Date());

    const { data, setData, patch, processing, errors, reset } = useForm({
        id: "",
        sample_id: "",
        patient_id: "",
        name: "",
        result_date: "",
        alcohol: "",
        benzodiazepines: "",
        cannabinoids: "",
        amphetamine: "",
        opiates: "",
        cocaine: "",
        methamphetamine: "",
        remarks: "",
    });

    const handleDateChange = (date, field) => {
        setData(field, date ? date.toISOString().split("T")[0] : "");
    };

    useEffect(() => {
        if (data.patient_id) {
            const fetchResultByPatientId = async () => {
                try {
                    const response = await axiosApi.get(
                        route("result.fetch", data.patient_id)
                    );
                    const result = response.data.result;

                    setData({
                        id: result.id,
                        sample_id: result.sample_id,
                        patient_id: result.patient_id,
                        name: result.name,
                        result_date: result.result_date,
                        alcohol: result.alcohol,
                        benzodiazepines: result.benzodiazepines,
                        cannabinoids: result.cannabinoids,
                        amphetamine: result.amphetamine,
                        opiates: result.opiates,
                        cocaine: result.cocaine,
                        methamphetamine: result.methamphetamine,
                        remarks: result.remarks,
                    });

                    setResultDate(new Date(result.result_date));
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        alert("No results found for this Patient ID");
                    } else {
                        console.error(error);
                        alert("Failed to fetch result");
                    }
                }
            };

            fetchResultByPatientId();
        }
    }, [data.patient_id]);

    const updateResult = async (e) => {
        e.preventDefault();
        try {
            await axiosApi.patch(
                route("result.updateData", { result: data.id }),
                data
            );
            alert("Result updated successfully");
        } catch (error) {
            console.error("Update error:", error);
            alert("Failed to update result");
        }
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    Result Entry (Manual)
                </h1>
            }
        >
            <Head title="Result Entry (Manual)" />
            <div className="py-4">
                <form className="space-y-8" onSubmit={updateResult}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        <div>
                            <InputLabel
                                htmlFor="patient_id"
                                value="Patient ID"
                                className="text-xl text-indigo-600"
                            />
                            <TextInput
                                id="patient_id"
                                name="patient_id"
                                value={data.patient_id || ""}
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
                            <InputLabel
                                htmlFor="sample_id"
                                value="Sample ID"
                                className="text-xl text-indigo-600"
                            />
                            <TextInput
                                id="sample_id"
                                name="sample_id"
                                value={data.sample_id || ""}
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
                                htmlFor="name"
                                value="Name"
                                className="text-xl text-indigo-600"
                            />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name || ""}
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
                                className="text-xl text-indigo-600"
                            />
                            <NormalDatePicker
                                selectedDate={resultDate}
                                handleDateChange={(date) =>
                                    handleDateChange(date, "result_date")
                                }
                            />
                            <InputError
                                message={errors.result_date}
                                className="mt-2"
                            />
                        </div>

                        {[
                            "alcohol",
                            "benzodiazepines",
                            "cannabinoids",
                            "amphetamine",
                            "opiates",
                            "cocaine",
                            "methamphetamine",
                        ].map((drug) => (
                            <div key={drug}>
                                <InputLabel
                                    htmlFor={drug}
                                    className="text-xl text-indigo-600"
                                    value={
                                        drug.charAt(0).toUpperCase() +
                                        drug.slice(1)
                                    }
                                />
                                <div className="mt-1 flex items-center space-x-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            className="form-radio h-5 w-5 text-indigo-600"
                                            value="Negative"
                                            checked={data[drug] === "Negative"}
                                            onChange={() =>
                                                setData(drug, "Negative")
                                            }
                                        />
                                        <span className="ml-2">Negative</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            className="form-radio h-5 w-5 text-indigo-600"
                                            value="Positive"
                                            checked={data[drug] === "Positive"}
                                            onChange={() =>
                                                setData(drug, "Positive")
                                            }
                                        />
                                        <span className="ml-2">Positive</span>
                                    </label>
                                </div>
                                <InputError
                                    message={errors[drug]}
                                    className="mt-2"
                                />
                            </div>
                        ))}

                        <div>
                            <InputLabel htmlFor="remarks" value="Remarks" />
                            <TextInput
                                id="remarks"
                                name="remarks"
                                value={data.remarks || ""}
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

                        <div>
                            <button
                                type="submit"
                                className="mt-2 bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
                                disabled={processing}
                            >
                                Update Result
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default CreateForm;
