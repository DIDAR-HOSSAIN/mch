import React, { useRef, useState } from "react";
import { usePage, router, Head } from "@inertiajs/react";
import { useReactToPrint } from "react-to-print";
import BarcodeLabel from "./BarcodeLabel";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

export default function ViewSample({ auth }) {
    const { samples } = usePage().props;
    const [selectedSample, setSelectedSample] = useState(null);
    const printRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: selectedSample?.barcode_no || "Sample Label",
    });

    // Print barcode
    const printBarcode = (sample) => {
        setSelectedSample(sample);
        setTimeout(() => handlePrint(), 300);
    };

    // Edit collection date
    const handleEdit = (id) => {
        const newDate = prompt("Enter new collection date (YYYY-MM-DD):");
        if (!newDate) return;
        router.put(route("premedical-sample.update", id), { collection_date: newDate });
    };

    // Delete sample
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this sample?")) {
            router.delete(route("premedical-sample.destroy", id));
        }
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold">Pre Medical Sample List</h2>}
        >
            <Head title="Pre Medical Sample List" />
            <div className="p-6 bg-white shadow rounded">
                <h2 className="text-lg font-semibold mb-4 text-center">Sample List</h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full border text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-2 py-1 text-center">#</th>
                                <th className="border px-2 py-1 text-center">Pre Medical ID</th>
                                <th className="border px-2 py-1 text-center">Barcode</th>
                                <th className="border px-2 py-1 text-center">Date</th>
                                <th className="border px-2 py-1 text-center">User</th>
                                <th className="border px-2 py-1 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {samples.length > 0 ? (
                                samples.map((sample, index) => (
                                    <tr key={sample.id} className="hover:bg-gray-50">
                                        <td className="border px-2 py-1 text-center">{index + 1}</td>
                                        <td className="border px-2 py-1 text-center">{sample.pre_medical_id}</td>
                                        <td className="border px-2 py-1 text-center">{sample.barcode_no}</td>
                                        <td className="border px-2 py-1 text-center">{sample.collection_date}</td>
                                        <td className="border px-2 py-1 text-center">{sample.user_name}</td>
                                        <td className="border px-2 py-1 text-center space-x-1 flex justify-center">
                                            <button
                                                onClick={() => printBarcode(sample)}
                                                className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                                            >
                                                Print
                                            </button>
                                            <button
                                                onClick={() => handleEdit(sample.id)}
                                                className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(sample.id)}
                                                className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-gray-500">
                                        No samples found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Hidden print content */}
                {selectedSample && (
                    <div style={{ display: "none" }}>
                        <div ref={printRef}>
                            <BarcodeLabel entry={selectedSample} />
                        </div>
                    </div>
                )}
            </div>
        </AdminDashboardLayout>
    );
}
