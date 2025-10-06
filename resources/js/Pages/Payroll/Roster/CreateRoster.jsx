import AdminDashboardLayout from '@/backend/Dashboard/AdminDashboardLayout';
import { useForm } from '@inertiajs/react';


const CreateRoster = () => {
    const { data, setData, post, processing, reset, errors } = useForm({
        roster_name: '',
        office_start: '09:00',
        office_end: '17:00',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/rosters', { onSuccess: () => reset() });
    };

    return (
        <AdminDashboardLayout title="Create Roster">
            <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md">
                <h2 className="text-xl font-bold mb-5 text-center">Create New Roster</h2>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Roster Name</label>
                        <input
                            type="text"
                            value={data.roster_name}
                            onChange={(e) => setData('roster_name', e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        {errors.roster_name && <p className="text-red-500 text-sm">{errors.roster_name}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium mb-1">Office Start</label>
                            <input type="time" value={data.office_start} onChange={(e) => setData('office_start', e.target.value)} className="border p-2 rounded w-full" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Office End</label>
                            <input type="time" value={data.office_end} onChange={(e) => setData('office_end', e.target.value)} className="border p-2 rounded w-full" />
                        </div>
                    </div>
                    <button disabled={processing} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
                        {processing ? 'Saving...' : 'Save Roster'}
                    </button>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default CreateRoster;
