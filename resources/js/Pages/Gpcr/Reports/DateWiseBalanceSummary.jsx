import React from 'react';
import { useState } from 'react';
import DateWiseReport from './DatewiseReport';
import AdminDashboardLayout from '@/backend/Dashboard/AdminDashboardLayout';
import { Head } from '@inertiajs/react';

const DateWiseBalanceSummary = ({ auth, datas }) => {
      const [filteredData, setFilteredData] = useState(datas);
      const [startDate, setStartDate] = useState(null);
      const [endDate, setEndDate] = useState(null);

      const handleSearch = (searchTerm) => {
          const filtered = datas.filter((data) => {
              const matchesSearchTerm =
                  data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  data.patient_id
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase());

              const isWithinDateRange =
                  (!startDate || new Date(data.entry_date) >= startDate) &&
                  (!endDate || new Date(data.entry_date) <= endDate);

              return matchesSearchTerm && isWithinDateRange;
          });

          setFilteredData(filtered);
      };

    // Calculate summary totals
    const summaryTotal = filteredData.reduce(
        (totals, data) => {
            totals.totalPaid += parseFloat(data.paid || 0);
            totals.totalDue += parseFloat(data.due || 0);
            totals.totalDiscount += parseFloat(data.discount || 0);
            // Add more fields as needed
            // ...

            return totals;
        },
        {
            totalPaid: 0,
            totalDue: 0,
            totalDiscount: 0,
            // Add more fields as needed
            // ...
        }
    );

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    PCR List
                </h2>
            }
        >
            <Head title="PCR list" />

            <div className="py-2">
                <div className="mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <DateWiseReport datas={datas} onSearch={handleSearch} />

                        {/* Display the summary totals */}
                        <div className="text-right">
                            <p>Total Paid: {summaryTotal.totalPaid}</p>
                            <p>Total Due: {summaryTotal.totalDue}</p>
                            <p>Total Discount: {summaryTotal.totalDiscount}</p>
                            {/* Add more fields as needed */}
                            {/* ... */}
                        </div>
                    </div>
                    // ... rest of your component
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default DateWiseBalanceSummary;