import React, { useState, useEffect } from "react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head } from "@inertiajs/react";
import DateWiseReport from "./DateWiseReport";

const DateWiseBalanceSummaryDetails = ({ auth, data }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");

    useEffect(() => {
        filterData(selectedUser, startDate, endDate);
    }, [selectedUser, startDate, endDate]);

    const handleUserChange = (e) => {
        setSelectedUser(e.target.value);
    };

    const handleDateRangeChange = (startDate, endDate) => {
        setStartDate(startDate);
        setEndDate(endDate);
        filterData(selectedUser, startDate, endDate);
    };

    const filterData = (user, start, end) => {
        const filteredData = data.filter((item) => {
            const entryDate = new Date(item.entry_date);
            const isUserMatch = user ? item.user_name === user : true;
            const isDateRangeMatch =
                (!start || entryDate >= start) &&
                (!end || entryDate <= new Date(end.getTime() + 86400000)); // Add one day to include records on the end date
            return isUserMatch && isDateRangeMatch;
        });
        setFilteredData(filteredData);
    };

    const getColumnSummary = (key) => {
        const count = filteredData.reduce((acc, curr) => {
            return acc + parseFloat(curr[key] || 0);
        }, 0);
        return count;
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Date Wise Balance Summary (Antigen)
                </h2>
            }
        >
            <Head title="Antigen Summary" />

            <div className="py-4">
                <div className="mx-auto max-w-4xl">
                    <div className="flex items-center justify-between mb-4">
                        <select
                            value={selectedUser}
                            onChange={handleUserChange}
                            className="form-select w-64 rounded-md"
                        >
                            <option value="">All Users</option>
                            {Array.from(
                                new Set(data.map((item) => item.user_name))
                            ).map((user, index) => (
                                <option key={index} value={user}>
                                    {user}
                                </option>
                            ))}
                        </select>

                        <DateWiseReport
                            data={data}
                            onSearch={handleDateRangeChange}
                        />
                    </div>

                    {filteredData.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Date
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Patient ID
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Reg Fee
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Discount
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Due
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Paid
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredData.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {formatDate(item.entry_date)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.patient_id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.reg_fee}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.discount}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.due}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.paid}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold"></td>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">
                                            Total
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">
                                            {getColumnSummary("reg_fee")}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">
                                            {getColumnSummary("discount")}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">
                                            {getColumnSummary("due")}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">
                                            {getColumnSummary("paid")}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500">
                            No data available for the selected user and date
                            range.
                        </p>
                    )}
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default DateWiseBalanceSummaryDetails;
