import React, { useState, useEffect } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import InputError from "@/Components/InputError";
import { Head, useForm } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const EditMolecular = ({ auth, molecularReg, references, tests }) => {
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
        age_type: molecularReg?.age_type || "",
        test_advised: molecularReg?.test_advised || "",
        gender: molecularReg?.gender || "",
        bill_no: molecularReg?.bill_no || "",
        tests: molecularReg?.molecular_tests || [],
        discount: molecularReg?.discount || 0,
        paid: molecularReg?.paid || 0,
        total: molecularReg?.total || 0,
        net_payable: molecularReg?.net_payable || 0,
        due: molecularReg?.due || 0,
        reference_name: molecularReg?.reference_name || "",
        remarks: molecularReg?.remarks || "",
        payment_type: molecularReg?.payment_type || "",
        account_head: molecularReg?.account_head || "Cash in hand",
    });

    useEffect(() => {
        setTestFields(molecularReg?.molecular_tests || []);
        setOverallDiscount(molecularReg?.discount || 0);
        setOverallPaid(molecularReg?.paid || 0);
        setData((prevData) => ({
            ...prevData,
            tests: molecularReg?.molecular_tests || [],
        }));
    }, [molecularReg]);

    const addTestField = () => {
        const updatedFields = [...testFields, { test_id: "", test_fee: 0 }];
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
            updatedFields[index].test_fee = selectedTest?.test_fee || 0;
        }

        setTestFields(updatedFields);
        setData("tests", updatedFields);
    };

    const calculateTotals = () => {
        const totalAmount = testFields.reduce(
            (acc, test) => acc + (Number(test.test_fee) || 0),
            0
        );
        const totalAfterDiscount = totalAmount - overallDiscount;
        const totalDue = totalAfterDiscount - overallPaid;

        return { totalAmount, totalAfterDiscount, totalDue };
    };

    const { totalAmount, totalAfterDiscount, totalDue } = calculateTotals();

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("moleculars.update", { id: molecularReg.id }));
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div>
                            <label className="block text-sm font-medium">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
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
                                onChange={(e) =>
                                    setData("contact_no", e.target.value)
                                }
                                className="w-full border rounded-md px-3 py-2"
                            />
                            <InputError message={errors.contact_no} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">
                                Age.
                            </label>
                            <input
                                type="text"
                                name="contact_no"
                                value={data.age}
                                onChange={(e) => setData("age", e.target.value)}
                                className="w-full border rounded-md px-3 py-2"
                            />
                            <InputError message={errors.age} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Select Age Type
                            </label>
                            <div className="flex items-center space-x-4">
                                <label>
                                    <input
                                        type="radio"
                                        name="age_type"
                                        value="Y"
                                        checked={data.age_type === "Y"}
                                        onChange={(e) =>
                                            setData("age_type", e.target.value)
                                        }
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
                                        onChange={(e) =>
                                            setData("age_type", e.target.value)
                                        }
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
                                onChange={(e) =>
                                    setData("test_advised", e.target.value)
                                }
                                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                            >
                                <option value="">Select Test Advised</option>
                                <option value="HLA B27">HLA B27</option>
                                <option value="HBV DNA">HBV DNA</option>
                                <option value="HCV RNA">HCV RNA</option>
                                <option value="HPV DNA">HPV DNA</option>
                            </select>
                            <InputError message={errors.test_advised} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">
                                Gender
                            </label>
                            <select
                                name="gender"
                                value={data.gender}
                                onChange={(e) =>
                                    setData("gender", e.target.value)
                                }
                                className="w-full border rounded-md px-3 py-2"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                            </select>
                            <InputError message={errors.gender} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">
                                Bill No
                            </label>
                            <input
                                type="text"
                                name="bill_no"
                                value={data.bill_no}
                                onChange={(e) =>
                                    setData("bill_no", e.target.value)
                                }
                                className="w-full border rounded-md px-3 py-2"
                            />
                            <InputError message={errors.bill_no} />
                        </div>
                    </div>

                    {/* Test Details */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">
                            Test Details
                        </h3>
                        <table className="w-full border">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Test Name</th>
                                    <th>Fee</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testFields.map((test, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <select
                                                value={test.test_id || ""}
                                                onChange={(e) =>
                                                    handleTestChange(
                                                        index,
                                                        "test_id",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    Select Test
                                                </option>
                                                {tests.map((t) => (
                                                    <option
                                                        key={t.id}
                                                        value={t.id}
                                                    >
                                                        {t.test_name ||
                                                            "Unnamed Test"}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={test.test_fee || 0}
                                                onChange={(e) =>
                                                    handleTestChange(
                                                        index,
                                                        "test_fee",
                                                        e.target.value
                                                    )
                                                }
                                                className="border px-2 py-1 rounded"
                                            />
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeTestField(index)
                                                }
                                                className="text-red-500 hover:text-red-700"
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-2">
                        <div>
                            <label className="text-sm font-medium text-gray-600">
                                Total Amount
                            </label>
                            <p className="bg-gray-100 px-3 py-2 rounded text-gray-800">
                                {totalAmount} Tk
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">
                                Discount
                            </label>
                            <input
                                type="number"
                                value={overallDiscount}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    setOverallDiscount(value);
                                    setData("discount", value);
                                }}
                                className="border px-3 py-2 rounded focus:ring focus:ring-green-200 w-full"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">
                                Paid
                            </label>
                            <input
                                type="number"
                                value={overallPaid}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    setOverallPaid(value);
                                    setData("paid", value);
                                }}
                                className="border px-3 py-2 rounded focus:ring focus:ring-green-200 w-full"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">
                                Net Payable
                            </label>
                            <p className="bg-gray-100 px-3 py-2 rounded text-gray-800">
                                {totalAfterDiscount} Tk
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">
                                Total Due
                            </label>
                            <p className="bg-gray-100 px-3 py-2 rounded text-gray-800">
                                {totalDue} Tk
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                        <div>
                            <label className="block text-sm font-medium">
                                Reference Name
                            </label>
                            <select
                                name="reference_name"
                                value={data.reference_name}
                                onChange={
                                    (e) =>
                                        setData(
                                            "reference_name",
                                            e.target.value
                                        ) // Set the selected reference id in the form data
                                }
                                className="w-full border rounded-md px-3 py-2"
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
                            <label className="block text-sm font-medium">
                                Remarks
                            </label>
                            <input
                                type="text"
                                name="remarks"
                                value={data.remarks}
                                onChange={(e) =>
                                    setData("remarks", e.target.value)
                                }
                                className="w-full border rounded-md px-3 py-2"
                            />
                            <InputError message={errors.remarks} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">
                                Payment Type
                            </label>
                            <select
                                name="payment_type"
                                value={data.payment_type}
                                onChange={(e) =>
                                    setData("payment_type", e.target.value)
                                }
                                className="w-full border rounded-md px-3 py-2"
                            >
                                <option value="">Select Payment Type</option>
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
                            <InputError message={errors.gender} />
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-500 text-white text-lg px-6 py-2 rounded"
                    >
                        {processing ? "Updating..." : "Update"}
                    </button>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default EditMolecular;
