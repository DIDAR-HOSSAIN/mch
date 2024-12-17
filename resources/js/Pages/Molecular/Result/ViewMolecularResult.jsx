import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { Inertia } from "@inertiajs/inertia";
import { hasAnyRole, hasRole } from "@/backend/Utils/RoleCheck";

const ViewMolecularResult = ({ auth, results }) => {
    console.log("view molecular result", results);
    const [searchTerm, setSearchTerm] = useState("");
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    // Filtered Results Based on Search
    const filteredResults = results.filter(
        ({ patient_id, molecular_sample }) =>
            patient_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            molecular_sample.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    // Paginated Results
    const totalPages = Math.ceil(filteredResults.length / perPage);
    const paginatedResults = filteredResults.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1); // Reset to page 1 when search changes
    };

    const handlePerPageChange = (e) => {
        const value =
            e.target.value === "all"
                ? filteredResults.length
                : parseInt(e.target.value);
        setPerPage(value);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold">View Results</h2>}
        >
            <Head title="Manage Results" />

            <div className="py-4">
                <div className="bg-white shadow rounded-lg p-4">
                    {/* Actions Row */}
                    <div className="flex justify-between items-center mb-4">
                        <Link
                            className="bg-green-500 text-white px-4 py-2 rounded"
                            href={route("results.createReport", { patient_id: 'patient_id' })}
                        >
                            Create New Result
                        </Link>

                        <CSVLink
                            data={filteredResults}
                            filename="Results_Report.csv"
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Export CSV
                        </CSVLink>
                    </div>

                    {/* Search Box */}
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border rounded px-4 py-2 w-full mb-4"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />

                    {/* Results Table */}
                    <table className="w-full table-auto border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2">No.</th>
                                <th className="border px-4 py-2">Patient ID</th>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">
                                    Result Date
                                </th>
                                <th className="border px-4 py-2">
                                    Investigation
                                </th>
                                <th className="border px-4 py-2">Result</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedResults.map((result, index) => (
                                <tr key={result.id}>
                                    <td className="border px-4 py-2">
                                        {(currentPage - 1) * perPage +
                                            index +
                                            1}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {result.patient_id}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {result.molecular_sample.name}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {formatDate(result.created_at)}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {result.investigation}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {result.result}
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        {/* Actions */}
                                        <Link
                                            className="mr-1 p-2 text-white bg-green-700 rounded inline-flex items-center"
                                            href={route(
                                                "results.show",
                                                result.id
                                            )}
                                        >
                                            <FiEye className="h-5 w-5" />
                                        </Link>
                                        <Link
                                            className="mr-1 p-2 text-white bg-blue-900 rounded inline-flex items-center"
                                            href={route(
                                                "results.edit",
                                                result.id
                                            )}
                                        >
                                            <FiEdit className="h-5 w-5" />
                                        </Link>
                                        <button
                                            onClick={() => destroy(result.id)}
                                            className="p-2 text-white bg-red-500 rounded"
                                        >
                                            <FiTrash2 className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-4">
                        {/* Items Per Page */}
                        <select
                            className="border rounded px-4 py-2"
                            value={perPage}
                            onChange={handlePerPageChange}
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value="all">All</option>
                        </select>

                        {/* Page Numbers */}
                        <div>
                            {Array.from(
                                { length: totalPages },
                                (_, i) => i + 1
                            ).map((page) => (
                                <button
                                    key={page}
                                    className={`px-4 py-2 border rounded ${
                                        page === currentPage
                                            ? "bg-blue-500 text-white"
                                            : "bg-white"
                                    }`}
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};
export default ViewMolecularResult;