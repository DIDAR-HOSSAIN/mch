import React, { useState } from "react";
import InputError from "@/Components/InputError";
import { useForm, usePage } from "@inertiajs/react";

const CreateMolecular = ({ references = [] }) => {
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


    // Handle input changes for patient data
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    // Handle overall discount and paid changes
     const handleOverallChange = (field, value) => {
         if (field === "discount") {
             setOverallDiscount(Number(value));
             setData("discount", Number(value));
         } else if (field === "paid") {
             setOverallPaid(Number(value));
             setData("paid", Number(value));
         }
     };

     const calculateTotals = () => {
         let totalAmount = 0;

         testFields.forEach((test) => {
             totalAmount += test.total || 0;
         });

         const totalAfterDiscount = totalAmount - overallDiscount;
         const totalDue = totalAfterDiscount - overallPaid;

         return {
             totalAmount,
             totalAfterDiscount,
             totalDue,
         };
     };

    const { totalAmount, totalAfterDiscount, totalDue } = calculateTotals();

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("moleculars.store"));
        reset();
    };

      const selectedTestIds = testFields.map((test) => test.test_id);

    return (
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-md p-6">
            <h2 className="text-2xl font-bold mb-6">Molecular Registration</h2>
            <form onSubmit={handleSubmit}>
                {/* Patient Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block mb-2 font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter patient name"
                        />
                        {errors.name && (
                            <span className="text-red-500">{errors.name}</span>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">
                            Contact No
                        </label>
                        <input
                            type="text"
                            name="contact_no"
                            value={data.contact_no}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter contact number"
                        />
                        {errors.contact_no && (
                            <span className="text-red-500">
                                {errors.contact_no}
                            </span>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={data.age}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter age"
                        />
                        {errors.age && (
                            <span className="text-red-500">{errors.age}</span>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Gender</label>
                        <select
                            name="gender"
                            value={data.gender}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {errors.gender && (
                            <span className="text-red-500">
                                {errors.gender}
                            </span>
                        )}
                    </div>
                </div>

                {/* Test Details */}
                <h3 className="text-xl font-bold mb-4">Test Details</h3>
                <table className="table-auto w-full mb-6 border">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">S/N</th>
                            <th className="border px-4 py-2">Test Name</th>
                            <th className="border px-4 py-2">Amount</th>
                            <th className="border px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testFields.map((test, index) => {
                            const selectedTest = tests.find(
                                (t) => t.id == test.test_id
                            );
                            return (
                                <tr key={index}>
                                    <td className="border px-4 py-2">
                                        {index + 1}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <select
                                            value={test.test_id}
                                            onChange={(e) =>
                                                handleTestChange(
                                                    index,
                                                    "test_id",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded px-3 py-2"
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
                                    <td className="border px-4 py-2">
                                        ${selectedTest?.test_fee || 0}
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeTestField(index)
                                            }
                                            className="bg-red-500 text-white px-3 py-2 rounded"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <button
                    type="button"
                    onClick={addTestField}
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
                >
                    Add Test
                </button>

                {/* Payment Details */}
                <h3 className="text-lg font-bold mb-4">Payment Details</h3>
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className="block mb-2 font-medium">
                            Discount
                        </label>
                        <input
                            type="number"
                            name="discount"
                            value={data.discount}
                            onChange={(e) =>
                                handleOverallChange("discount", e.target.value)
                            }
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter discount amount"
                        />
                        {errors.discount && (
                            <span className="text-red-500">
                                {errors.discount}
                            </span>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Paid</label>
                        <input
                            type="number"
                            name="paid"
                            value={data.paid}
                            onChange={(e) =>
                                handleOverallChange("paid", e.target.value)
                            }
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter paid amount"
                        />
                        {errors.paid && (
                            <span className="text-red-500">{errors.paid}</span>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">
                            Total Due
                        </label>
                        <input
                            type="number"
                            value={totalDue}
                            readOnly
                            className="w-full border rounded px-3 py-2 bg-gray-100"
                        />
                    </div>

                    {/* Payment Type */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Payment Type
                        </label>
                        <select
                            id="payment_type"
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
                        {errors.payment_type && (
                            <span className="text-red-500">
                                {errors.payment_type}
                            </span>
                        )}
                    </div>
                    {/* Account Head */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Account Head
                        </label>
                        <input
                            id="account_head"
                            name="account_head"
                            value={data.account_head}
                            onChange={(e) =>
                                setData("account_head", e.target.value)
                            }
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter account head"
                        />
                        {errors.account_head && (
                            <span className="text-red-500">
                                {errors.account_head}
                            </span>
                        )}
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Reference
                        </label>

                        <select
                            id="reference_name"
                            onChange={(e) =>
                                setData("reference_name", e.target.value)
                            }
                            value={data.reference_name}
                        >
                            <option value="">Select Reference</option>
                            {references.map((reference) => (
                                <option
                                    key={reference.id}
                                    value={reference.reference_name}
                                >
                                    {reference.reference_name}
                                </option>
                            ))}
                        </select>
                        <InputError
                            message={errors.reference_name}
                            className="mt-2"
                        />
                    </div>
                </div>

                {/* Summary Display */}
                <div className="mb-6">
                    <p>Total Amount: ${totalAmount.toFixed(2)}</p>
                    <p>
                        Total After Discount: ${totalAfterDiscount.toFixed(2)}
                    </p>
                    <p>Total Due: ${totalDue.toFixed(2)}</p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={processing}
                    className="bg-green-500 text-white px-6 py-2 rounded"
                >
                    {processing ? "Processing..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default CreateMolecular;
