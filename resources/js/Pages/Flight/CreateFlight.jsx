import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

const CreateFlight = () => {
    const { data, setData, post, reset, errors } = useForm({
        name: "",
        airline: "",
        status: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("flights.store"), {
            onSuccess: () => reset(), // Reset the form after successful submission
        });
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
            <h1 className="text-2xl font-bold mb-6">Create New Flight</h1>
            <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Airline Field */}
                <div className="mb-4">
                    <label
                        htmlFor="airline"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Airline
                    </label>
                    <input
                        id="airline"
                        type="text"
                        value={data.airline}
                        onChange={(e) => setData("airline", e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.airline && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.airline}
                        </p>
                    )}
                </div>

                {/* Status Field */}
                <div className="mb-4">
                    <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Status
                    </label>
                    <select
                        id="status"
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Select Status</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Delayed">Delayed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    {errors.status && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.status}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Create Flight
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateFlight;
