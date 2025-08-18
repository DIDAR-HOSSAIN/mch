import React, { useState } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import InputError from "@/Components/InputError";
import { Head, useForm } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const CreateMolecular = ({ auth, tests = [], references = [] }) => {
    const [testFields, setTestFields] = useState([{ test_id: "", total: 0 }]);
    const [overallDiscount, setOverallDiscount] = useState(0);
    const [overallPaid, setOverallPaid] = useState(0);

    const { data, setData, post, processing, success, errors, reset } = useForm(
        {
            bill_no: "",
            name: "",
            contact_no: "",
            age: "",
            age_type: "",
            test_advised: "",
            gender: "",
            tests: testFields,
            discount: 0,
            paid: 0,
            account_head: "Cash in hand",
            payment_type: "",
            reference_name: "",
            remarks: "",
        }
    );

    const addTestField = () => {
        const updatedFields = [...testFields, { test_id: "", total: 0 }];
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

        setTestFields(updatedFields); // Update local state
        setData("tests", updatedFields); // Update form data directly
    };

    const removeTestField = (index) => {
        const updatedFields = testFields.filter((_, i) => i !== index);
        setTestFields(updatedFields); // Update local state
        setData("tests", updatedFields); // Update form data directly
    };

    // const handleChange = (e) => setData(e.target.name, e.target.value.toUpperCase());

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        // Apply toUpperCase only for text inputs, not for selects
        setData(name, type === "text" ? value.toUpperCase() : value);
    };


    const handleOverallChange = (field, value) => {
        const numValue = parseInt(value, 10) || 0;
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
            (acc, test) => acc + (parseInt(test.total, 10) || 0),
            0
        );
        const totalAfterDiscount = totalAmount - parseInt(overallDiscount, 10);
        const totalDue = totalAfterDiscount - parseInt(overallPaid, 10);

        return { totalAmount, totalAfterDiscount, totalDue };
    };

    const { totalAmount, totalAfterDiscount, totalDue } = calculateTotals();

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("moleculars.store"), {
            onSuccess: () => reset(),
        });
    };

    const selectedTestIds = testFields.map((test) => test.test_id);

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold">
                    Molecular Registration
                </h2>
            }
        >
            <Head title="Molecular Registration" />
            <div className="mt-4 max-w-5xl mx-auto justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
                <h2 className="text-2xl font-semibold mb-2 text-gray-700">
                    Molecular Registration
                </h2>

                {success && <div className="alert-success">{success}</div>}
                {errors && (
                    <div className="alert-error">
                        {Object.values(errors).map((error, index) => (
                            <div key={index} className="text-red-500 text-sm">
                                {error}
                            </div>
                        ))}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Patient Details */}
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
                        {/* Name Field - Large */}
                        <div className="md:col-span-3">
                            <label className="block text-sm font-medium text-gray-600">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={data.name.toUpperCase()}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                                placeholder="Enter patient name"
                            />
                            <InputError message={errors.name} />
                        </div>

                        {/* Contact Field - Medium */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-600">
                                Contact No
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

                        {/* Age Field - Small */}
                        <div className="md:col-span-1">
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Select Age Type
                            </label>
                            <div className="flex items-center space-x-4 ">
                                <label>
                                    <input
                                        type="radio"
                                        name="age_type"
                                        value="Y"
                                        checked={data.age_type === "Y"}
                                        onChange={handleChange}
                                        className="focus:ring-green-500"
                                    />
                                    Year (Y)
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="age_type"
                                        value="M"
                                        checked={data.age_type === "M"}
                                        onChange={handleChange}
                                        className="focus:ring-green-500"
                                    />
                                    Month (M)
                                </label>
                            </div>
                            <InputError message={errors.age_type} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Test Advised
                            </label>
                            <select
                                name="test_advised"
                                value={data.test_advised}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                            >
                                <option value="">Select Test Advised</option>
                                <option value="HLA B27">HLA B27</option>
                                <option value="HBV DNA">HBV DNA</option>
                                <option value="HCV RNA">HCV RNA</option>
                                <option value="HPV DNA">HPV DNA</option>
                                <option value="RT-PCR for Dengue and Chikungunya Virus Detection">RT-PCR for Dengue and Chikungunya Virus Detection</option>
                            </select>
                            <InputError message={errors.test_advised} />
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

                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Bill No
                            </label>
                            <input
                                type="text"
                                name="bill_no"
                                value={data.bill_no}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                                placeholder="Enter Bill No"
                            />
                            <InputError message={errors.bill_no} />
                        </div>
                    </div>

                    {/* Test Details */}
                    <div className="">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">
                            Test Details
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full border text-sm text-gray-700">
                                <thead>
                                    <tr className="bg-green-500 text-gray-800">
                                        <th className="py-2 px-4 text-left text-lg">
                                            S/N
                                        </th>
                                        <th className="py-2 px-4 text-left text-lg">
                                            Test Name
                                        </th>
                                        <th className="py-2 px-4 text-center text-lg">
                                            Amount
                                        </th>
                                        <th className="py-2 px-4 text-center text-lg">
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
                                    <tr className="bg-green-500 font-semibold text-lg">
                                        <td
                                            colSpan="2"
                                            className="py-2 px-4 text-right"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:gap-4">
                                                <div className="py-2 px-4">
                                                    <p className="font-medium text-black">
                                                        After Discount:
                                                        <span className="font-semibold text-black ml-2">
                                                            {totalAfterDiscount}
                                                            Tk
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="py-2 px-4">
                                                    <p className="font-medium text-black">
                                                        Due:
                                                        <span className="text-black font-semibold ml-2">
                                                            {totalDue} Tk
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 text-center text-black flex gap-1 flex-col sm:flex-row sm:items-center sm:justify-center">
                                            <p className="font-medium">
                                                Total:
                                            </p>
                                            <p className="text-black font-semibold">
                                                {totalAmount} Tk
                                            </p>
                                        </td>
                                        <td className="py-2 px-4">
                                            <button
                                                type="button"
                                                onClick={addTestField}
                                                className="bg-blue-500 text-black px-3 py-1 rounded hover:bg-blue-600 flex items-center justify-center"
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
                    <div className="p-2 rounded-lg shadow">
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

                            <div className="">
                                <label className="block text-sm font-medium text-gray-600">
                                    Remarks
                                </label>
                                <input
                                    type="text"
                                    name="remarks"
                                    value={data.remarks.toUpperCase()}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                                    placeholder="Enter Remarks"
                                />
                                <InputError message={errors.remarks} />
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
                                    required
                                >
                                    <option value="" disabled>
                                        Select payment type
                                    </option>
                                    <option value="Cash">Cash</option>
                                    <option value="Cheque">Cheque</option>
                                    <option value="Card">Card</option>
                                    <option value="Bkash">Bkash</option>
                                    <option value="Rocket">Rocket</option>
                                    <option value="Nagod">Nagod</option>
                                    <option value="Internet Banking">
                                        Internet Banking
                                    </option>
                                    <option value="Mobile Banking">
                                        Mobile Banking
                                    </option>
                                    <option value="Others">Others</option>
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
