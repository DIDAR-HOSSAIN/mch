import React, { useRef, useState } from "react";
import { Link, usePage, router, Head } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const ViewPreMedical = ({ auth, filters = {} }) => {
    const { pre_medicals, flash } = usePage().props;
    const [search, setSearch] = useState(filters.search || "");
    const printRef = useRef();

    // ✅ Print handler
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: "Pre-Medical Report List",
    });

    // ✅ Search handler
    const handleSearch = (e) => {
        e.preventDefault();
        router.get("/pre-medical", { search }, { preserveState: true });
    };

    // ✅ Flash message
    if (flash?.success) {
        Swal.fire({
            icon: "success",
            title: flash.success,
            timer: 1500,
            showConfirmButton: false,
        });
    }

    // ✅ Delete confirmation
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
            header={<h1 className="font-semibold text-xl text-gray-800">Pre-Medical List</h1>}
        >
            <Head title="Pre-Medical List" />

            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8">
                {/* 🔹 Search + Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
                    <form
                        onSubmit={handleSearch}
                        className="flex flex-col sm:flex-row w-full sm:w-auto gap-2"
                    >
                        <input
                            type="text"
                            placeholder="Search by Passport / Name"
                            className="border rounded-lg px-3 py-2 w-full sm:w-64 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                        >
                            Search
                        </button>
                    </form>

                    <div className="flex flex-wrap justify-center sm:justify-end gap-2">
                        <Link
                            href="/pre-medical/create"
                            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
                        >
                            + Add New
                        </Link>
                        <button
                            onClick={handlePrint}
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700"
                        >
                            🖨️ Print
                        </button>
                    </div>
                </div>

                {/* 🔹 Table (Printable Area) */}
                <div
                    ref={printRef}
                    className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-100 print:shadow-none"
                >
                    <table className="min-w-full text-sm text-left text-gray-700 border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-3 py-2 font-semibold">#</th>
                                <th className="px-3 py-2 font-semibold">Pre Medical ID</th>
                                <th className="px-3 py-2 font-semibold">Passport No</th>
                                <th className="px-3 py-2 font-semibold">Name</th>
                                <th className="px-3 py-2 font-semibold">Country</th>
                                <th className="px-3 py-2 font-semibold">Report Date</th>
                                <th className="px-3 py-2 font-semibold">Photo</th>
                                <th className="px-3 py-2 font-semibold">Amount</th>
                                <th className="px-3 py-2 font-semibold print:hidden text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {pre_medicals?.data?.length ? (
                                pre_medicals.data.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition">
                                        <td className="px-3 py-2">{pre_medicals.from + index}</td>
                                        <td className="px-3 py-2 font-medium">{item.pre_medical_id}</td>
                                        <td className="px-3 py-2 font-medium">{item.passport_no}</td>
                                        <td className="px-3 py-2">{`${item.first_name || ""} ${item.last_name || ""}`}</td>
                                        <td className="px-3 py-2">{item.country_name}</td>
                                        <td className="px-3 py-2">
                                            {item.report_date
                                                ? new Date(item.report_date).toLocaleDateString()
                                                : "-"}
                                        </td>
                                        <td className="px-3 py-2">
                                            {item.photo ? (
                                                <img
                                                    src={`/images/passengers/${item.photo}`}
                                                    alt="Passenger"
                                                    className="w-16 h-12 object-cover rounded border"
                                                />
                                            ) : (
                                                <span className="text-gray-400">No Photo</span>
                                            )}
                                        </td>
                                        <td className="px-3 py-2">{item.amount}</td>

                                        {/* 🔹 Action Buttons */}
                                        <td className="px-3 py-2 flex flex-wrap gap-1 justify-center print:hidden">
                                            <Link
                                                href={`/pre-medical/${item.id}`}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                                            >
                                                👁️ Show
                                            </Link>
                                            <Link
                                                href={`/pre-medical/${item.id}/edit`}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs"
                                            >
                                                ✏️ Edit
                                            </Link>
                                            <Link
                                                href={`/pre-medical-inv/${item.id}`}
                                                target="_blank"
                                                className="bg-teal-600 hover:bg-teal-700 text-white px-2 py-1 rounded text-xs"
                                            >
                                                💰 Receipt
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
                                            >
                                                🗑️ Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center text-gray-500 py-4">
                                        No records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* 🔹 Pagination */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3 text-sm text-gray-600">
                    <p>
                        Showing {pre_medicals.from || 0} - {pre_medicals.to || 0} of{" "}
                        {pre_medicals.total || 0} records
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {pre_medicals.links.map((link, i) => (
                            <button
                                key={i}
                                disabled={!link.url}
                                onClick={() => link.url && router.visit(link.url)}
                                className={`px-3 py-1 rounded ${link.active
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
