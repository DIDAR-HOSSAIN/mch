import React from "react";
import DatePicker from "react-datepicker";

const CustomDatePicker = ({ selectedDate, handleDateChange, readOnly, disabled }) => {
    return (
        <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="dd/MM/yyyy HH:mm:ss"
            isClearable
            placeholderText="Select Date"
            readOnly={readOnly}
            disabled={disabled}
        />
    );
};

export default CustomDatePicker;
