import AdminDashboardLayout from '@/backend/Dashboard/AdminDashboardLayout';
import { useForm } from '@inertiajs/react';


const CreateHoliday = () => {
    const { data, setData, post, processing, reset, errors } = useForm({
        date: '',
        title: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/holidays', { onSuccess: () => reset() });
    };

    return (
        <AdminDashboardLayout title="Create Holiday">
            <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md">
                <h2 className="text-xl font-bold mb-5 text-center">Add New Holiday</h2>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Date</label>
                        <input type="date" value={data.date} onChange={(e) => setData('date', e.target.value)} className="w-full border p-2 rounded" />
                        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input type="text" value={data.title} onChange={(e) => setData('title', e.target.value)} className="w-full border p-2 rounded" placeholder="Title (optional)" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} className="w-full border p-2 rounded" placeholder="Description (optional)" />
                    </div>
                    <button disabled={processing} className="bg-green-600 text-white px-4 py-2 rounded w-full">
                        {processing ? 'Saving...' : 'Save Holiday'}
                    </button>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default CreateHoliday;
