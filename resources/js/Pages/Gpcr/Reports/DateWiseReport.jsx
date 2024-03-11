import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateWiseReport = ({ datas, onSearch }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleSearch = () => {
        // Filter datas based on the date range
        const filteredData = datas.filter((data) => {
            const entryDate = new Date(data.entry_date);

            // Perform filtering based on the date range logic
            return (
                (!startDate || entryDate >= startDate) &&
                (!endDate ||
                    entryDate <= new Date(endDate.getTime() + 86400000)) // Add one day to the end date
            );
        });

        // Inform the parent component about the filtered data
        onSearch(filteredData);
    };


    useEffect(() => {
        // Perform initial search when component mounts
        handleSearch();
    }, [startDate, endDate]);

    return (
        <div className="my-4">
            <div className="flex items-center">
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="End Date"
                    className="ml-2"
                />
            </div>
        </div>
    );
};

export default DateWiseReport;
