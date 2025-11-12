import React, { useRef, useState, useEffect } from "react";
import { Link, Head, usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import { CSVLink } from "react-csv";
import { useReactToPrint } from "react-to-print";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const ViewPreMedical = ({ auth, preMedicals = [] }) => {
    const { flash } = usePage().props;

    // 🔹 States
    const [searchTerm, setSearchTerm] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [perPage, setPerPage] = useState(30);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState([]);

    const printRef = useRef();

    // ✅ Flash Message
    useEffect(() => {
        if (flash?.success) {
            Swal.fire({
                icon: "success",
                title: flash.success,
                timer: 1500,
                showConfirmButton: false,
            });
        } else if (flash?.error) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: flash.error,
                showConfirmButton: true,
            });
        }
    }, [flash]);

    // ✅ Filter Data (search + date range)
    useEffect(() => {
        let data = preMedicals;

        if (searchTerm.trim() !== "") {
            const lower = searchTerm.toLowerCase();
            data = data.filter(
                (item) =>
                    item.passport_no?.toLowerCase().includes(lower) ||
                    item.first_name?.toLowerCase().includes(lower) ||
                    item.last_name?.toLowerCase().includes(lower)
            );
        }

        if (fromDate) {
            data = data.filter(
                (item) => new Date(item.created_at) >= new Date(fromDate)
            );
        }

        if (toDate) {
            data = data.filter(
                (item) => new Date(item.created_at) <= new Date(toDate)
            );
        }

        setFilteredData(data);
        setCurrentPage(1);
    }, [searchTerm, fromDate, toDate, preMedicals]);

    // ✅ Pagination Logic
    const totalPages = Math.ceil(filteredData.length / perPage);
    const paginatedData =
        perPage === "all"
            ? filteredData
            : filteredData.slice(
                (currentPage - 1) * perPage,
                currentPage * perPage
            );

    // ✅ Delete Record
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

    // ✅ Print
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: "Pre-Medical Report List",
    });

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={<h1 className="font-semibold text-xl text-gray-800">Pre-Medical List</h1>}
        >
            <Head title="Pre-Medical List" />

            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8">
                {/* 🔹 Filters */}
                <div className="bg-white shadow-sm rounded-lg p-4 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-end gap-3 mb-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Search</label>
                        <input
                            type="text"
                            placeholder="Name / Passport"
                            className="border rounded-lg px-3 py-2 w-full sm:w-52 md:w-60 text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium">From</label>
                        <input
                            type="date"
                            className="border rounded-lg px-3 py-2 text-sm w-full sm:w-44"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium">To</label>
                        <input
                            type="date"
                            className="border rounded-lg px-3 py-2 text-sm w-full sm:w-44"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Per Page</label>
                        <select
                            className="border rounded-lg px-3 py-2 text-sm w-full sm:w-28"
                            value={perPage}
                            onChange={(e) => setPerPage(e.target.value)}
                        >
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="all">All</option>
                        </select>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:ml-auto w-full sm:w-auto">
                        <Link
                            href="/pre-medical/create"
                            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 w-full sm:w-auto text-center"
                        >
                            + Add New
                        </Link>
                        <CSVLink
                            data={filteredData || []}
                            filename="PreMedical_Report.csv"
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 w-full sm:w-auto text-center"
                        >
                            📤 Export CSV
                        </CSVLink>
                        <button
                            onClick={handlePrint}
                            type="button"
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 w-full sm:w-auto"
                        >
                            🖨️ Print
                        </button>
                    </div>
                </div>

                {/* 🔹 Table */}
                <div
                    ref={printRef}
                    className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-100"
                >
                    <table className="min-w-full text-sm text-left text-gray-700 border-collapse">
                        <thead className="bg-gray-100 text-gray-800">
                            <tr>
                                <th className="px-3 py-2">#</th>
                                <th className="px-3 py-2">Passport No</th>
                                <th className="px-3 py-2">Name</th>
                                <th className="px-3 py-2">Country</th>
                                <th className="px-3 py-2">Report Date</th>
                                <th className="px-3 py-2 text-right">Amount</th>
                                <th className="px-3 py-2 print:hidden text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.length ? (
                                paginatedData.map((item, i) => (
                                    <tr key={item.id} className="hover:bg-gray-50 border-b last:border-0">
                                        <td className="px-3 py-2">{(currentPage - 1) * perPage + i + 1}</td>
                                        <td className="px-3 py-2 font-medium">{item.passport_no}</td>
                                        <td className="px-3 py-2">
                                            {item.first_name} {item.last_name}
                                        </td>
                                        <td className="px-3 py-2">{item.country_name}</td>
                                        <td className="px-3 py-2">
                                            {item.report_date
                                                ? new Date(item.report_date).toLocaleDateString()
                                                : "-"}
                                        </td>
                                        <td className="px-3 py-2 text-right">
                                            {item.amount ? parseFloat(item.amount).toFixed(2) : "0.00"}
                                        </td>
                                        <td className="px-3 py-2 text-center space-x-1 print:hidden">
                                            <Link
                                                href={`/pre-medical/${item.id}`}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                href={`/pre-medical/${item.id}/edit`}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center text-gray-500 py-4">
                                        No records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* 🔹 Pagination */}
                {perPage !== "all" && totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3 text-sm text-gray-600">
                        <p>
                            Showing {(currentPage - 1) * perPage + 1} -{" "}
                            {Math.min(currentPage * perPage, filteredData.length)} of{" "}
                            {filteredData.length} records
                        </p>

                        <div className="flex flex-wrap gap-2 justify-center">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-3 py-1 rounded transition-all duration-150 ${currentPage === i + 1
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AdminDashboardLayout>
    );
};

export default ViewPreMedical;
