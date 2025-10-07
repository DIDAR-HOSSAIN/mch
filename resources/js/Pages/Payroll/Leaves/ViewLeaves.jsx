import AdminDashboardLayout from '@/backend/Dashboard/AdminDashboardLayout';
import { Head, Link, router } from '@inertiajs/react';
import Swal from 'sweetalert2';

const ViewLeaves = ({ auth, leaves }) => {
    // ✅ Delete function with SweetAlert confirmation
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This leave will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/leaves/${id}`, {
                    onSuccess: () => {
                        Swal.fire('Deleted!', 'Leave deleted successfully.', 'success');
                    },
                });
            }
        });
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    View Leaves
                </h1>
            }
        >
            <Head title=" View Leaves" />
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-bold">Leave Records</h2>
                    <Link
                        href="/leave/create"
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    >
                        + Add Leave
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border">
                        <thead className="bg-gray-100">
                            <tr className="text-left">
                                <th className="p-2 border">#</th>
                                <th className="p-2 border">Employee ID</th>
                                <th className="p-2 border">Start Date</th>
                                <th className="p-2 border">End Date</th>
                                <th className="p-2 border">Reason</th>
                                <th className="p-2 border">Status</th>
                                <th className="p-2 border text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaves.length > 0 ? (
                                leaves.map((leave, index) => (
                                    <tr key={leave.id} className="hover:bg-gray-50 text-sm">
                                        <td className="border p-2">{index + 1}</td>
                                        <td className="border p-2">{leave.employee_id}</td>
                                        <td className="border p-2">{leave.start_date}</td>
                                        <td className="border p-2">{leave.end_date}</td>
                                        <td className="border p-2">{leave.reason}</td>
                                        <td
                                            className={`border p-2 font-semibold ${leave.status === 'Approved'
                                                    ? 'text-green-600'
                                                    : leave.status === 'Rejected'
                                                        ? 'text-red-600'
                                                        : 'text-yellow-600'
                                                }`}
                                        >
                                            {leave.status}
                                        </td>
                                        <td className="border p-2 text-center space-x-3">
                                            <Link
                                                href={route("leave.edit", leave.id)}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(leave.id)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="text-center p-4 text-gray-500"
                                    >
                                        No leaves found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default ViewLeaves;
