import React, { useState, useEffect } from "react";
import { useForm, Head } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const EditRosterAssign = ({
    auth,
    employee,
    rosters = [],
    days = [],
    assignments = [],
    holidays = [],
}) => {
    const { data, setData, put, processing } = useForm({
        employee_id: employee?.id || "",
        assignments: [],
    });

    // Load existing data
    useEffect(() => {
        const mapped = days.map((day) => {
            const foundRoster = assignments.find((a) => a.day_of_week === day);
            const isHoliday = holidays.some((h) => h.day_of_week === day);
            return {
                day_of_week: day,
                roster_id: foundRoster ? foundRoster.roster_id : "",
                is_holiday: isHoliday,
            };
        });
        setData((prev) => ({ ...prev, assignments: mapped }));
    }, []);

    // Handle roster selection
    const handleRosterChange = (day, rosterId) => {
        setData("assignments", data.assignments.map((a) =>
            a.day_of_week === day ? { ...a, roster_id: rosterId, is_holiday: false } : a
        ));
    };

    // Handle holiday toggle
    const handleHolidayToggle = (day) => {
        setData("assignments", data.assignments.map((a) =>
            a.day_of_week === day ? { ...a, is_holiday: !a.is_holiday, roster_id: "" } : a
        ));
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("assign-employee-roster.update", employee.id));
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Roster Assign
                </h1>
            }
        >
            <Head title="Edit Roster Assign" />
            <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
                <h2 className="text-xl font-semibold mb-4">
                    Weekly Roster & Holidays for {employee.name}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Roster Table */}
                    <table className="w-full border rounded text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="p-2 border">Day</th>
                                {rosters.map((r) => (
                                    <th key={r.id} className="p-2 border text-center">
                                        {r.roster_name}
                                        <div className="text-xs text-gray-500">
                                            ({r.office_start} - {r.office_end})
                                        </div>
                                    </th>
                                ))}
                                <th className="p-2 border text-center">Holiday</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.assignments.map((a) => (
                                <tr key={a.day_of_week}>
                                    <td className="p-2 border font-medium">{a.day_of_week}</td>
                                    {rosters.map((r) => (
                                        <td key={r.id} className="text-center border">
                                            <input
                                                type="radio"
                                                name={a.day_of_week}
                                                checked={a.roster_id === r.id && !a.is_holiday}
                                                onChange={() => handleRosterChange(a.day_of_week, r.id)}
                                                disabled={a.is_holiday}
                                                className="w-5 h-5 text-blue-600"
                                            />
                                        </td>
                                    ))}
                                    <td className="text-center border">
                                        <input
                                            type="checkbox"
                                            checked={a.is_holiday}
                                            onChange={() => handleHolidayToggle(a.day_of_week)}
                                            className="w-5 h-5 text-red-600"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                        >
                            Update Assign
                        </button>
                    </div>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default EditRosterAssign;
