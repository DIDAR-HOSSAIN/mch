import React, { useEffect } from "react";
import { useForm, Head } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const EditRosterAssign = ({ auth, employee, rosters, days, assignments, holidays }) => {
    const { data, setData, put, processing } = useForm({
        employee_id: employee.id,
        assignments: [],
    });

    useEffect(() => {
        const mapped = days.map(day => {
            const foundRoster = assignments.find(a => a.day_of_week === day);
            const isHoliday = holidays.some(h => h.day_of_week === day);
            return {
                day_of_week: day,
                roster_id: foundRoster ? foundRoster.roster_id : "",
                is_holiday: isHoliday,
            };
        });
        setData(prev => ({ ...prev, assignments: mapped }));
    }, [employee, assignments, holidays, days]);

    const handleRosterChange = (day, rosterId) => {
        setData("assignments", data.assignments.map(a =>
            a.day_of_week === day ? { ...a, roster_id: rosterId, is_holiday: false } : a
        ));
    };

    const handleHolidayToggle = (day) => {
        setData("assignments", data.assignments.map(a =>
            a.day_of_week === day ? { ...a, is_holiday: !a.is_holiday, roster_id: "" } : a
        ));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('assign-employee-roster.update', employee.id));
    };



    return (
        <AdminDashboardLayout user={auth.user} header={<h1 className="text-2xl font-bold">Edit Roster Assign</h1>}>
            <Head title={`Edit Roster Assign - ${employee.name}`} />
            <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow-lg mt-6">
                <h2 className="text-xl font-semibold mb-4">
                    Weekly Roster & Holidays for <span className="text-blue-600">{employee.name}</span>
                </h2>

                <form onSubmit={handleSubmit} className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded text-sm text-center">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-3 py-2 border">Day</th>
                                {rosters.map(r => (
                                    <th key={r.id} className="px-3 py-2 border">{r.roster_name}</th>
                                ))}
                                <th className="px-3 py-2 border">Holiday</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.assignments.map(a => (
                                <tr key={a.day_of_week} className="hover:bg-gray-50">
                                    <td className="px-2 py-2 font-medium text-left">{a.day_of_week}</td>
                                    {rosters.map(r => (
                                        <td key={r.id} className="px-2 py-2">
                                            <input
                                                type="radio"
                                                name={a.day_of_week}
                                                checked={a.roster_id === r.id && !a.is_holiday}
                                                onChange={() => handleRosterChange(a.day_of_week, r.id)}
                                                disabled={a.is_holiday}
                                                className="w-4 h-4 accent-blue-600"
                                            />
                                        </td>
                                    ))}
                                    <td className="px-2 py-2">
                                        <input
                                            type="checkbox"
                                            checked={a.is_holiday}
                                            onChange={() => handleHolidayToggle(a.day_of_week)}
                                            className="w-4 h-4 accent-red-600"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-6 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? "Updating..." : "Update Assignments"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default EditRosterAssign;
