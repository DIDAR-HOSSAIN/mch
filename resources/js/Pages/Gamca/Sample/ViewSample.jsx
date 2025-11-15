import React, { useEffect, useRef, useState } from "react";
import { usePage, router, Head, Link } from "@inertiajs/react";
import { useReactToPrint } from "react-to-print";
import BarcodeLabel from "./BarcodeLabel";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { CSVLink } from "react-csv";

export default function ViewSample({ auth }) {
    const { samples } = usePage().props;
    console.log(samples);

    const [searchTerm, setSearchTerm] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const [perPage, setPerPage] = useState(30);
    const [currentPage, setCurrentPage] = useState(1);

    const [filteredData, setFilteredData] = useState(samples);

    const [selectedSample, setSelectedSample] = useState(null);
    const printRef = useRef();

    // 🔹 Print handler
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: selectedSample?.pre_medical_id || "Sample Print",
    });

    const printBarcode = (sample) => {
        setSelectedSample(sample);
        setTimeout(() => handlePrint(), 300);
    };

    // 🔹 Filtering Logic
    useEffect(() => {
        let data = [...samples];

        // Search Filter
        if (searchTerm.trim() !== "") {
            const lower = searchTerm.toLowerCase();
            data = data.filter((item) => {
                const first = item.pre_medical?.first_name?.toLowerCase() || "";
                const last = item.pre_medical?.last_name?.toLowerCase() || "";
                const passport = item.pre_medical?.passport_no?.toLowerCase() || "";
                const full = `${first} ${last}`;

                return (
                    first.includes(lower) ||
                    last.includes(lower) ||
                    passport.includes(lower) ||
                    full.includes(lower)
                );
            });
        }

        // Date Range Filter
        if (fromDate) {
            const from = new Date(fromDate);
            from.setHours(0, 0, 0, 0);
            data = data.filter(
                (item) => new Date(item.created_at) >= from
            );
        }

        if (toDate) {
            const to = new Date(toDate);
            to.setHours(23, 59, 59, 999);
            data = data.filter(
                (item) => new Date(item.created_at) <= to
            );
        }

        setFilteredData(data);
        setCurrentPage(1);
    }, [searchTerm, fromDate, toDate, samples]);

    // 🔹 Pagination
    const totalPages = Math.ceil(filteredData.length / perPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    // 🔹 Edit collection date
    const handleEdit = (id) => {
        const newDate = prompt("Enter new collection date (YYYY-MM-DD):");
        if (!newDate) return;

        router.put(route("premedical-sample.update", id), {
            collection_date: newDate,
        });
    };

    // 🔹 Delete
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this sample?")) {
            router.delete(route("premedical-sample.destroy", id));
        }
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold">Pre Medical Sample List</h2>}
        >
            <Head title="Pre Medical Sample List" />

            <div className="p-6 bg-white shadow rounded">

                <h2 className="text-lg font-semibold mb-4 text-center">Sample List</h2>

                {/* 🔹 Filters */}
                <div className="flex flex-col lg:flex-row justify-between gap-3 mb-4">

                    {/* Search & Date */}
                    <div className="flex flex-wrap gap-2">
                        <input
                            type="text"
                            placeholder="Search by name or passport..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border px-3 py-2 rounded-md w-56"
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
                            className="border px-3 py-2 rounded-md"
                        >
                            <option value={30}>30</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            <option value="all">All</option>
                        </select>
                    </div>

                    {/* Buttons (Add + Export) */}
                    <div className="flex gap-2">
                        <Link
                            href={route("premedical-sample.create")}
                            className="bg-green-600 text-white px-4 py-2 rounded-md"
                        >
                            + Add Sample
                        </Link>

                        <CSVLink
                            data={filteredData}
                            filename="PreMedicalSample_Report.csv"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md"
                        >
                            Export CSV
                        </CSVLink>
                    </div>
                </div>

                {/* 🔹 Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full border text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-2 py-1">#</th>
                                <th className="border px-2 py-1">Pre Medical ID</th>
                                <th className="border px-2 py-1">Name</th>
                                <th className="border px-2 py-1">Passport No</th>
                                <th className="border px-2 py-1">Barcode</th>
                                <th className="border px-2 py-1">Date</th>
                                <th className="border px-2 py-1">User</th>
                                <th className="border px-2 py-1">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((sample, index) => (
                                    <tr key={sample.id} className="hover:bg-gray-50">
                                        <td className="border px-2 py-1 text-center">
                                            {(currentPage - 1) * perPage + index + 1}
                                        </td>
                                        <td className="border px-2 py-1 text-center">{sample.pre_medical_id}</td>
                                        <td className="border px-2 py-1 text-center">{sample.pre_medical.first_name} {sample.pre_medical.last_name}</td>
                                        <td className="border px-2 py-1 text-center">{sample.pre_medical.passport_no}</td>
                                        <td className="border px-2 py-1 text-center">{sample.barcode_no}</td>
                                        <td className="border px-2 py-1 text-center">{sample.collection_date}</td>
                                        <td className="border px-2 py-1 text-center">{sample.user_name}</td>

                                        <td className="border px-2 py-1 text-center flex justify-center gap-1">
                                            <button
                                                onClick={() => printBarcode(sample)}
                                                className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                                            >
                                                Print
                                            </button>

                                            <button
                                                onClick={() => handleEdit(sample.id)}
                                                className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(sample.id)}
                                                className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-gray-500">
                                        No samples found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* 🔹 Hidden Print Section */}
                {selectedSample && (
                    <div style={{ display: "none" }}>
                        <div ref={printRef}>
                            <BarcodeLabel entry={selectedSample} />
                        </div>
                    </div>
                )}
            </div>

            {/* 🔹 Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-4 gap-2 flex-wrap">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 border rounded ${currentPage === page
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100"
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}
        </AdminDashboardLayout>
    );
}
