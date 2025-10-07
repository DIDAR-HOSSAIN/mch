import React, { useEffect } from "react";
import { useForm, Head } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const EditRosterAssign = ({ auth, employee, rosters, days, assignments, holidays }) => {
    const { data, setData, put, processing } = useForm({
        employee_id: employee.id,
        assignments: [],
    });

    // Map days with existing assignments & holidays
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
    }, [employee.id]);

    const handleRosterChange = (day, rosterId) => {
        setData(
            "assignments",
            data.assignments.map(a =>
                a.day_of_week === day
                    ? { ...a, roster_id: rosterId, is_holiday: false }
                    : a
            )
        );
    };

    const handleHolidayToggle = (day) => {
        setData(
            "assignments",
            data.assignments.map(a =>
                a.day_of_week === day
                    ? { ...a, is_holiday: !a.is_holiday, roster_id: "" }
                    : a
            )
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("employee-roster.update", employee.id));
    };

    return (
        <AdminDashboardLayout user={auth.user} header={<h1>Edit Roster Assign</h1>}>
            <Head title="Edit Roster Assign" />
            <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
                <h2>Edit Weekly Roster & Holidays for {employee.name}</h2>

                <form onSubmit={handleSubmit}>
                    <table className="w-full border rounded text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th>Day</th>
                                {rosters.map(r => (
                                    <th key={r.id}>
                                        {r.roster_name}
                                    </th>
                                ))}
                                <th>Holiday</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.assignments.map(a => (
                                <tr key={a.day_of_week}>
                                    <td>{a.day_of_week}</td>
                                    {rosters.map(r => (
                                        <td key={r.id}>
                                            <input
                                                type="radio"
                                                name={a.day_of_week}
                                                checked={a.roster_id === r.id && !a.is_holiday}
                                                onChange={() => handleRosterChange(a.day_of_week, r.id)}
                                                disabled={a.is_holiday}
                                            />
                                        </td>
                                    ))}
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={a.is_holiday}
                                            onChange={() => handleHolidayToggle(a.day_of_week)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button type="submit" disabled={processing}>
                        {processing ? "Updating..." : "Update Assignments"}
                    </button>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default EditRosterAssign;
