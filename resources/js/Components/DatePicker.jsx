// DatePicker.js
import React from "react";
import DatePicker from "react-datepicker";

const CustomDatePicker = ({ selectedDate, handleDateChange }) => {
    return (
        <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
        />
    );
};

export default CustomDatePicker;
