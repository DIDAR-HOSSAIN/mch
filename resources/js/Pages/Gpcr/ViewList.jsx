import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head, Link } from "@inertiajs/react";
import { CSVLink } from "react-csv";
import { useState } from "react";
import DateWiseReport from "../Dope/Reports/DateWiseReport";
import { Inertia } from "@inertiajs/inertia";

const ViewList = ({ auth, datas }) => {

    const formatDate = (dateString) => {
        const options = { day: "numeric", month: "short", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-GB", options);
    };
    const [filteredData, setFilteredData] = useState(datas);


   const handleDateWiseSearch = (startDate, endDate) => {
       // If either start or end date is not set, return all data
       if (!startDate || !endDate) {
           setFilteredData(datas);
           return;
       }

       // Filter the data based on the date range
       const filteredData = datas.filter((data) => {
           const entryDate = new Date(data.entry_date);
           return (
               entryDate >= startDate &&
               entryDate <= new Date(endDate.getTime() + 86400000)
           );
       });

       // Set the filtered data state
       setFilteredData(filteredData);
   };


    const handleSearch = (searchTerm) => {
        // Filter the data based on the search term
        const filtered = datas.filter((data) => {
            // Customize the conditions for searching
            return (
                data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                data.patient_id.toLowerCase().includes(searchTerm.toLowerCase())
                // Add more fields as needed
                // ...
            );
        });

        setFilteredData(filtered);
    };

    const destroy = (id) => {
        if (confirm("Are you sure you want to delete this Patient?")) {
            // Send a DELETE request to delete the sample
            Inertia.delete(route("pcr.destroy", { id: id }));
        }
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Manage PCR
                </h2>
            }
        >
            <Head title="Manage PCR" />

            <div className="py-2">
                <div className="mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                                    href={route("pcr.create")}
                                >
                                    Create PCR
                                </Link>

                                <CSVLink
                                    data={filteredData}
                                    filename={"General PCR Report.csv"}
                                    className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                                >
                                    Export
                                </CSVLink>
                            </div>

                            <div className="flex items-center justify-between mb-6">
                                <DateWiseReport
                                    data={datas}
                                    onSearch={handleDateWiseSearch}
                                    startDateField="entry_date"
                                    endDateField="entry_date"
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
                                            <th className="px-4 py-2">
                                                Entry Date
                                            </th>
                                            <th className="px-4 py-2">Name</th>
                                            <th className="px-4 py-2">Age</th>
                                            <th className="px-4 py-2">
                                                Contact no
                                            </th>
                                            <th className="px-4 py-2">
                                                Reg Fee
                                            </th>
                                            <th className="px-4 py-2">
                                                Discount
                                            </th>
                                            <th className="px-4 py-2">Paid</th>
                                            <th className="px-4 py-2">Due</th>
                                            <th className="px-4 py-2">Total</th>
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
                                                    entry_date,
                                                    name,
                                                    age,
                                                    contact_no,
                                                    reg_fee,
                                                    discount,
                                                    paid,
                                                    due,
                                                    total,
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
                                                        {formatDate(entry_date)}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {name}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {age}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {contact_no}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {reg_fee}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {discount}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {paid}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {due}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {total}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        <Link
                                                            tabIndex="1"
                                                            className="px-4 py-2 text-sm text-white bg-blue-900 rounded"
                                                            href={route(
                                                                "pcr.show",
                                                                id
                                                            )}
                                                        >
                                                            Show
                                                        </Link>
                                                        <Link
                                                            tabIndex="1"
                                                            className="px-4 py-2 text-sm text-white bg-blue-900 rounded"
                                                            href={route(
                                                                "invoice",
                                                                id
                                                            )}
                                                        >
                                                            Money Receipt
                                                        </Link>
                                                        <Link
                                                            tabIndex="1"
                                                            className=" mx-1 px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                                            href={route(
                                                                "pcr.edit",
                                                                id
                                                            )}
                                                        >
                                                            Edit
                                                        </Link>
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
                                                    </td>
                                                </tr>
                                            )
                                        )}

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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default ViewList;
