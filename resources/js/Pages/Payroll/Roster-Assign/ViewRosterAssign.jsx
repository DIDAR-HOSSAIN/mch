import React from 'react';
import { Link, Head } from '@inertiajs/react';
import AdminDashboardLayout from '@/backend/Dashboard/AdminDashboardLayout';

const ViewRosterAssign = ({ auth, employees = [], rosters = [], days = [] }) => {
    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    Employee Roster Assignments
                </h1>
            }
        >
            <Head title="View Roster Assign" />

            <div className="max-w-6xl mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Roster Assignments</h2>
                    <Link
                        href={route('employee-roster.create')}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        New Assignment
                    </Link>
                </div>

                <div className="space-y-6">
                    {employees.map((employee) => (
                        <div key={employee.id} className="p-4 border rounded">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold">{employee.name}</h3>
                                    <div className="text-sm text-gray-600">ID: {employee.id}</div>
                                </div>
                                <div>
                                    <Link
                                        href={route('employee-roster.edit', employee.id)}
                                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-4 gap-2">
                                {days.map((day) => {
                                    const assigned = employee.rosters?.find(
                                        (r) => r.day_of_week === day
                                    );
                                    return (
                                        <div
                                            key={day}
                                            className="p-2 border rounded flex justify-between items-center"
                                        >
                                            <div>
                                                <div className="text-sm font-medium">{day}</div>
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
