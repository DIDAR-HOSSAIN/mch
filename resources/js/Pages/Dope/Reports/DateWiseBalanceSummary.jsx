import React, { useState, useEffect } from "react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head } from "@inertiajs/react";
import DateWiseReport from "./DateWiseReport";

const DateWiseBalanceSummary = ({ auth, data }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        console.log("Selected User:", selectedUser);
        console.log("Start Date:", startDate);
        console.log("End Date:", endDate);
        filterData(selectedUser, startDate, endDate);
    }, [selectedUser, startDate, endDate]);

    const handleUserChange = (e) => {
        setSelectedUser(e.target.value);
    };

    const handleDateRangeChange = (startDate, endDate) => {
        console.log("Start Date:", startDate);
        console.log("End Date:", endDate);
        setStartDate(startDate);
        setEndDate(endDate);
        filterData(selectedUser, startDate, endDate);
    };




   const filterData = (user, start, end) => {
       console.log("Filtering Data...");
       console.log("User:", user);
       console.log("Start Date:", start);
       console.log("End Date:", end);

       const filteredData = data.filter((item) => {
           const entryDate = new Date(item.entry_date);
           const isUserMatch = user ? item.user_name === user : true;
           const isDateRangeMatch =
               (!start || entryDate >= start) &&
               (!end || entryDate <= new Date(end.getTime() + 86400000)); // Add one day to include records on the end date
           return isUserMatch && isDateRangeMatch;
       });

       console.log("Filtered Data:", filteredData);
       setFilteredData(filteredData);
   };




    const summaryTotal = filteredData.reduce(
        (totals, data) => {
            totals.totalBill += parseFloat(data.total || 0);
            totals.totalPaid += parseFloat(data.paid || 0);
            totals.totalDue += parseFloat(data.due || 0);
            totals.totalDiscount += parseFloat(data.discount || 0);
            return totals;
        },
        {
            totalBill: 0,
            totalPaid: 0,
            totalDue: 0,
            totalDiscount: 0,
        }
    );

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Date Wise Balance Summary (Dope)
                </h2>
            }
        >
            <Head title="Dope Summary" />

            <div className="py-2">
                <div className="mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <select
                            value={selectedUser}
                            onChange={handleUserChange}
                            className="form-select w-64 rounded-md"
                        >
                            <option value="">All</option>
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

                        <div>
                            <p>
                                Date Wise Report:{" "}
                                {startDate &&
                                    endDate &&
                                    `${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`}
                            </p>
                            <p>Total Bill: {summaryTotal.totalBill}</p>
                            <p>Total Discount: {summaryTotal.totalDiscount}</p>
                            <p>Total Due: {summaryTotal.totalDue}</p>
                            <p>Total Paid: {summaryTotal.totalPaid}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default DateWiseBalanceSummary;
