import React, { useState, useRef } from "react";
import { router, usePage } from "@inertiajs/react";
import Barcode from "react-barcode";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

export default function CreateUpdateSample() {
    const { patient: initialPatient, search: initialSearch, auth } = usePage().props;
    const [searchInput, setSearchInput] = useState(initialSearch || "");
    const [patient, setPatient] = useState(initialPatient || null);
    const [form, setForm] = useState({
        pre_medical_id: initialPatient?.pre_medical_id || "",
        collection_date: "",
    });
    const [barcode, setBarcode] = useState(null);

    const printRef = useRef();

    // 🔹 React-to-print hook
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: `${form.pre_medical_id}_label`,
    });

    // 🔍 Search patient
    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchInput) return;

        router.get(route("premedical-sample.create"), { search: searchInput }, {
            onSuccess: (page) => {
                setPatient(page.props.patient || null);
                setForm({
                    pre_medical_id: page.props.patient?.pre_medical_id || "",
                    collection_date: "",
                });
                setBarcode(null);
            },
        });
    };

    // 💾 Save and print
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!patient) return;

        try {
            const response = await axios.post(route("premedical-sample.store"), form);
            setBarcode(response.data.sample?.barcode_no || form.pre_medical_id);

            // 🔹 Print label after save
            setTimeout(() => {
                handlePrint();
            }, 300);
        } catch (err) {
            console.error(err);
            alert("Error saving sample");
        }
    };

    return (
        <div className="p-6 bg-white shadow rounded max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-4 text-center">
                Pre-Medical Sample Label
            </h2>

            {/* 🔹 Search Form */}
            <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search by Pre-Medical ID or Passport..."
                    className="border rounded p-2 flex-1"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    Search
                </button>
            </form>

            {/* 🔹 Patient Info */}
            {patient && (
                <div className="border p-4 rounded mb-4 bg-gray-50 text-sm space-y-1">
                    <p><b>ID:</b> {patient.pre_medical_id}</p>
                    <p><b>Passport:</b> {patient.passport_no}</p>
                    <p><b>Name:</b> {patient.first_name} {patient.last_name}</p>
                </div>
            )}

            {/* 🔹 Sample Form */}
            {patient && (
                <form onSubmit={handleSubmit} className="border-t pt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            value={form.pre_medical_id}
                            readOnly
                            className="border p-2 rounded bg-gray-100"
                        />
                        <input
                            type="date"
                            value={form.collection_date}
                            onChange={(e) =>
                                setForm({ ...form, collection_date: e.target.value })
                            }
                            className="border p-2 rounded"
                            required
                        />
                    </div>
                    <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded">
                        Save & Print Label
                    </button>
                </form>
            )}

            {/* 🔹 Barcode Preview for printing */}
            {barcode && (
                <div style={{ display: "none" }}>
                    <div ref={printRef} className="text-center border p-3 inline-block"
                        style={{ width: "4cm", height: "2.5cm", padding: "0.2cm" }}
                    >
                        <div className="text-sm font-semibold mb-1">{barcode}</div>
                        <Barcode value={barcode} width={1} height={40} displayValue={false} />
                        <div className="text-xs mt-1">{auth?.user?.name || "Collected By"}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
