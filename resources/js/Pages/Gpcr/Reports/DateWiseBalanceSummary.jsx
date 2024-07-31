// DateWiseBalanceSummary.jsx
import React, { useState } from "react";
import DateWiseReport from "./DateWiseReport";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head } from "@inertiajs/react";

const DateWiseBalanceSummary = ({ auth, data }) => {

    const [filteredData, setFilteredData] = useState(data);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleSearch = (filteredData, start, end) => {
        setFilteredData(filteredData);
        setStartDate(start);
        setEndDate(end);
    };

    // Calculate summary totals
    const summaryTotal = (filteredData ?? []).reduce(
        (totals, data) => {
            totals.totalPaid += parseFloat(data.paid || 0);
            totals.totalDue += parseFloat(data.due || 0);
            totals.totalDiscount += parseFloat(data.discount || 0);

            return totals;
        },
        {
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
                    Date Wise Balance Summary PCR
                </h2>
            }
        >
            <Head title="Date Wise Balance Summary" />

            <div className="py-2">
                <div className="mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <DateWiseReport
                            datas={data}
                            onSearch={(filteredData, start, end) =>
                                handleSearch(filteredData, start, end)
                            }
                        />

                        {/* Display the summary totals */}
                        <div>
                            <p>
                                Date Range:
                                {startDate && endDate
                                    ? `${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`
                                    : "All Dates"}
                            </p>

                            {/* Display the summary details */}
                            <p>Total Paid: {summaryTotal.totalPaid}</p>
                            <p>Total Due: {summaryTotal.totalDue}</p>
                            <p>Total Discount: {summaryTotal.totalDiscount}</p>

                            {/* Add more fields as needed */}
                            {/* ... */}
                        </div>
                    </div>
                    {/* ... rest of your component */}
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default DateWiseBalanceSummary;
