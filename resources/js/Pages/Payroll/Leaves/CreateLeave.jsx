import AdminDashboardLayout from '@/backend/Dashboard/AdminDashboardLayout';
import { useForm } from '@inertiajs/react';


const CreateLeave = () => {
    const { data, setData, post, processing, reset, errors } = useForm({
        employee_id: '',
        start_date: '',
        end_date: '',
        reason: '',
        status: 'Pending',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/leaves', { onSuccess: () => reset() });
    };

    return (
        <AdminDashboardLayout title="Create Leave">
            <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md">
                <h2 className="text-xl font-bold mb-5 text-center">Add Leave</h2>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Employee ID</label>
                        <input type="number" value={data.employee_id} onChange={(e) => setData('employee_id', e.target.value)} className="w-full border p-2 rounded" />
                        {errors.employee_id && <p className="text-red-500 text-sm">{errors.employee_id}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium mb-1">Start Date</label>
                            <input type="date" value={data.start_date} onChange={(e) => setData('start_date', e.target.value)} className="border p-2 rounded w-full" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">End Date</label>
                            <input type="date" value={data.end_date} onChange={(e) => setData('end_date', e.target.value)} className="border p-2 rounded w-full" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Reason</label>
                        <textarea value={data.reason} onChange={(e) => setData('reason', e.target.value)} className="w-full border p-2 rounded" placeholder="Reason for leave" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select value={data.status} onChange={(e) => setData('status', e.target.value)} className="w-full border p-2 rounded">
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>

                    <button disabled={processing} className="bg-purple-600 text-white px-4 py-2 rounded w-full">
                        {processing ? 'Saving...' : 'Save Leave'}
                    </button>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default CreateLeave;
