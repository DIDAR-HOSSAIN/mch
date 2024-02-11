import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";

const ViewList = ({ auth, datas }) => {
    // const { contacts } = usePage().props;
    console.log("from gpcr list", datas);

    function destroy(e) {
        if (confirm("Are you sure you want to delete this user?")) {
            Inertia.delete(route("contacts.destroy", e.currentTarget.id));
        }
    }

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    PCR List
                </h2>
            }
        >
            <Head title="PCR list" />

            <div className="py-2">
                <div className="mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                                    href={route("pcr.create")}
                                >
                                    Create PCR
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full whitespace-nowrap">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="px-4 py-2">No.</th>
                                            <th className="px-4 py-2">
                                                Patient ID
                                            </th>
                                            <th className="px-4 py-2">Entry Date</th>
                                            <th className="px-4 py-2">Name</th>
                                            <th className="px-4 py-2">Age</th>
                                            <th className="px-4 py-2">
                                                Contact no
                                            </th>
                                            <th className="px-4 py-2">
                                                Reg Fee
                                            </th>
                                            <th className="px-4 py-2">
                                                Discount
                                            </th>
                                            <th className="px-4 py-2">Paid</th>
                                            <th className="px-4 py-2">Due</th>
                                            <th className="px-4 py-2">Total</th>
                                            <th className="px-4 py-2">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {datas.map(
                                            (
                                                {
                                                    id,
                                                    patient_id,
                                                    entry_date,
                                                    name,
                                                    age,
                                                    contact_no,
                                                    reg_fee,
                                                    discount,
                                                    paid,
                                                    due,
                                                    total,
                                                },
                                                index
                                            ) => (
                                                <tr key={id}>
                                                    <td className="border px-4 py-2">
                                                        {index + 1}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {patient_id}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {entry_date}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {name}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {age}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {contact_no}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {reg_fee}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {discount}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {paid}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {due}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {total}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        <Link
                                                            tabIndex="1"
                                                            className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                                            href={route(
                                                                "pcr.edit",
                                                                id
                                                            )}
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={destroy}
                                                            id={id}
                                                            tabIndex="-1"
                                                            type="button"
                                                            className="mx-1 px-4 py-2 text-sm text-white bg-red-500 rounded"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        )}

                                        {datas.length === 0 && (
                                            <tr>
                                                <td
                                                    className="px-6 py-4 border-t"
                                                    colSpan="6"
                                                >
                                                    No contacts found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default ViewList;
