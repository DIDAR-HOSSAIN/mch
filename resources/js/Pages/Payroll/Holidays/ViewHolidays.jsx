import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminDashboardLayout from '@/backend/Dashboard/AdminDashboardLayout';

const ViewHolidays = ({ auth, holidays }) => {
    return (
        <AdminDashboardLayout
            user={auth.user}
            header={<h1 className="font-semibold text-xl text-gray-800 leading-tight">Holidays</h1>}
        >
            <Head title="Holidays List" />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Holidays</h2>
                    <Link
                        href={route('holidays.create')}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Add Holiday
                    </Link>
                </div>

                <div className="overflow-x-auto bg-white rounded shadow-md">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {holidays.data.length > 0 ? (
                                holidays.data.map((holiday) => (
                                    <tr key={holiday.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 whitespace-nowrap">{holiday.date}</td>
                                        <td className="px-4 py-2 whitespace-nowrap">{holiday.title}</td>
                                        <td className="px-4 py-2 whitespace-nowrap">{holiday.description}</td>
                                        <td className="px-4 py-2 whitespace-nowrap flex space-x-2">
                                            <Link
                                                href={route('holidays.edit', holiday.id)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                href={route('holidays.destroy', holiday.id)}
                                                method="delete"
                                                as="button"
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                                        No holidays found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {holidays.links && (
                    <div className="mt-4 flex justify-center space-x-2 flex-wrap">
                        {holidays.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`px-3 py-1 rounded border text-sm ${link.active
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AdminDashboardLayout>
    );
};

export default ViewHolidays;
