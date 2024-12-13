// DatePicker.js
import React from "react";
import DatePicker from "react-datepicker";

const CustomDatePicker = ({ selectedDate, handleDateChange, readOnly, disabled }) => {
    return (
        <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            isClearable // This allows clearing the date
            placeholderText="Select Date" // Placeholder text when no date is selected
            readOnly= {readOnly}
            disabled={disabled}
        />
    );
};

export default CustomDatePicker;
