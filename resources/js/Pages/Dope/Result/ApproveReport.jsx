import React, { useState } from "react";
import axios from "axios";
import { Head } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const ApproveReport = ({ auth }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put("update-status", {
                start_date: startDate,
                end_date: endDate,
                status,
            });
            alert("Results updated successfully");
        } catch (error) {
            console.error("Error updating results:", error);
            alert("Failed to update results");
        }
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    General PCR
                </h1>
            }
        >
            <Head title="General PCR" />
            <div className="flex justify-center items-center h-full">
                <form onSubmit={handleSubmit} className="w-full max-w-md">
                    <label className="block mb-4">
                        From Date:
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </label>
                    <label className="block mb-4">
                        To Date:
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </label>
                    <label className="block mb-4">
                        Status:
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="">Select Status</option>
                            <option value="1">Approve</option>
                            <option value="0">Pending</option>
                        </select>
                    </label>
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
