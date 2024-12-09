import React, { useEffect, useState } from "react";
import DateWiseReport from "../Reports/DateWiseReport";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { CSVLink } from "react-csv";
import { hasAnyRole, hasRole } from "@/backend/Utils/RoleCheck";

const ViewMolecularSample = ({ auth, samples }) => {
    // State for filtered data
       const [filteredData, setFilteredData] = useState(samples);
       const [perPage, setPerPage] = useState(10);
       const [currentPage, setCurrentPage] = useState(1);

       const handlePerPageChange = (e) => {
           const value = e.target.value;
           setPerPage(value === "all" ? samples.length : parseInt(value));
           setCurrentPage(1);
       };

       const totalPages =
           perPage === "all" ? 1 : Math.ceil(samples.length / perPage);

       const handlePageChange = (pageNumber) => {
           setCurrentPage(pageNumber);
       };

       useEffect(() => {
           const startIndex = (currentPage - 1) * perPage;
           const endIndex = Math.min(startIndex + perPage, samples.length);
           const displayedData = samples.slice(startIndex, endIndex);
           setFilteredData(displayedData);
       }, [samples, currentPage, perPage]);

       const formatDate = (dateString) => {
           const options = { day: "numeric", month: "short", year: "numeric" };
           return new Date(dateString).toLocaleDateString("en-GB", options);
       };

       const handleDateWiseSearch = (startDate, endDate) => {
           if (!startDate || !endDate) {
               setFilteredData(samples);
               return;
           }

           const filteredData = samples.filter((data) => {
               const entryDate = new Date(data.sample_collection_date);
               return (
                   entryDate >= startDate &&
                   entryDate <= new Date(endDate.getTime() + 86400000)
               );
           });

           setFilteredData(filteredData);
       };

       const handleSearch = (searchTerm) => {
           const filtered = samples.filter((data) => {
               return (
                   data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   data.patient_id
                       .toLowerCase()
                       .includes(searchTerm.toLowerCase())
               );
           });

           setFilteredData(filtered);
       };

    // Event handler for deleting a sample
    const destroy = (id) => {
        if (confirm("Are you sure you want to delete this Sample?")) {
            Inertia.delete(route("sample.destroy", id));
        }
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Manage Sample
                </h2>
            }
        >
            <div className="py-2 mx-auto">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        {/* Search and Export Controls */}
                        <div className="flex items-center justify-between mb-6">
                            {hasAnyRole(auth.user, ["super-admin", "admin", "sub-admin", "user"]) && (
                            <Link
                                className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                                href={route("sample.create")}
                            >
                                Create Sample
                            </Link>
                            )}

                            {/* CSV Export Link */}
                            <CSVLink
                                data={filteredData}
                                filename={"Sample Report.csv"}
                                className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                            >
                                Export
                            </CSVLink>
                        </div>

                        {/* Date-wise Filtering */}
                        <div className="flex items-center justify-between mb-6">
                            <DateWiseReport
                                data={samples}
                                onSearch={handleDateWiseSearch}
                                startDateField="sample_collection_date"
                                endDateField="sample_collection_date"
                            />

                            {/* Search Input */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    onChange={(e) =>
                                        handleSearch(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        {/* Table of Samples */}
                        <div className="overflow-x-auto">
                            <table className="w-full whitespace-nowrap">
                                {/* Table Headers */}
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2">No.</th>
                                        <th className="px-4 py-2">
                                            Patient ID
                                        </th>
                                        <th className="px-4 py-2">Name</th>
                                        <th className="px-4 py-2">
                                            Sample Collection Date
                                        </th>
                                        <th className="px-4 py-2">
                                            Sample Status
                                        </th>
                                        <th className="px-4 py-2">Remarks</th>
                                        <th className="px-4 py-2">Action</th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody>
                                    {filteredData.map(
                                        (
                                            {
                                                id,
                                                patient_id,
                                                name,
                                                sample_collection_date,
                                                sample_status,
                                                remarks,
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
                                                    {formatDate(
                                                        sample_collection_date
                                                    )}
                                                </td>
                                        
                                                <td className="border px-4 py-2">
                                                    {sample_status}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {remarks}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {/* Show Sample Link */}
                                                    <Link
                                                        tabIndex="1"
                                                        className="mr-1 px-4 py-2 text-sm text-white bg-blue-900 rounded"
                                                        href={route(
                                                            "sample.show",
                                                            id
                                                        )}
                                                    >
                                                        Show
                                                    </Link>
                                                    {/* Barcode Print Link */}
                                                    <Link
                                                        tabIndex="1"
                                                        className="px-4 py-2 text-sm text-white bg-blue-900 rounded"
                                                        href={route(
                                                            "barcode",
                                                            id
                                                        )}
                                                    >
                                                        Barcode Print
                                                    </Link>
                                                    {hasAnyRole(auth.user, ["super-admin", "admin", "sub-admin"]) && (
                                                    <Link
                                                        tabIndex="1"
                                                        className=" mx-1 px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                                        href={route(
                                                            "sample.edit",
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

                                    {/* Rendered when no data is available */}
                                    {filteredData.length === 0 && (
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
                                                    currentPage === index + 1
                                                        ? "bg-blue-500 text-white"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    handlePageChange(index + 1)
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
        </AdminDashboardLayout>
    );
};

export default ViewMolecularSample;
