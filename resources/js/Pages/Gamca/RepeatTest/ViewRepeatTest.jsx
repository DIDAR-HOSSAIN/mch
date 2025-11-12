import React, { useState, useEffect } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import Swal from "sweetalert2";
import { CSVLink } from "react-csv";

const ViewRepeatTest = ({ auth, repeatTests }) => {
    const { flash } = usePage().props;

    const [searchTerm, setSearchTerm] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [perPage, setPerPage] = useState(30);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState([]);

    // 🔹 Filter Data (search + date range)
    useEffect(() => {
        let data = repeatTests;

        // Search filter
        if (searchTerm.trim() !== "") {
            const lower = searchTerm.toLowerCase();
            data = data.filter(
                (item) =>
                    item.pre_medical?.passport_no
                        ?.toLowerCase()
                        .includes(lower) ||
                    item.pre_medical?.first_name
                        ?.toLowerCase()
                        .includes(lower) ||
                    item.pre_medical?.last_name
                        ?.toLowerCase()
                        .includes(lower)
            );
        }

        // Date filter
        if (fromDate) {
            data = data.filter(
                (item) =>
                    new Date(item.created_at) >= new Date(fromDate)
            );
        }
        if (toDate) {
            data = data.filter(
                (item) =>
                    new Date(item.created_at) <= new Date(toDate)
            );
        }

        setFilteredData(data);
        setCurrentPage(1);
    }, [searchTerm, fromDate, toDate, repeatTests]);

    // 🔹 Pagination
    const totalPages = Math.ceil(filteredData.length / perPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    // 🔹 SweetAlert message
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

    // 🔹 Delete handler
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
                router.delete(route("repeat-test.destroy", id));
            }
        });
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold">Repeat Test List</h2>}
        >
            <Head title="Repeat Test List" />

            <div className="p-4 sm:p-6 bg-white shadow rounded-md max-w-7xl mx-auto">
                {/* 🔹 Filter Section */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
                    <div className="flex flex-wrap gap-2">
                        <input
                            type="text"
                            placeholder="Search passport or name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border px-3 py-2 rounded-md w-48"
                        />
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="border px-3 py-2 rounded-md"
                        />
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="border px-3 py-2 rounded-md"
                        />
                        <select
                            value={perPage}
                            onChange={(e) =>
                                setPerPage(
                                    e.target.value === "all"
                                        ? filteredData.length
                                        : parseInt(e.target.value)
                                )
                            }
                            className="border px-6 py-2 rounded-md"
                        >
                            <option value={30}>30</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            <option value="all">All</option>
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <Link
                            href={route("repeat-test.create")}
                            className="bg-green-600 text-white px-4 py-2 rounded-md"
                        >
                            + Add Repeat
                        </Link>
                        <CSVLink
                            data={filteredData}
                            filename="RepeatTest_Report.csv"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md"
                        >
                            Export CSV
                        </CSVLink>
                    </div>
                </div>

                {/* 🔹 Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 border-collapse text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="border p-2 text-left">#</th>
                                <th className="border p-2 text-left">Passenger Name</th>
                                <th className="border p-2 text-left">Passport No</th>
                                <th className="border p-2 text-left">Delivery Date</th>
                                <th className="border p-2 text-right">Total</th>
                                <th className="border p-2 text-right">Net Pay</th>
                                <th className="border p-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((test, index) => (
                                    <tr
                                        key={test.id}
                                        className="even:bg-gray-50 hover:bg-blue-50 transition"
                                    >
                                        <td className="border p-2">
                                            {(currentPage - 1) * perPage + index + 1}
                                        </td>
                                        <td className="border p-2">
                                            {test.pre_medical?.first_name}{" "}
                                            {test.pre_medical?.last_name}
                                        </td>
                                        <td className="border p-2">
                                            {test.pre_medical?.passport_no}
                                        </td>
                                        <td className="border p-2">
                                            {test.delivery_date
                                                ? new Date(
                                                    test.delivery_date
                                                ).toLocaleDateString("en-GB")
                                                : "-"}
                                        </td>
                                        <td className="border p-2 text-right">
                                            {parseFloat(test.total).toFixed(2)}
                                        </td>
                                        <td className="border p-2 text-right">
                                            {parseFloat(test.net_pay).toFixed(2)}
                                        </td>
                                        <td className="border p-2 text-center space-x-2">
                                            <Link
                                                href={`/repeat-tests/${test.id}/print`}
                                                target="_blank"
                                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                                            >
                                                Print
                                            </Link>
                                            <Link
                                                href={`/repeat-test/${test.id}/edit`}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(test.id)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="text-center text-gray-500 py-4"
                                    >
                                        No records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* 🔹 Pagination Buttons */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-4 gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                            (page) => (
                                <button
                                    key={page}
                                    className={`px-3 py-1 border rounded ${page === currentPage
                                            ? "bg-blue-500 text-white"
                                            : "bg-white"
                                        }`}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </button>
                            )
                        )}
                    </div>
                )}
            </div>
        </AdminDashboardLayout>
    );
};

export default ViewRepeatTest;
