import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

const CreateMolecularResult = ({ sample }) => {
    const [results, setResults] = useState([]);
    const { data, setData, post } = useForm({
        sample_id: sample.id,
        investigation: "",
        result: "",
        unit: "",
        methodology: "",
        remarks: "",
        comments: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/results", {
            onSuccess: () => {
                setResults([...results, data]);
                setData({
                    ...data,
                    investigation: "",
                    result: "",
                    unit: "",
                    methodology: "",
                    remarks: "",
                    comments: "",
                });
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Investigation"
                value={data.investigation}
                onChange={(e) => setData("investigation", e.target.value)}
            />
            <input
                type="text"
                placeholder="Result"
                value={data.result}
                onChange={(e) => setData("result", e.target.value)}
            />
            <input
                type="text"
                placeholder="Unit"
                value={data.unit}
                onChange={(e) => setData("unit", e.target.value)}
            />
            <input
                type="text"
                placeholder="Methodology"
                value={data.methodology}
                onChange={(e) => setData("methodology", e.target.value)}
            />
            <textarea
                placeholder="Remarks"
                value={data.remarks}
                onChange={(e) => setData("remarks", e.target.value)}
            />
            <textarea
                placeholder="Comments"
                value={data.comments}
                onChange={(e) => setData("comments", e.target.value)}
            />
            <button type="submit">Add Result</button>
        </form>
    );
};

export default CreateMolecularResult;
