import React, { useState } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import InputError from "@/Components/InputError";
import { Head, useForm, usePage } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const CreateMolecular = ({ auth, references = [] }) => {
    const { tests = [] } = usePage().props;

    const [testFields, setTestFields] = useState([{ test_id: "", total: 0 }]);
    const [overallDiscount, setOverallDiscount] = useState(0);
    const [overallPaid, setOverallPaid] = useState(0);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        contact_no: "",
        age: "",
        gender: "",
        tests: testFields,
        discount: 0,
        paid: 0,
        account_head: "Cash in Hand",
        reference_name: "",
    });

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
        post(route("moleculars.store"));
        reset();
    };

    const selectedTestIds = testFields.map((test) => test.test_id);

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold">Manage Molecular</h2>}
        >
            <Head title="Manage Molecular" />
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-md p-6">
                <h2 className="text-2xl font-semibold mb-2 text-gray-700">
                    Molecular Registration
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
                                Contact No
                            </label>
                            <input
                                type="text"
                                name="contact_no"
                                value={data.contact_no}
                                onChange={handleChange}
                                className="w-full border-red-40 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                                placeholder="Enter contact number"
                            />
                            <InputError message={errors.contact_no} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Age
                            </label>
                            <input
                                type="number"
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
                            </select>
                            <InputError message={errors.gender} />
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
                                                        Due:
                                                        <span className="text-white font-semibold ml-2">
                                                            {totalDue} Tk
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 text-center text-white flex gap-1 flex-col sm:flex-row sm:items-center sm:justify-center">
                                            <p className="font-medium">
                                                Total:
                                            </p>
                                            <p className="text-white font-semibold">
                                                {totalAmount} Tk
                                            </p>
                                        </td>
                                        <td className="py-2 px-4">
                                            <button
                                                type="button"
                                                onClick={addTestField}
                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center justify-center"
                                            >
                                                <FaPlus />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div className="bg-gray-50 p-2 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2 text-gray-800">
                            Payment Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    Discount
                                </label>
                                <input
                                    type="number"
                                    name="discount"
                                    value={overallDiscount}
                                    onChange={(e) =>
                                        handleOverallChange(
                                            "discount",
                                            e.target.value
                                        )
                                    }
                                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    Paid
                                </label>
                                <input
                                    type="number"
                                    name="paid"
                                    value={overallPaid}
                                    onChange={(e) =>
                                        handleOverallChange(
                                            "paid",
                                            e.target.value
                                        )
                                    }
                                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    Reference
                                </label>
                                <select
                                    name="reference_name"
                                    value={data.reference_name}
                                    onChange={(e) =>
                                        setData(
                                            "reference_name",
                                            e.target.value
                                        )
                                    }
                                    className="w-full border rounded px-3 py-2"
                                >
                                    <option value="">Select Reference</option>
                                    {references.map((ref) => (
                                        <option
                                            key={ref.id}
                                            value={ref.reference_name}
                                        >
                                            {ref.reference_name}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.reference_name} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    Payment Type
                                </label>
                                <select
                                    name="payment_type"
                                    value={data.payment_type}
                                    onChange={(e) =>
                                        setData("payment_type", e.target.value)
                                    }
                                    className="w-full border rounded px-3 py-2"
                                >
                                    <option value="Cash">Cash</option>
                                    <option value="Other">Other</option>
                                </select>
                                <InputError message={errors.payment_type} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    Account Head
                                </label>
                                <input
                                    name="account_head"
                                    value={data.account_head}
                                    onChange={(e) =>
                                        setData("account_head", e.target.value)
                                    }
                                    className="w-full border rounded px-3 py-2"
                                    placeholder="Enter account head"
                                />
                                <InputError message={errors.account_head} />
                            </div>
                        </div>
                    </div>

                    <div className="text-right">
                        <button
                            type="submit"
                            className={`px-6 py-2 text-white rounded w-full ${
                                processing
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-green-500 hover:bg-green-600"
                            }`}
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

export default CreateMolecular;
