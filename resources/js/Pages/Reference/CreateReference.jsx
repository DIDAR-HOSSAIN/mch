import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const CreateReference = ({ auth }) => {
    const { data, setData, post, processing, errors } = useForm({
        reference_name: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("references.store"));
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Reference
                </h1>
            }
        >
            <Head title="Create Reference" />
            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        htmlFor="reference_name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Reference Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.reference_name}
                                        onChange={(e) =>
                                            setData(
                                                "reference_name",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        required
                                    />
                                    {errors.reference_name && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.reference_name}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 active:bg-indigo-600 disabled:opacity-25 transition ease-in-out duration-150"
                                >
                                    {processing ? "Creating..." : "Create"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default CreateReference;
