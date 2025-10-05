import React, { useRef, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { useReactToPrint } from 'react-to-print';

const PayrollReport = ({ attendances = [], employees = [], filters = {} }) => {
    const { data, setData, get } = useForm({
        start_date: filters?.start_date || '',
        end_date: filters?.end_date || '',
        employee_id: filters?.employee_id || 'all',
        status: filters?.status || 'all',
    });

    const [loading, setLoading] = useState(false);

    const tableRef = useRef(); // 🔹 print reference

    const handlePrint = useReactToPrint({
        content: () => tableRef.current,
        documentTitle: `Attendance_Report_${new Date().toISOString().split('T')[0]}`,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        get('/attendance', {
            preserveScroll: true,
            data,
            onFinish: () => setLoading(false),
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Present': return 'text-green-600 font-semibold';
            case 'Late': return 'text-orange-600 font-semibold';
            case 'Absent': return 'text-gray-500 font-semibold';
            case 'Leave': return 'text-blue-600 font-semibold';
            case 'Holiday': return 'text-purple-600 font-semibold';
            case 'Weekly Off': return 'text-indigo-600 font-semibold';
            default: return 'text-black';
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Head title="Attendance Report" />
            <h1 className="text-2xl font-semibold mb-6 text-gray-800">Attendance Report</h1>

            {/* Filter Form */}
            <form onSubmit={handleSubmit} className="mb-4 flex flex-wrap items-center gap-3">
                <input
                    type="date"
                    value={data.start_date}
                    onChange={e => setData('start_date', e.target.value)}
                    className="border p-2 rounded w-40"
                />
                <input
                    type="date"
                    value={data.end_date}
                    onChange={e => setData('end_date', e.target.value)}
                    className="border p-2 rounded w-40"
                />
                <select
                    value={data.employee_id}
                    onChange={e => setData('employee_id', e.target.value)}
                    className="border p-2 rounded w-48"
                >
                    <option value="all">All Employees</option>
                    {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.name}</option>
                    ))}
                </select>
                <select
                    value={data.status}
                    onChange={e => setData('status', e.target.value)}
                    className="border p-2 rounded w-40"
                >
                    <option value="all">All</option>
                    <option value="Present">Present</option>
                    <option value="Late">Late</option>
                    <option value="Absent">Absent</option>
                    <option value="Leave">Leave</option>
                    <option value="Holiday">Holiday</option>
                    <option value="Weekly Off">Weekly Off</option>
                </select>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
                    {loading ? 'Loading...' : 'Filter'}
                </button>
                <button type="button" onClick={handlePrint} className="px-4 py-2 bg-green-600 text-white rounded">
                    Print / PDF
                </button>
            </form>

            {/* Table */}
            <div ref={tableRef} className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full border border-gray-200 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-3">#</th>
                            <th className="border p-3">Employee Name</th>
                            <th className="border p-3">Date</th>
                            <th className="border p-3">In Time</th>
                            <th className="border p-3">Out Time</th>
                            <th className="border p-3">Status</th>
                            <th className="border p-3">Remarks</th>
                            <th className="border p-3">Source</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(attendances || []).length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center p-4 text-gray-500">No attendance data</td>
                            </tr>
                        ) : (
                            (attendances || []).map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="border p-3">{index + 1}</td>
                                    <td className="border p-3">{item.employee?.name ?? '-'}</td>
                                    <td className="border p-3">{item.date}</td>
                                    <td className="border p-3">{item.in_time ?? '-'}</td>
                                    <td className="border p-3">{item.out_time ?? '-'}</td>
                                    <td className={`border p-3 ${getStatusColor(item.status)}`}>{item.status}</td>
                                    <td className="border p-3">{item.remarks ?? '-'}</td>
                                    <td className="border p-3">{item.source ?? '-'}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PayrollReport;
