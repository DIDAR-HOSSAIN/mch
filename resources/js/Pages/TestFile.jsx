import React, { useState, useEffect } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import InputError from "@/Components/InputError";
import { Head, useForm } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const EditMolecular = ({ auth, molecularReg, references = [], tests }) => {
    const [testFields, setTestFields] = useState(
        molecularReg?.molecular_tests || [{ test_id: "", test_name: "", test_fee: 0 }]
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
        tests: molecularReg?.molecular_tests || [],
        discount: molecularReg?.discount || 0,
        paid: molecularReg?.paid || 0,
    });

    useEffect(() => {
        setTestFields(molecularReg?.molecular_tests || []);
    }, [molecularReg]);

    const addTestField = () => {
        const newTest = { test_id: "", test_name: "", total: 0 };
        setTestFields((prev) => [...prev, newTest]);
        setData("tests", [...testFields, newTest]);
    };

    const removeTestField = (index) => {
        const updatedFields = testFields.filter((_, i) => i !== index);
        setTestFields(updatedFields);
        setData("tests", updatedFields);
    };

    const handleTestChange = (index, field, value) => {
        const updatedFields = [...testFields];
        if (field === "test_id") {
            const selectedTest = tests.find((t) => t.id == value);
            updatedFields[index].test_id = value;
            updatedFields[index].test_name = selectedTest?.test_name || "";
            updatedFields[index].total = selectedTest?.test_fee || 0;
        } else if (field === "total") {
            updatedFields[index].total = Number(value) || 0;
        }

        setTestFields(updatedFields);
        setData("tests", updatedFields);
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
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Patient Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="w-full border rounded-md px-3 py-2"
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">
                                Contact No.
                            </label>
                            <input
                                type="text"
                                name="contact_no"
                                value={data.contact_no}
                                onChange={(e) => setData("contact_no", e.target.value)}
                                className="w-full border rounded-md px-3 py-2"
                            />
                            <InputError message={errors.contact_no} />
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
                                                <span>{test.test_name}</span>
                                            ) : (
                                                <select
                                                    value={test.test_id}
                                                    onChange={(e) =>
                                                        handleTestChange(index, "test_id", e.target.value)
                                                    }
                                                    className="w-full border rounded-md"
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
                                        <td>
                                            <input
                                                type="number"
                                                value={test.test_fee}
                                                onChange={(e) =>
                                                    handleTestChange(index, "total", e.target.value)
                                                }
                                                className="w-full border rounded-md px-2 py-1"
                                            />
                                        </td>
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div>
                            <label>Total Amount</label>
                            <p className="bg-gray-100 px-3 py-2 rounded">{totalAmount} Tk</p>
                        </div>
                        <div>
                            <label>Discount</label>
                            <input
                                type="number"
                                value={overallDiscount}
                                onChange={(e) =>
                                    setOverallDiscount(Number(e.target.value) || 0)
                                }
                                className="w-full border rounded-md px-3 py-2"
                            />
                        </div>
                        <div>
                            <label>Paid</label>
                            <input
                                type="number"
                                value={overallPaid}
                                onChange={(e) => setOverallPaid(Number(e.target.value) || 0)}
                                className="w-full border rounded-md px-3 py-2"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-500 text-white px-6 py-2 rounded"
                        >
                            {processing ? "Updating..." : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default EditMolecular;
