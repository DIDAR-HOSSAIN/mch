import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Barcode from "react-barcode";
import axios from "axios";

export default function ViewSample() {
    const { samples, search: initialSearch } = usePage().props;
    const [search, setSearch] = useState(initialSearch || "");
    const [form, setForm] = useState({
        pre_medical_id: "",
        sample_type: "",
        collection_date: "",
        collected_by: "",
    });
    const [barcode, setBarcode] = useState(null);

    // 🔍 Search
    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("premedical-sample.index"), { search }, { preserveState: true });
    };

    // 🧾 Select patient from search result
    const handleSelect = (pre_medical_id) => {
        setForm({
            ...form,
            pre_medical_id,
        });
    };

    // 💾 Submit and Print Barcode
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(route("premedical-sample.store"), form);
        const code = response.data.sample.barcode_no;
        setBarcode(code);
        printBarcode(code);
    };

    // 🖨️ Print using Rongta Printer
    const printBarcode = (code) => {
        const printWindow = window.open("", "_blank", "width=400,height=250");
        printWindow.document.write(`
            <html>
                <head><title>Barcode Print</title></head>
                <body style="margin:0;display:flex;align-items:center;justify-content:center;">
                    <div style="text-align:center;font-size:12px;">
                        <div>${code}</div>
                        <svg id="barcode"></svg>
                    </div>
                    <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js"></script>
                    <script>
                        JsBarcode("#barcode", "${code}", { width: 1.5, height: 40, displayValue: false });
                        window.print();
                        setTimeout(() => window.close(), 500);
                    </script>
                </body>
            </html>
        `);
        printWindow.document.close();
    };

    return (
        <div className="p-6 bg-white shadow rounded">
            <h2 className="text-lg font-semibold mb-4">Pre-Medical Sample Collection</h2>

            {/* 🔍 Search Box */}
            <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by Pre-Medical ID, Passport, or Name..."
                    className="border rounded p-2 flex-1"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
            </form>

            {/* 📋 Search Results */}
            {samples.data.length > 0 ? (
                <table className="w-full border mb-4 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">Pre ID</th>
                            <th className="border p-2">Passport</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {samples.data.map((p) => (
                            <tr key={p.id}>
                                <td className="border p-2">{p.pre_medical_id}</td>
                                <td className="border p-2">{p.passport_no}</td>
                                <td className="border p-2">{p.first_name} {p.last_name}</td>
                                <td className="border p-2 text-center">
                                    <button
                                        onClick={() => handleSelect(p.pre_medical_id)}
                                        className="bg-green-600 text-white px-3 py-1 rounded"
                                    >
                                        Select
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-500">No records found.</p>
            )}

            {/* 🧪 Sample Entry Form */}
            {form.pre_medical_id && (
                <form onSubmit={handleSubmit} className="mt-6 border-t pt-4">
                    <h3 className="font-semibold mb-2">
                        Sample Entry for: {form.pre_medical_id}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Sample Type"
                            value={form.sample_type}
                            onChange={(e) =>
                                setForm({ ...form, sample_type: e.target.value })
                            }
                            className="border p-2 rounded"
                            required
                        />
                        <input
                            type="date"
                            value={form.collection_date}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    collection_date: e.target.value,
                                })
                            }
                            className="border p-2 rounded"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Collected By"
                            value={form.collected_by}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    collected_by: e.target.value,
                                })
                            }
                            className="border p-2 rounded"
                        />
                    </div>
                    <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded">
                        Save & Print Barcode
                    </button>
                </form>
            )}

            {/* 🧾 Show Barcode */}
            {barcode && (
                <div
                    className="mt-6 text-center border p-3 inline-block"
                    style={{
                        width: "4cm",
                        height: "2.5cm",
                        padding: "0.2cm",
                        border: "1px solid #000",
                    }}
                >
                    <div className="text-sm font-semibold">{barcode}</div>
                    <Barcode
                        value={barcode}
                        width={1}
                        height={40}
                        displayValue={false}
                    />
                </div>
            )}
        </div>
    );
}
