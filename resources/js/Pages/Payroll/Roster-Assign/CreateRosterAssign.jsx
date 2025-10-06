import React, { useState, useEffect } from "react";
import { useForm, Head } from "@inertiajs/react";

const CreateRosterAssign = ({
    employees = [],
    rosters = [],
    days = [],
    employee = null,
    assignments = [],
    holidays = [],
    editing = false,
}) => {
    const { data, setData, post, processing } = useForm({
        employee_id: employee?.id || "",
        assignments: [],
    });

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

    const handleRosterChange = (day, rosterId) => {
        setData("assignments", data.assignments.map((a) =>
            a.day_of_week === day ? { ...a, roster_id: rosterId, is_holiday: false } : a
        ));
    };

    const handleHolidayToggle = (day) => {
        setData("assignments", data.assignments.map((a) =>
            a.day_of_week === day ? { ...a, is_holiday: !a.is_holiday, roster_id: "" } : a
        ));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("employee-rosters.store"));
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
            <Head title="Assign Weekly Roster & Holidays" />

            <h2 className="text-xl font-semibold mb-4">
                Assign Weekly Roster & Weekly Holidays
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Employee Select */}
                <div>
                    <label className="block text-sm font-medium mb-1">Select Employee</label>
                    <select
                        value={data.employee_id}
                        onChange={(e) => setData("employee_id", e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    >
                        <option value="">Select employee</option>
                        {employees.map((emp) => (
                            <option key={emp.id} value={emp.id}>
                                {emp.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Roster & Holiday Table */}
                <table className="w-full border rounded text-sm">
                    <thead className="bg-gray-100">
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
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        Save Assignments
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateRosterAssign;
