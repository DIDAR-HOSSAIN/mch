import React, { useState, useRef, useEffect } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { useReactToPrint } from "react-to-print";
import BarcodeLabel from "./BarcodeLabel";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

export default function CreateSample({ auth }) {
    const { patient: initialPatient, search: initialSearch, flash } = usePage().props;
    const [searchInput, setSearchInput] = useState(initialSearch || "");
    const [patient, setPatient] = useState(initialPatient || null);
    const [sample, setSample] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const printRef = useRef();

    const { data, setData, post } = useForm({
        pre_medical_id: initialPatient?.pre_medical_id || "",
    });

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: `${data.pre_medical_id}_label`,
    });

    // ✅ Handle flash messages
    useEffect(() => {
        if (flash?.error) setErrorMessage(flash.error);
        else setErrorMessage("");
        if (flash?.sample) setSample(flash.sample);
    }, [flash]);

    // 🔍 Search patient
    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchInput) return;

        router.get(route("premedical-sample.create"), { search: searchInput }, {
            preserveScroll: true,
            onSuccess: (page) => {
                setPatient(page.props.patient || null);
                setData({
                    pre_medical_id: page.props.patient?.pre_medical_id || "",
                });
                setSample(null);
                setErrorMessage("");
            },
        });
    };

    // 💾 Save sample and print
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!patient) return;

        setErrorMessage("");

        post(route("premedical-sample.store"), {
            preserveScroll: true,
            onSuccess: (page) => {
                const f = page.props.flash;
                if (f?.error) {
                    setErrorMessage(f.error);
                    setSample(null);
                } else if (f?.sample) {
                    setSample(f.sample);
                    setTimeout(() => handlePrint(), 500);
                }
            },
        });
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold">Pre Medical Sample</h2>}
        >
            <Head title="Pre Medical Sample" />
            <div className="p-6 bg-white shadow rounded max-w-md mx-auto">
                <h2 className="text-lg font-semibold mb-4 text-center">Pre-Medical Sample</h2>

                {/* 🔍 Search Form */}
                <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search by ID or Passport..."
                        className="border rounded p-2 flex-1"
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
                </form>

                {/* 🧾 Patient Info */}
                {patient && (
                    <div className="border p-3 rounded bg-gray-50 text-sm mb-3 space-y-1">
                        <p><b>ID:</b> {patient.pre_medical_id}</p>
                        <p><b>Passport:</b> {patient.passport_no}</p>
                        <p><b>Name:</b> {patient.first_name} {patient.last_name}</p>
                    </div>
                )}

                {/* ⚠️ Error message */}
                {errorMessage && (
                    <div className="bg-red-100 text-red-700 p-2 mb-3 rounded text-sm text-center">
                        {errorMessage}
                    </div>
                )}

                {/* 💾 Save button */}
                {patient && (
                    <form onSubmit={handleSubmit}>
                        <button className="w-full bg-green-600 text-white py-2 rounded">
                            Save & Print
                        </button>
                    </form>
                )}

                {/* 🖨️ Hidden Print Label */}
                {sample && (
                    <div style={{ display: "none" }}>
                        <div ref={printRef}>
                            <BarcodeLabel entry={sample} />
                        </div>
                    </div>
                )}
            </div>
        </AdminDashboardLayout>
    );
}
