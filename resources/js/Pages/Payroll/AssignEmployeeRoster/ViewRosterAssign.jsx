import React from 'react';
import { Link, Head } from '@inertiajs/react';
import AdminDashboardLayout from '@/backend/Dashboard/AdminDashboardLayout';

const ViewRosterAssign = ({ auth, employees = [], rosters = [], days = [] }) => {
    return (
        <AdminDashboardLayout
            user={auth.user}
            header={<h1 className="font-semibold text-xl text-gray-800 leading-tight">Employee Roster Assignm</h1>}
        >
            <Head title="View Roster Assign" />

            <div className="max-w-6xl mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Roster Assign</h2>
                    <Link
                        href={route('assign-employee-roster.create')}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        New Assignment
                    </Link>
                </div>

                <div className="space-y-6">
                    {employees.map((employee) => (
                        <div key={employee.id} className="p-4 border rounded shadow-sm bg-white">
                            {/* Header Section */}
                            <div className="flex justify-between items-center mb-3">
                                <div>
                                    <h3 className="font-semibold text-lg">{employee.name}</h3>
                                    <div className="text-sm text-gray-600">ID: {employee.id}</div>
                                </div>
                                <div>
                                    {employee.assign_employee_roster && employee.assign_employee_roster.length > 0 ? (
                                        <Link
                                            href={route('assign-employee-roster.edit', employee.assign_employee_roster[0].id)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                    ) : (
                                        <span className="text-gray-400 italic">No Assignment</span>
                                    )}

                                </div>
                            </div>

                            {/* Roster and Holiday Display */}
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                                {days.map((day) => {
                                    const assigned = employee.assign_employee_roster?.find(
                                        (r) => r.day_of_week === day
                                    );

                                    const isHoliday = employee.weekly_holidays?.some(
                                        (h) => h.day_of_week === day
                                    );

                                    return (
                                        <div
                                            key={day}
                                            className={`p-2 border rounded flex justify-between items-center ${isHoliday
                                                    ? 'bg-red-50 border-red-300'
                                                    : 'bg-gray-50'
                                                }`}
                                        >
                                            <div>
                                                <div className="text-sm font-medium">
                                                    {day}{' '}
                                                    {isHoliday && (
                                                        <span className="text-red-600 text-xs font-semibold ml-1">
                                                            (Holiday)
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="text-xs text-gray-600">
                                                    {assigned ? (
                                                        assigned.roster?.roster_name
                                                    ) : (
                                                        <span className="italic text-gray-400">
                                                            Not set
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {assigned && (
                                                <div className="text-xs text-gray-500">
                                                    [{assigned.roster_id}]
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default ViewRosterAssign;
