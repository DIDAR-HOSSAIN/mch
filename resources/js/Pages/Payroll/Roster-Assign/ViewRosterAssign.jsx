import React from 'react';
import { Link } from '@inertiajs/react';

const ViewRosterAssign = ({ employees = [], rosters = [], days = [] }) => {
    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Employee Roster Assignments</h2>
                <Link href={route('employee-rosters.create')} className="px-4 py-2 bg-blue-600 text-white rounded">New Assignment</Link>
            </div>

            <div className="space-y-6">
                {employees.map(emp => (
                    <div key={emp.id} className="p-4 border rounded">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold">{emp.name}</h3>
                                <div className="text-sm text-gray-600">ID: {emp.employee_id}</div>
                            </div>
                            <div>
                                <a href={route('employee-rosters.edit', emp.id)} className="text-sm text-blue-600">Edit</a>
                            </div>
                        </div>

                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-4 gap-2">
                            {days.map(d => {
                                const assigned = emp.rosters?.find(r => r.day_of_week === d);
                                return (
                                    <div key={d} className="p-2 border rounded flex justify-between items-center">
                                        <div>
                                            <div className="text-sm font-medium">{d}</div>
                                            <div className="text-xs text-gray-600">{assigned ? assigned.roster?.roster_name : <span className="italic text-gray-400">Not set</span>}</div>
                                        </div>
                                        {assigned && <div className="text-xs text-gray-500">[{assigned.roster_id}]</div>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewRosterAssign;