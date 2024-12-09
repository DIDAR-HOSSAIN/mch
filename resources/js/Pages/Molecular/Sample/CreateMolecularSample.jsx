import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

const CreateMolecularSample = ({ patient }) => {
    const { data, setData, post, reset } = useForm({
        patient_id: patient.id,
        sample_code: "",
        test_id: "",
        collection_date: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/samples", {
            onSuccess: () => reset(),
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Sample Code"
                value={data.sample_code}
                onChange={(e) => setData("sample_code", e.target.value)}
            />
            <select
                value={data.test_id}
                onChange={(e) => setData("test_id", e.target.value)}
            >
                <option value="">Select Test</option>
                <option value="1">Hepatitis B Virus (HBV)</option>
                <option value="2">Hepatitis C Virus (HCV)</option>
                <option value="3">Human Leukocyte Antigen (HLA B27)</option>
                <option value="4">Human Papilloma Virus (HPV)</option>
            </select>
            <input
                type="date"
                value={data.collection_date}
                onChange={(e) => setData("collection_date", e.target.value)}
            />
            <button type="submit">Collect Sample</button>
        </form>
    );
};

export default CreateMolecularSample;
