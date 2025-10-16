import React, { useRef, useState } from "react";
import { Link, usePage, router, Head } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const ViewPreMedical = ({ auth, filters = {} }) => {
    const { pre_medicals, flash } = usePage().props;
    const [search, setSearch] = useState(filters.search || "");

    const printRef = useRef(); // 🔹 Reference for printable area

    // 🔹 ReactToPrint handler
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: "Pre-Medical List",
    });

    // 🔹 Search Handler
    const handleSearch = (e) => {
        e.preventDefault();
        router.get("/premedicals", { search }, { preserveState: true });
    };

    // 🔹 Success message
    if (flash?.success) {
        Swal.fire({
            icon: "success",
            title: flash.success,
            showConfirmButton: false,
            timer: 2000,
        });
    }

    // 🔹 Delete Confirmation
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This record will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/pre-medical/${id}`);
            }
        });
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    Pre-Medical List
                </h1>
            }
        >
            <Head title="Pre-Medical List" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* 🔹 Top Controls: Search + Add + Print Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                    <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search by passport or name..."
                            className="border rounded px-3 py-2 w-full sm:w-64"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Search
                        </button>
                    </form>

                    <div className="flex gap-2">
                        <Link
                            href="/pre-medical/create"
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            + Add Pre-Medical
                        </Link>
                        <button
                            onClick={handlePrint}
                            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                        >
                            🖨️ Print All
                        </button>
                    </div>
                </div>

                {/* 🔹 Printable Area */}
                <div ref={printRef} className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">#</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">Passport No</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">Name</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">Country</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">Report Date</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">Photo</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">Amount</th>
                                <th className="px-4 py-2 text-center font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {pre_medicals.data.length > 0 ? (
                                pre_medicals.data.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2">{pre_medicals.from + index}</td>
                                        <td className="px-4 py-2 font-medium text-gray-800">{item.passport_no}</td>
                                        <td className="px-4 py-2 text-gray-700">
                                            {item.first_name} {item.last_name}
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">{item.country_name}</td>
                                        <td className="px-4 py-2 text-gray-700">
                                            {item.report_date ?? "-"}
                                        </td>
                                        <td className="border px-4 py-2">
                                            <img
                                                // src={`/public/images/passengers/${item.photo}`}
                                                src={`/images/passengers/${item?.photo}`}
                                                alt="Passenger Image"
                                                className="w-24 h-auto object-cover"
                                            />
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            {item.amount ? `${item.amount} BDT` : "N/A"}
                                        </td>

                                        {/* 🔹 Action Buttons */}
                                        <td className="text-gray-700">
                                            {/* Show Button */}
                                            <Link
                                                href={`/pre-medical/${item.id}`}
                                                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs"
                                            >
                                                👁️ Show
                                            </Link>

                                            {/* Edit Button */}
                                            <Link
                                                href={`/pre-medical/${item.id}/edit`}
                                                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-xs"
                                            >
                                                ✏️ Edit
                                            </Link>

                                            {/* Print Button */}
                                            {/* Money Receipt Button (New) */}
                                            <Link
                                                href={route("premedical.receipt", item.id)}
                                                target="_blank"
                                                className="bg-teal-600 text-white px-2 py-1 rounded hover:bg-teal-700 text-xs"
                                            >
                                                💰 Receipt
                                            </Link>

                                            {/* Delete Button */}
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-xs"
                                            >
                                                🗑️ Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center text-gray-500 py-4">
                                        No Pre-Medical data found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* 🔹 Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-600">
                        Showing {pre_medicals.from || 0} - {pre_medicals.to || 0} of {pre_medicals.total} records
                    </p>
                    <div className="flex gap-2">
                        {pre_medicals.links.map((link, i) => (
                            <button
                                key={i}
                                disabled={!link.url}
                                onClick={() => link.url && router.visit(link.url)}
                                className={`px-3 py-1 rounded text-sm ${link.active
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default ViewPreMedical;
