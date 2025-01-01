import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { FaFileInvoice } from "react-icons/fa";
import { Inertia } from "@inertiajs/inertia";
import { hasAnyRole, hasRole } from "@/backend/Utils/RoleCheck";


const ViewMolecular = ({ auth, moleculars }) => {
    const [filteredData, setFilteredData] = useState(moleculars);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(moleculars.length / perPage);

    useEffect(() => {
        const startIndex = (currentPage - 1) * perPage;
        const displayedData = moleculars.slice(
            startIndex,
            startIndex + perPage
        );
        setFilteredData(displayedData);
    }, [currentPage, perPage, moleculars]);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const handlePerPageChange = (e) => {
        setPerPage(
            e.target.value === "all"
                ? moleculars.length
                : parseInt(e.target.value)
        );
        setCurrentPage(1);
    };

    const handleSearch = (term) => {
        const lowerCaseTerm = term.toLowerCase();
        const filtered = moleculars.filter(
            ({ patient_id, name }) =>
                patient_id.toLowerCase().includes(lowerCaseTerm) ||
                name.toLowerCase().includes(lowerCaseTerm)
        );
        setFilteredData(filtered);
    };

    const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");

    const destroy = (patient_id) => {
        if (confirm("Are you sure you want to delete this molecular?")) {
            Inertia.delete(route("moleculars.destroy", patient_id), {
                onError: (error) => console.error("Error:", error),
                onSuccess: () => alert("Deleted successfully!"),
            });
        }
    };

    
    

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold">Manage Molecular</h2>}
        >
            <Head title="Manage Molecular" />

            <div className="py-4">
                <div className="bg-white shadow rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                        <Link
                            className="bg-green-500 text-white px-4 py-2 rounded"
                            href={route("moleculars.create")}
                        >
                            Patient Reg
                        </Link>
                        <CSVLink
                            data={filteredData}
                            filename="Molecular_Report.csv"
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Export CSV
                        </CSVLink>
                    </div>

                    <input
                        type="text"
                        placeholder="Search..."
                        className="border rounded px-4 py-2 w-full mb-4"
                        onChange={(e) => handleSearch(e.target.value)}
                    />

                    <table className="w-full table-auto border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2">No.</th>
                                <th className="border px-4 py-2">Patient ID</th>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Contact</th>
                                <th className="border px-4 py-2">
                                    Registration Date
                                </th>
                                <th className="border px-4 py-2">Discount</th>
                                <th className="border px-4 py-2">Paid</th>
                                <th className="border px-4 py-2">Due</th>
                                <th className="border px-4 py-2">Total</th>
                                <th className="border px-4 py-2">
                                    Net Payable
                                </th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((molecular, index) => (
                                <tr key={molecular.id}>
                                    <td className="border px-4 py-2">
                                        {(currentPage - 1) * perPage +
                                            index +
                                            1}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {molecular.patient_id}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {molecular.name}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {molecular.contact_no}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {formatDate(molecular.reg_date)}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {molecular.discount}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {molecular.paid}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {molecular.due}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {molecular.total}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {molecular.net_payable}
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        {/* View Details Button */}
                                        <Link
                                            tabIndex="1"
                                            className="mr-1 p-2 text-white bg-blue-900 rounded inline-flex items-center"
                                            href={route(
                                                "moleculars.show",
                                                molecular.id
                                            )}
                                            title="View Details"
                                        >
                                            <FiEye className="h-5 w-5" />
                                        </Link>

                                        {/* Money Receipt Button */}
                                        <Link
                                            tabIndex="1"
                                            className="p-2 text-white bg-green-700 rounded inline-flex items-center"
                                            href={route(
                                                "molecular-inv",
                                                molecular.patient_id
                                            )}
                                            title="Money Receipt"
                                        >
                                            <FaFileInvoice className="h-5 w-5" />
                                        </Link>

                                        {/* Edit Button */}
                                        {hasAnyRole(auth.user, [
                                            "super-admin",
                                            "admin",
                                        ]) && (
                                        <Link
                                            tabIndex="1"
                                            className="mx-1 p-2 text-white bg-blue-500 rounded inline-flex items-center"
                                            href={route(
                                                "moleculars.edit",
                                                molecular.id
                                            )}
                                            title="Edit Record"
                                        >
                                            <FiEdit className="h-5 w-5" />
                                        </Link>
                                        )}

                                        {/* Delete Button */}
                                        {hasRole(auth.user, "super-admin") && (
                                        <button
                                            onClick={() => destroy(molecular.id)}
                                            tabIndex="-1"
                                            type="button"
                                            className="p-2 text-white bg-red-500 rounded inline-flex items-center"
                                            title="Delete Record"
                                        >
                                            <FiTrash2 className="h-5 w-5" />
                                        </button>
                                         )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-between items-center mt-4">
                        <div>
                            <select
                                className="border rounded px-8 py-2"
                                value={perPage}
                                onChange={handlePerPageChange}
                            >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value="all">All</option>
                            </select>
                        </div>
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

export default ViewMolecular;
