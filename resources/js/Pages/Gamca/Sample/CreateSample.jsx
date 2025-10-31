import React, { useState } from 'react';
import { Inertia } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

const Index = ({ entries, filters }) => {
    const [search, setSearch] = useState(filters.search || '');
    const [form, setForm] = useState({ first_name: '', last_name: '', passport_no: '', pre_medical_id: '', serial_no: '' });

    const handleAdd = (e) => {
        e.preventDefault();
        Inertia.post('/sample-entries', form);
        setForm({ first_name: '', last_name: '', passport_no: '', pre_medical_id: '', serial_no: '' });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        Inertia.get('/sample-entries', { search });
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Sample Entries</h1>

            {/* Add Form */}
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input type="text" placeholder="First Name" value={form.first_name} onChange={e => setForm({ ...form, first_name: e.target.value })} className="border px-2 py-1 rounded" required />
                <input type="text" placeholder="Last Name" value={form.last_name} onChange={e => setForm({ ...form, last_name: e.target.value })} className="border px-2 py-1 rounded" />
                <input type="text" placeholder="Passport No" value={form.passport_no} onChange={e => setForm({ ...form, passport_no: e.target.value })} className="border px-2 py-1 rounded" />
                <input type="text" placeholder="Pre Medical ID" value={form.pre_medical_id} onChange={e => setForm({ ...form, pre_medical_id: e.target.value })} className="border px-2 py-1 rounded" />
                <input type="text" placeholder="Serial No" value={form.serial_no} onChange={e => setForm({ ...form, serial_no: e.target.value })} className="border px-2 py-1 rounded" />
                <button type="submit" className="bg-blue-600 text-white rounded px-4 py-1 col-span-1 md:col-span-3">Add Entry</button>
            </form>

            {/* Search */}
            <form onSubmit={handleSearch} className="mb-4 flex gap-2">
                <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} className="border px-2 py-1 rounded w-full" />
                <button type="submit" className="bg-gray-600 text-white px-4 py-1 rounded">Search</button>
            </form>

            {/* Table */}
            <table className="w-full border border-gray-300 border-collapse text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2 text-left">First Name</th>
                        <th className="border p-2 text-left">Last Name</th>
                        <th className="border p-2 text-left">Passport No</th>
                        <th className="border p-2 text-left">Serial No</th>
                        <th className="border p-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.data.map(entry => (
                        <tr key={entry.id} className="even:bg-gray-50">
                            <td className="border p-2">{entry.first_name}</td>
                            <td className="border p-2">{entry.last_name}</td>
                            <td className="border p-2">{entry.passport_no}</td>
                            <td className="border p-2">{entry.serial_no}</td>
                            <td className="border p-2 text-center space-x-2">
                                <Link href={`/sample-entries/${entry.id}/print`} className="text-green-600 hover:underline" target="_blank">Print</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Index;
