import React, { useState, useEffect } from "react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head } from "@inertiajs/react";
import DateWiseReport from "./DateWiseReport"; // আপনার date picker component

const DateWiseBalanceSummary = ({ auth, data }) => {
    console.log('data',data);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        filterData(selectedUser, startDate, endDate);
    }, [selectedUser, startDate, endDate, data]);

    const handleUserChange = (e) => {
        setSelectedUser(e.target.value);
    };

    const handleDateRangeChange = (start, end) => {
        setStartDate(start);
        setEndDate(end);
        filterData(selectedUser, start, end);
    };

    const filterData = (user, start, end) => {
        const filtered = data.filter((item) => {
            const entryDate = new Date(item.entry_date); // DB থেকে আসা date string

            // start, end date conversion
            const startObj = start ? new Date(start) : null;
            const endObj = end ? new Date(end) : null;

            // Adjust end date to include entire day
            if (endObj) {
                endObj.setHours(23, 59, 59, 999);
            }

            // User filter
            const isUserMatch = user ? item.user_name?.trim() === user?.trim() : true;

            // Date filter
            const isDateMatch =
                (!startObj || entryDate >= startObj) &&
                (!endObj || entryDate <= endObj);

            return isUserMatch && isDateMatch;
        });

        setFilteredData(filtered);
    };


    const getColumnSummary = (key) => {
        return filteredData.reduce((acc, curr) => acc + parseFloat(curr[key] || 0), 0);
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Date Wise Balance Summary (Molecular)
                </h2>
            }
        >
            <Head title="Molecular Summary" />

            <div className="py-4">
                <div className="mx-auto max-w-4xl">
                    <div className="flex items-center justify-between mb-4">
                        <select
                            value={selectedUser}
                            onChange={handleUserChange}
                            className="form-select w-64 rounded-md"
                        >
                            <option value="">All Users</option>
                            {Array.from(new Set(data.map((item) => item.user_name))).map((user, idx) => (
                                <option key={idx} value={user}>
                                    {user}
                                </option>
                            ))}
                        </select>

                        <DateWiseReport data={data} onSearch={handleDateRangeChange} />
                    </div>

                    {filteredData.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Summary
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap font-bold">Total Bill</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-bold">{getColumnSummary("amount")}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap font-bold">Net Bill</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-bold">{getColumnSummary("net_payable")}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap font-bold">Total Discount</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-bold">{getColumnSummary("discount")}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap font-bold">Total Due</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-bold">{getColumnSummary("due")}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap font-bold">Total Paid</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-bold">{getColumnSummary("paid")}</td>
                                </tr>
                                <tr className="bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap font-bold">Total Count</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-bold">{filteredData.length}</td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500 mt-4">No data available for the selected user and date range.</p>
                    )}
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default DateWiseBalanceSummary;
