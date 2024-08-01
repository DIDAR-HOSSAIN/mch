import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head, Link } from "@inertiajs/react";
import { CSVLink } from "react-csv";
import { useEffect, useState } from "react";
import DateWiseReport from "../Reports/DateWiseReport";
import { Inertia } from "@inertiajs/inertia";
import { hasAnyRole, hasRole } from "@/backend/Utils/RoleCheck";

const ViewList = ({ auth, results }) => {
    const [filteredData, setFilteredData] = useState(results);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const duesArray = results.map((result) => parseInt(result.dope.due));

    // Check if any due is greater than 0
    const isAnyDueGreaterThanZero = duesArray.some((due) => due > 0);

    const handlePerPageChange = (e) => {
        const value = e.target.value;
        setPerPage(value === "all" ? results.length : parseInt(value));
        setCurrentPage(1);
    };

    const totalPages =
        perPage === "all" ? 1 : Math.ceil(results.length / perPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        const startIndex = (currentPage - 1) * perPage;
        const endIndex = Math.min(startIndex + perPage, results.length);
        const displayedData = results.slice(startIndex, endIndex);
        setFilteredData(displayedData);
    }, [results, currentPage, perPage]);

    const formatDate = (dateString) => {
        const options = { day: "numeric", month: "short", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-GB", options);
    };

    const handleDateWiseSearch = (startDate, endDate) => {
        if (!startDate || !endDate) {
            setFilteredData(results);
            return;
        }

        const filteredData = results.filter((data) => {
            const entryDate = new Date(data.result_date);
            return (
                entryDate >= startDate &&
                entryDate <= new Date(endDate.getTime() + 86400000)
            );
        });

        setFilteredData(filteredData);
    };

    const handleSearch = (searchTerm) => {
        const filtered = results.filter((data) => {
            return (
                data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                data.patient_id.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });

        setFilteredData(filtered);
    };

    const destroy = (id) => {
        if (confirm("Are you sure you want to delete this Sample?")) {
            // Send a DELETE request to delete the sample
            Inertia.delete(route("result.destroy", id));
        }
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Manage Result
                </h2>
            }
        >
            <Head title="Manage Result" />

            <div className="py-2">
                <div className="mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                                    href={route("result.create")}
                                >
                                    Create Result
                                </Link>

                                <CSVLink
                                    data={filteredData}
                                    filename={"Result Report.csv"}
                                    className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                                >
                                    Export
                                </CSVLink>
                            </div>

                            <div className="flex items-center justify-between mb-6">
                                <DateWiseReport
                                    data={results}
                                    onSearch={handleDateWiseSearch}
                                    startDateField="result_date"
                                    endDateField="result_date"
                                />

                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                        onChange={(e) =>
                                            handleSearch(e.target.value)
                                        }
                                    />
                                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        {/* Add a search icon or clear button if needed */}
                                    </span>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full whitespace-nowrap">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="px-4 py-2">No.</th>
                                            <th className="px-4 py-2">
                                                Patient ID
                                            </th>
                                            <th className="px-4 py-2">Name</th>
                                            <th className="px-4 py-2">
                                                Result Date
                                            </th>
                                            <th className="px-4 py-2">
                                                Alcohol
                                            </th>
                                            <th className="px-4 py-2">
                                                Benzodiazepines
                                            </th>
                                            <th className="px-4 py-2">
                                                Cannabinoids
                                            </th>
                                            <th className="px-4 py-2">
                                                Amphetamine
                                            </th>
                                            <th className="px-4 py-2">
                                                Opiates
                                            </th>
                                            <th className="px-4 py-2">
                                                Status
                                            </th>
                                            <th className="px-4 py-2">
                                                Remarks
                                            </th>
                                            <th className="px-4 py-2">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.map(
                                            (
                                                {
                                                    id,
                                                    patient_id,
                                                    name,
                                                    result_date,
                                                    alcohol,
                                                    benzodiazepines,
                                                    cannabinoids,
                                                    amphetamine,
                                                    opiates,
                                                    result_status,
                                                    remarks,
                                                    dope,
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
                                                        {name}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {result_date}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {alcohol}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {benzodiazepines}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {cannabinoids}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {amphetamine}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {opiates}
                                                    </td>
                                                    <td
                                                        className={`border px-4 py-2 ${
                                                            result_status ===
                                                            "Approve"
                                                                ? "text-green-500"
                                                                : "text-red-500"
                                                        }`}
                                                    >
                                                        {result_status}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {remarks}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        <Link
                                                            tabIndex="1"
                                                            className="mr-1 px-4 py-2 text-sm text-white bg-blue-900 rounded"
                                                            href={route(
                                                                "result.show",
                                                                id
                                                            )}
                                                        >
                                                            Show
                                                        </Link>
                                                        {hasAnyRole(auth.user, ["super-admin","admin","sub-admin",]) ? (
                                                            result_status ==="Approve" && dope.due <= 0 ? (
                                                                <Link
                                                                    tabIndex="1"
                                                                    className="px-4 py-2 mt-4 text-sm text-white bg-blue-900 rounded"
                                                                    href={route(
                                                                        "dope-report",
                                                                        id
                                                                    )}
                                                                >
                                                                    Report
                                                                </Link>
                                                            ) : (
                                                                <span className="px-4 py-2 mt-4 text-sm text-white bg-blue-900 rounded opacity-50 cursor-not-allowed">
                                                                    Report
                                                                </span>
                                                            )
                                                        ) : null}

                                                    {hasAnyRole(auth.user, ["super-admin", "admin"]) && (
                                                        <Link
                                                            tabIndex="1"
                                                            className="mx-1 px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                                            href={route(
                                                                "result.edit",
                                                                id
                                                            )}
                                                        >
                                                            Edit
                                                        </Link>
                                                    )}

                                                    {hasRole(auth.user, "super-admin") && (
                                                        <button
                                                            onClick={() =>
                                                                destroy(id)
                                                            }
                                                            tabIndex="-1"
                                                            type="button"
                                                            className="px-4 py-2 text-sm text-white bg-red-500 rounded"
                                                        >
                                                            Delete
                                                        </button>
                                                    )}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                        
                                        {results.length === 0 && (
                                            <tr>
                                                <td
                                                    className="px-6 py-4 border-t"
                                                    colSpan="12"
                                                >
                                                    No contacts found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                                {/* Pagination select controls */}
                                <div className="flex items-center justify-evenly mt-6">
                                    <select
                                        value={perPage}
                                        onChange={handlePerPageChange}
                                        className="px- py-2 border rounded-md"
                                    >
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={30}>30</option>
                                        <option value={50}>50</option>
                                        <option value={100}>100</option>
                                        <option value="all">All</option>
                                    </select>

                                    {/* Pagination buttons */}
                                    <div className="flex">
                                        {Array.from(
                                            { length: totalPages },
                                            (_, index) => (
                                                <button
                                                    key={index}
                                                    className={`px-3 py-1 border ${
                                                        currentPage ===
                                                        index + 1
                                                            ? "bg-blue-500 text-white"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        handlePageChange(
                                                            index + 1
                                                        )
                                                    }
                                                >
                                                    {index + 1}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default ViewList;
