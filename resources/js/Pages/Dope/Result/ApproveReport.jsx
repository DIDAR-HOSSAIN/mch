import React, { useState } from "react";
import axios from "axios";
import { Head } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const ApproveReport = ({ auth }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [resultStatus, setResultStatus] = useState(""); // Changed from status to sampleStatus

    const handleSubmit = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.put("/update-status", {
                        start_date: startDate.toISOString().split("T")[0],
                        end_date: endDate.toISOString().split("T")[0],
                        result_status: resultStatus, // Corrected key name to sample_status
                    });

                    if (response.data.success) {
                        Swal.fire(
                            "Saved!",
                            "Results updated successfully.",
                            "success"
                        );
                    } else if (response.data.error) {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: response.data.message,
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "No data found for the given date range.",
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to update results",
                    });
                }
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    Report Approve
                </h1>
            }
        >
            <Head title="Report Approve" />
            <div className="flex justify-center items-center h-full py-8 px-4 md:px-0">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
                >
                    <div className="mb-4">
                        <label
                            htmlFor="startDate"
                            className="block text-sm font-medium text-gray-700"
                        >
                            From Date:
                        </label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            dateFormat="yyyy-MM-dd"
                            wrapperClassName="w-full"
                            id="startDate"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="endDate"
                            className="block text-sm font-medium text-gray-700"
                        >
                            To Date:
                        </label>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            dateFormat="yyyy-MM-dd"
                            wrapperClassName="w-full"
                            id="endDate"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="sampleStatus"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Result Status:
                        </label>
                        <select
                            id="status"
                            value={resultStatus}
                            onChange={(e) => setResultStatus(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="" disabled>
                                Select Status
                            </option>
                            <option value="Approve">Approve</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Approve Report
                    </button>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default ApproveReport;
