import React, { useState, useEffect } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import InputError from "@/Components/InputError";
import { Head, useForm } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const EditMolecular = ({ auth, molecularReg, references = [], tests }) => {
    console.log("from edit molecular", molecularReg);
    console.log("from edit molecular2", molecularReg.molecular_tests);

    const [testFields, setTestFields] = useState(
        molecularReg?.molecular_tests || [{ test_id: "", test_fee: 0 }]
    );
    const [overallDiscount, setOverallDiscount] = useState(
        molecularReg?.discount || 0
    );
    const [overallPaid, setOverallPaid] = useState(molecularReg?.paid || 0);

    const { data, setData, put, processing, errors } = useForm({
        name: molecularReg?.name || "",
        contact_no: molecularReg?.contact_no || "",
        age: molecularReg?.age || "",
        gender: molecularReg?.gender || "",
        tests: molecularReg?.molecular_tests || [{ test_id: "", total: 0 }],
        discount: molecularReg?.discount || 0,
        paid: molecularReg?.paid || 0,
        due: molecularReg?.due || 0,
        total: molecularReg?.total || 0,
        net_payable: molecularReg?.net_payable || 0,
        account_head: molecularReg?.account_head || "Cash in Hand",
        reference_name: molecularReg?.reference_name || "",
    });


    useEffect(() => {
        setTestFields(molecularReg?.molecular_tests || []);
        setOverallDiscount(molecularReg?.discount || 0);
        setOverallPaid(molecularReg?.paid || 0);
        setData((prevData) => ({
            ...prevData,
            tests: molecularReg?.molecular_tests || [],
            discount: molecularReg?.discount || 0,
            paid: molecularReg?.paid || 0,
        }));
    }, [molecularReg]);

    const addTestField = () => {
        const updatedFields = [...testFields, { test_id: "", total: 0 }];
        setTestFields(updatedFields);
        setData("tests", updatedFields);
    };

    const removeTestField = (index) => {
        const updatedFields = testFields.filter((_, i) => i !== index);
        setTestFields(updatedFields);
        setData("tests", updatedFields);
    };

    const handleTestChange = (index, field, value) => {
        const updatedFields = [...testFields];
        updatedFields[index][field] = value;

        if (field === "test_id") {
            const selectedTest = tests.find((t) => t.id == value);
            updatedFields[index].total = selectedTest?.test_fee || 0;
        }

        setTestFields(updatedFields);
        setData("tests", updatedFields);
    };

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleOverallChange = (field, value) => {
        const numValue = Number(value);
        if (field === "discount") {
            setOverallDiscount(numValue);
            setData("discount", numValue);
        } else if (field === "paid") {
            setOverallPaid(numValue);
            setData("paid", numValue);
        }
    };

    const calculateTotals = () => {
        const totalAmount = testFields.reduce(
            (acc, test) => acc + (test.total || 0),
            0
        );
        const totalAfterDiscount = totalAmount - overallDiscount;
        const totalDue = totalAfterDiscount - overallPaid;

        return { totalAmount, totalAfterDiscount, totalDue };
    };

    const { totalAmount, totalAfterDiscount, totalDue } = calculateTotals();

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("moleculars.update", { id: molecularReg.id }), {
            onSuccess: () => {
                alert("Molecular data updated successfully!");
            },
        });
    };


    return (
        <AdminDashboardLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold">Edit Molecular</h2>}
        >
            <Head title="Edit Molecular" />
            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-md p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                    Edit Molecular Registration
                </h2>

                {errors.error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {errors.error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Patient Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2"
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Contact No.
                            </label>
                            <input
                                type="text"
                                name="contact_no"
                                value={data.contact_no}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2"
                            />
                            <InputError message={errors.contact_no} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Age.
                            </label>
                            <input
                                type="text"
                                name="age"
                                value={data.age}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2"
                            />
                            <InputError message={errors.age} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Gender.
                            </label>
                            <input
                                type="text"
                                name="gender"
                                value={data.gender}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2"
                            />
                            <InputError message={errors.gender} />
                        </div>
                    </div>

                    {/* Test Details */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold mb-4">Test Details</h3>
                        <table className="w-full border">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Test Name</th>
                                    <th>Amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testFields.map((test, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {test.test_id ? (
                                                // Display existing test names as plain text
                                                <span>{test.test_name}</span>
                                            ) : (
                                                // Show dropdown only for new test entries
                                                <select
                                                    value={test.test_id}
                                                    onChange={(e) =>
                                                        handleTestChange(index, "test_id", e.target.value)
                                                    }
                                                >
                                                    <option value="">Select Test</option>
                                                    {tests.map((t) => (
                                                        <option key={t.id} value={t.id}>
                                                            {t.test_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                        </td>
                                        <td>{test.test_fee || 0} Tk</td>
                                        <td>
                                            <button
                                                type="button"
                                                onClick={() => removeTestField(index)}
                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        <button
                            type="button"
                            onClick={addTestField}
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
                        >
                            <FaPlus /> Add Test
                        </button>
                    </div>

                    {/* Totals */}
                    {/* Totals and Editable Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Total Amount
                            </label>
                            <p className="bg-gray-100 px-3 py-2 rounded">{data.total} Tk</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Discount
                            </label>
                            <input
                                type="number"
                                value={overallDiscount}
                                onChange={(e) => handleOverallChange("discount", e.target.value)}
                                className="w-full border rounded-md px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Paid
                            </label>
                            <input
                                type="number"
                                value={overallPaid}
                                onChange={(e) => handleOverallChange("paid", e.target.value)}
                                className="w-full border rounded-md px-3 py-2"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                After Discount
                            </label>
                            <p className="bg-gray-100 px-3 py-2 rounded">
                                {data.net_payable} Tk
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Total Due
                            </label>
                            <p className="bg-gray-100 px-3 py-2 rounded">{data.due} Tk</p>
                        </div>
                    </div>


                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-500 text-white px-6 py-2 rounded"
                    >
                        {processing ? "Updating..." : "Update"}
                    </button>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default EditMolecular;
