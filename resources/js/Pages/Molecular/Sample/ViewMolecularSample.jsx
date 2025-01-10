import React, { useEffect, useState } from "react";
import DateWiseReport from "../Reports/DateWiseReport";
import { Link } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { CSVLink } from "react-csv";
import { hasAnyRole, hasRole } from "@/backend/Utils/RoleCheck";
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";

const ViewMolecularSample = ({ auth, molecularSamples }) => {
    console.log("view molecularSamples", molecularSamples);
    const [filteredData, setFilteredData] = useState(molecularSamples);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(molecularSamples.length / perPage);

    const handlePerPageChange = (e) => {
        const value = e.target.value;
        setPerPage(value === "all" ? molecularSamples.length : parseInt(value));
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        const startIndex = (currentPage - 1) * perPage;
        const endIndex =
            perPage === "all" ? molecularSamples.length : startIndex + perPage;
        setFilteredData(molecularSamples.slice(startIndex, endIndex));
    }, [molecularSamples, currentPage, perPage]);

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

     const handleDateWiseSearch = (startDate, endDate) => {
         if (!startDate || !endDate) {
             setFilteredData(molecularSamples);
             return;
         }

         // Adjust end date to include the full day
         const adjustedEndDate = new Date(endDate);
         adjustedEndDate.setHours(23, 59, 59, 999);

         setFilteredData(
             molecularSamples.filter((data) => {
                 const entryDate = new Date(data.collection_date);
                 return (
                     entryDate >= new Date(startDate) &&
                     entryDate <= adjustedEndDate
                 );
             })
         );
     };

       const handleSearch = (searchTerm) => {
           const lowercasedTerm = searchTerm.toLowerCase();
           setFilteredData(
               molecularSamples.filter(
                   (data) =>
                       data.molecular_patient_reg?.name
                           ?.toLowerCase()
                           .includes(lowercasedTerm) ||
                       data.patient_id?.toLowerCase().includes(lowercasedTerm)
               )
           );
       };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(route("samples.destroy", { id }), {
                    onSuccess: () => location.reload(),
                    onError: (errors) => {
                        Swal.fire(
                            "Error!",
                            errors.error || "Something went wrong.",
                            "error"
                        );
                    },
                });
            }
        });
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Manage Molecular Samples
                </h2>
            }
        >
            <div className="py-2 mx-auto max-w-7xl">
                <div className="bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        {/* Controls */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            {hasAnyRole(auth.user, [
                                "super-admin",
                                "admin",
                                "sub-admin",
                                "user",
                            ]) && (
                                <Link
                                    className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                                    href={route("samples.create")}
                                >
                                    Create Molecular Sample
                                </Link>
                            )}
                            <CSVLink
                                data={filteredData}
                                filename={"Molecular_Sample_Report.csv"}
                                className="px-6 py-2 text-white bg-green-500 rounded-md"
                            >
                                Export
                            </CSVLink>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <DateWiseReport
                                data={molecularSamples}
                                onSearch={handleDateWiseSearch}
                                startDateField="collection_date"
                                endDateField="collection_date"
                            />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2">No.</th>
                                        <th className="px-4 py-2">
                                            Patient ID
                                        </th>
                                        <th className="px-4 py-2">Name</th>
                                        <th className="px-4 py-2">
                                            Collection Date
                                        </th>
                                        <th className="px-4 py-2">
                                            Received Date
                                        </th>
                                        <th className="px-4 py-2">
                                            Collection Status
                                        </th>
                                        <th className="px-4 py-2">
                                            Received Status
                                        </th>
                                        <th className="px-4 py-2 text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((sample, index) => (
                                        <tr
                                            key={sample.id}
                                            className="border-t"
                                        >
                                            <td className="px-4 py-2">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-2">
                                                {sample.patient_id || "N/A"}
                                            </td>
                                            <td className="px-4 py-2">
                                                {sample.molecular_patient_reg.name || "N/A"}
                                            </td>
                                            <td className="px-4 py-2">
                                                {formatDate(
                                                    sample.collection_date
                                                )}
                                            </td>
                                            <td className="px-4 py-2">
                                                {formatDate(
                                                    sample.received_date
                                                )}
                                            </td>
                                            <td className="px-4 py-2">
                                                {sample.collection_status ||
                                                    "N/A"}
                                            </td>
                                            <td className="px-4 py-2">
                                                {sample.received_status ||
                                                    "N/A"}
                                            </td>
                                            <td className="border px-4 py-2 text-center">
                                                <Link
                                                    tabIndex="1"
                                                    className="p-2 text-white bg-blue-400 rounded inline-flex items-center"
                                                    href={route(
                                                        "samples.show",
                                                        sample.id
                                                    )}
                                                    title="View"
                                                >
                                                    <FaEye className="h-5 w-5" />
                                                </Link>
                                                <Link
                                                    className="mx-1 p-2 text-white bg-green-700 rounded inline-flex items-center"
                                                    href={route(
                                                        "results.createReport",
                                                        {
                                                            patient_id:
                                                                sample.patient_id,
                                                        }
                                                    )}
                                                    title="Create Report"
                                                >
                                                    <FaPlus className="h-5 w-5" />
                                                </Link>
                                                {hasAnyRole(auth.user, [
                                                    "super-admin",
                                                    "admin",
                                                    "sub-admin",
                                                ]) && (
                                                    <Link
                                                        className="mr-1 p-2 text-white bg-blue-900 rounded inline-flex items-center"
                                                        href={route(
                                                            "samples.edit",
                                                            sample.id
                                                        )}
                                                        title="Edit"
                                                    >
                                                        <FaEdit className="h-5 w-5" />
                                                    </Link>
                                                )}
                                                {hasRole(
                                                    auth.user,
                                                    "super-admin"
                                                ) && (
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                sample.id
                                                            )
                                                        }
                                                        className="p-2 text-white bg-red-500 rounded"
                                                        title="Delete"
                                                    >
                                                        <FaTrashAlt className="h-5 w-5" />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {!filteredData.length && (
                                        <tr>
                                            <td
                                                colSpan="8"
                                                className="text-center py-4"
                                            >
                                                No molecular samples found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between mt-6">
                            <select
                                value={perPage}
                                onChange={handlePerPageChange}
                                className="px-3 border rounded-md"
                            >
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={30}>30</option>
                                <option value={50}>50</option>
                                <option value="all">All</option>
                            </select>
                            <div className="flex space-x-2">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        className={`px-3 py-1 rounded-md ${
                                            currentPage === i + 1
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-100"
                                        }`}
                                        onClick={() => handlePageChange(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default ViewMolecularSample;
