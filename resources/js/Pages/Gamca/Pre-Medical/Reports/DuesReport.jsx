import React, { useState, useEffect } from "react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head } from "@inertiajs/react";
import DateWiseReport from "./DateWiseReport";

const DuesReport = ({ auth, data }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");

    useEffect(() => {
        filterData(selectedUser, startDate, endDate);
    }, [selectedUser, startDate, endDate, data]);

    const handleUserChange = (e) => setSelectedUser(e.target.value);

    const handleDateRangeChange = (start, end) => {
        setStartDate(start);
        setEndDate(end);
    };

    const filterData = (user, start, end) => {
        const filtered = data.filter((item) => {
            const entryDate = new Date(item.reg_date);

            const isUserMatch = user ? item.user_name === user : true;

            const isDateMatch =
                (!start || entryDate >= new Date(start.setHours(0, 0, 0, 0))) &&
                (!end || entryDate <= new Date(end.setHours(23, 59, 59, 999)));

            const isDueValid =
                item.due !== null && parseFloat(item.due) > 0;

            return isUserMatch && isDateMatch && isDueValid;
        });

        setFilteredData(filtered);
    };

    const getColumnSummary = (key) =>
        filteredData.reduce((acc, curr) => acc + parseFloat(curr[key] || 0), 0);

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dues Report (Molecular)
                </h2>
            }
        >
            <Head title="Dues Report" />

            <div className="py-4">
                <div className="mx-auto max-w-6xl">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                        <select
                            value={selectedUser}
                            onChange={handleUserChange}
                            className="form-select w-full sm:w-64 rounded-md"
                        >
                            <option value="">All Users</option>
                            {Array.from(new Set(data.map((item) => item.user_name))).map(
                                (user, index) => (
                                    <option key={index} value={user}>
                                        {user}
                                    </option>
                                )
                            )}
                        </select>

                        <DateWiseReport data={data} onSearch={handleDateRangeChange} />
                    </div>

                    {filteredData.length > 0 ? (
                        <div className="overflow-x-auto border rounded">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Patient ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Due
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredData.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {formatDate(item.reg_date)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.patient_id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.due}</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-gray-100 font-bold">
                                        <td className="px-6 py-4 whitespace-nowrap"></td>
                                        <td className="px-6 py-4 whitespace-nowrap">Total</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getColumnSummary("due")}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-4">
                            No data available for the selected user and date range.
                        </p>
                    )}
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default DuesReport;
