import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

const IndexRepeatTest = ({ repeatTests, filters }) => {
    const [search, setSearch] = useState(filters.search || '');
    const [fromDate, setFromDate] = useState(filters.from_date || '');
    const [toDate, setToDate] = useState(filters.to_date || '');

    const handleFilter = (e) => {
        e.preventDefault();
        // Inertia.get('/repeat-tests', { search, from_date: fromDate, to_date: toDate }, { preserveState: true, replace: true });
    };

    return (
        <div className="p-6 bg-white shadow rounded-md max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Repeat Tests</h1>

            {/* Filters */}
            <form onSubmit={handleFilter} className="mb-4 flex flex-wrap gap-3 items-end">
                <div>
                    <label className="block text-sm font-medium">Search</label>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Name or Passport"
                        className="border rounded px-2 py-1 text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">From Date</label>
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">To Date</label>
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded text-sm">
                    Filter
                </button>
            </form>

            {/* Table */}
            <table className="w-full border border-gray-300 border-collapse text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2 text-left">Serial No</th>
                        <th className="border p-2 text-left">Passenger Name</th>
                        <th className="border p-2 text-left">Passport No</th>
                        <th className="border p-2 text-left">Delivery Date</th>
                        <th className="border p-2 text-right">Total</th>
                        <th className="border p-2 text-right">Net Pay</th>
                        <th className="border p-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {repeatTests.data.map((test) => (
                        <tr key={test.id} className="even:bg-gray-50">
                            <td className="border p-2">{test.serial_no}</td>
                            <td className="border p-2">{test.passenger_name}</td>
                            <td className="border p-2">{test.passport_no}</td>
                            <td className="border p-2">
                                {test.delivery_date
                                    ? new Date(test.delivery_date).toLocaleDateString('en-GB')
                                    : '-'}
                            </td>
                            <td className="border p-2 text-right">{parseFloat(test.total).toFixed(2)}</td>
                            <td className="border p-2 text-right">{parseFloat(test.net_pay).toFixed(2)}</td>
                            <td className="border p-2 text-center">
                                <Link
                                    href={`/repeat-tests/${test.id}/print`}
                                    className="text-green-600 hover:underline"
                                    target="_blank"
                                >
                                    Print
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4 flex justify-between items-center">
                <div>
                    Showing {repeatTests.from} to {repeatTests.to} of {repeatTests.total} entries
                </div>
                <div className="space-x-2">
                    {repeatTests.links.map((link, index) => (
                        <button
                            key={index}
                            onClick={() => Inertia.get(link.url.replace(window.location.origin, ''), {}, { preserveState: true })}
                            className={`px-3 py-1 border rounded text-sm ${link.active ? 'bg-blue-600 text-white' : ''}`}
                            disabled={!link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IndexRepeatTest;
