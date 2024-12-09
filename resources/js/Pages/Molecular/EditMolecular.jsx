import React, { useState, useEffect } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import InputError from "@/Components/InputError";
import { Head, useForm } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const EditMolecular = ({ auth, molecularReg, tests, references = [] }) => {
    // Ensure molecularReg and tests are available and have the expected structure
    const initialTests = molecularReg?.tests || [{ test_id: "", total: 0 }];
    const initialDiscount = molecularReg?.discount || 0;
    const initialPaid = molecularReg?.paid || 0;

    const [testFields, setTestFields] = useState(initialTests);
    const [overallDiscount, setOverallDiscount] = useState(initialDiscount);
    const [overallPaid, setOverallPaid] = useState(initialPaid);

    const { data, setData, put, processing, errors, reset } = useForm({
        name: molecularReg?.name || "",
        contact_no: molecularReg?.contact_no || "",
        age: molecularReg?.age || "",
        gender: molecularReg?.gender || "",
        tests: testFields,
        discount: overallDiscount,
        paid: overallPaid,
        account_head: molecularReg?.account_head || "Cash in Hand",
        reference_name: molecularReg?.reference_name || "",
    });

    useEffect(() => {
        if (molecularReg) {
            setTestFields(molecularReg.tests || []);
            setOverallDiscount(molecularReg.discount);
            setOverallPaid(molecularReg.paid);
            setData({
                ...data,
                tests: molecularReg.tests || [],
                discount: molecularReg.discount,
                paid: molecularReg.paid,
            });
        }
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
            updatedFields[index].total = selectedTest
                ? selectedTest.test_fee
                : 0;
        }

        setTestFields(updatedFields);
        setData("tests", updatedFields);
    };

    const handleChange = (e) => setData(e.target.name, e.target.value);

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
        let totalAmount = testFields.reduce(
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
        put(route("moleculars.update", molecularReg.id)); // Passing the molecular registration ID for update
        reset();
    };

    const selectedTestIds = testFields.map((test) => test.test_id);

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold">Edit Molecular</h2>}
        >
            <Head title="Edit Molecular" />
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-md p-6">
                <h2 className="text-2xl font-semibold mb-2 text-gray-700">
                    Edit Molecular Registration
                </h2>

                {errors.error && (
                    <div className="bg-red-100 border border-red-500 text-red-700 p-3 rounded mb-4">
                        {errors.error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Patient Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                                placeholder="Enter patient name"
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Contact No.
                            </label>
                            <input
                                type="text"
                                name="contact_no"
                                value={data.contact_no}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                                placeholder="Enter contact number"
                            />
                            <InputError message={errors.contact_no} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Age
                            </label>
                            <input
                                type="text"
                                name="age"
                                value={data.age}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                                placeholder="Enter age"
                            />
                            <InputError message={errors.age} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Gender
                            </label>
                            <select
                                name="gender"
                                value={data.gender}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <InputError message={errors.gender} />
                        </div>
                    </div>

                    {/* Account Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Account Head
                            </label>
                            <select
                                name="account_head"
                                value={data.account_head}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                            >
                                <option value="Cash in Hand">
                                    Cash in Hand
                                </option>
                                <option value="Bank">Bank</option>
                            </select>
                            <InputError message={errors.account_head} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Reference Name
                            </label>
                            <input
                                type="text"
                                name="reference_name"
                                value={data.reference_name}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                                placeholder="Enter reference name"
                            />
                            <InputError message={errors.reference_name} />
                        </div>
                    </div>

                    {/* Test Details */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">
                            Test Details
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full border text-sm text-gray-700">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-800">
                                        <th className="py-2 px-4 text-left">
                                            S/N
                                        </th>
                                        <th className="py-2 px-4 text-left">
                                            Test Name
                                        </th>
                                        <th className="py-2 px-4 text-center">
                                            Amount
                                        </th>
                                        <th className="py-2 px-4 text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {testFields.map((test, index) => (
                                        <tr key={index}>
                                            <td className="py-2 px-4 text-left">
                                                {index + 1}
                                            </td>
                                            <td className="py-2 px-4 text-left">
                                                <select
                                                    value={test.test_id}
                                                    onChange={(e) =>
                                                        handleTestChange(
                                                            index,
                                                            "test_id",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                                                >
                                                    <option value="">
                                                        Select Test
                                                    </option>
                                                    {tests.map((t) => (
                                                        <option
                                                            key={t.id}
                                                            value={t.id}
                                                            disabled={selectedTestIds.includes(
                                                                String(t.id)
                                                            )}
                                                        >
                                                            {t.test_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="py-2 px-4 text-center">
                                                {test.total || 0} Tk
                                            </td>
                                            <td className="py-2 px-4 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeTestField(index)
                                                    }
                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center justify-center"
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {/* Totals Row */}
                                    <tr className="bg-green-600 font-semibold text-lg">
                                        <td
                                            colSpan="2"
                                            className="py-2 px-4 text-right"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:gap-4">
                                                <div className="py-2 px-4">
                                                    <p className="font-medium text-white">
                                                        After Discount:
                                                        <span className="font-semibold text-white ml-2">
                                                            {totalAfterDiscount}{" "}
                                                            Tk
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="py-2 px-4">
                                                    <p className="font-medium text-white">
                                                        Amount Due:
                                                        <span className="font-semibold text-white ml-2">
                                                            {totalDue} Tk
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between mt-4">
                            <button
                                type="button"
                                onClick={addTestField}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
                            >
                                <FaPlus className="mr-2" /> Add Test
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className={`bg-blue-600 text-white px-4 py-2 rounded ${
                                    processing
                                        ? "cursor-not-allowed"
                                        : "hover:bg-blue-700"
                                }`}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default EditMolecular;
