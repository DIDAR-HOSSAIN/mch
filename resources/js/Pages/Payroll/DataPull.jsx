import { useEffect, useState, useRef } from 'react';
import { Head, router } from '@inertiajs/react';
import { HiOutlineCheckCircle, HiOutlineExclamationTriangle } from 'react-icons/hi2';
import { FaSpinner } from 'react-icons/fa';
import AdminDashboardLayout from '@/backend/Dashboard/AdminDashboardLayout';

const AttendanceSync = ({auth}) => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const intervalRef = useRef(null);

    const syncAttendance = () => {
        if (loading) return; // একসাথে একবারই চলবে
        setLoading(true);
        setStatus(null);

        router.visit('/attendance/sync', {
            method: 'get',
            preserveScroll: true,
            onSuccess: () => {
                setStatus({ type: 'success', message: '✅ Attendance synced successfully!' });
            },
            onError: () => {
                setStatus({ type: 'error', message: '❌ Unable to sync attendance. Check device connection.' });
            },
            onFinish: () => setLoading(false),
        });
    };

    useEffect(() => {
        // 🔹 প্রতি ১ ঘন্টা পর অটো সিঙ্ক করবে
        intervalRef.current = setInterval(() => {
            console.log("⏱ Auto Sync Triggered...");
            syncAttendance();
        }, 3600000); // 3,600,000 ms = 1 hour

        // 🔹 কম্পোনেন্ট আনমাউন্ট হলে টাইমার বন্ধ করে দাও
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    Data Pull From Device
                </h1>
            }
        >
            <Head title="Data Pull From Device" />
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 px-4 py-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
                <h1 className="text-3xl font-semibold text-gray-800 mb-2">Attendance Sync</h1>
                <p className="text-sm text-gray-500 mb-6">
                    Click the button or wait — auto sync runs every <strong>1 minute</strong>.
                </p>

                {/* Status Message */}
                {status && (
                    <div
                        className={`flex items-center gap-3 mb-5 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300
                            ${status.type === 'success'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'}`}
                    >
                        {status.type === 'success' ? (
                            <HiOutlineCheckCircle size={20} />
                        ) : (
                            <HiOutlineExclamationTriangle size={20} />
                        )}
                        {status.message}
                    </div>
                )}

                {/* Sync Button */}
                <button
                    onClick={syncAttendance}
                    disabled={loading}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-white font-semibold text-lg transition duration-300
                        ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {loading ? (
                        <>
                            <FaSpinner className="animate-spin" />
                            Syncing...
                        </>
                    ) : (
                        'Sync Now'
                    )}
                </button>
            </div>
        </div>
    </AdminDashboardLayout>
    );
};

export default AttendanceSync;
