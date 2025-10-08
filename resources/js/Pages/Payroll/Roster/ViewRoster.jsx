import AdminDashboardLayout from '@/backend/Dashboard/AdminDashboardLayout';
import { Head, useForm } from '@inertiajs/react';


const ViewRoster = ({ auth, rosters }) => {
    const { data, setData, post, reset } = useForm({
        roster_name: '',
        office_start: '09:00',
        office_end: '17:00',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/rosters', { onSuccess: () => reset() });
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    View Rosters
                </h1>
            }
        >
            <Head title=" View Rosters" />
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow">
                <h2 className="text-xl font-bold mb-4">Create Roster</h2>
                <form onSubmit={submit} className="space-y-4">
                    <input type="text" value={data.roster_name} onChange={(e) => setData('roster_name', e.target.value)} placeholder="Roster Name" className="w-full border p-2 rounded" />
                    <div className="grid grid-cols-2 gap-3">
                        <input type="time" value={data.office_start} onChange={(e) => setData('office_start', e.target.value)} className="border p-2 rounded" />
                        <input type="time" value={data.office_end} onChange={(e) => setData('office_end', e.target.value)} className="border p-2 rounded" />
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
                </form>
            </div>

            <div className="mt-6">
                <h3 className="font-semibold mb-2">All Rosters</h3>
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Start</th>
                            <th className="p-2 border">End</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rosters.map((r) => (
                            <tr key={r.id}>
                                <td className="border p-2">{r.roster_name}</td>
                                <td className="border p-2">{r.office_start}</td>
                                <td className="border p-2">{r.office_end}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminDashboardLayout>
    );
};

export default ViewRoster;
