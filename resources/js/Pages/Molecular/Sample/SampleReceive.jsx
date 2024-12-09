import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/react";

const SampleReceive = ({ samples }) => {
    const [filteredSamples, setFilteredSamples] = useState([]);

    useEffect(() => {
        // Filter samples that are "Collected" and not yet "Received"
        setFilteredSamples(samples.filter(sample => sample.status === "Collected"));
    }, [samples]);

    const handleReceive = (sampleId) => {
        if (confirm("Are you sure you want to mark this sample as received?")) {
            Inertia.put(`/samples/receive/${sampleId}`, {}, {
                onSuccess: () => {
                    alert("Sample marked as received successfully!");
                },
                onError: (errors) => {
                    console.error(errors);
                },
            });
        }
    };

    return (
        <div>
            <h1>Sample Receive</h1>
            {filteredSamples.length > 0 ? (
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Sample Code</th>
                            <th className="border border-gray-300 px-4 py-2">Collection Date</th>
                            <th className="border border-gray-300 px-4 py-2">Test</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSamples.map(sample => (
                            <tr key={sample.id}>
                                <td className="border border-gray-300 px-4 py-2">{sample.sample_code}</td>
                                <td className="border border-gray-300 px-4 py-2">{sample.collection_date}</td>
                                <td className="border border-gray-300 px-4 py-2">{sample.test_id}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => handleReceive(sample.id)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Mark as Received
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No samples ready for receiving.</p>
            )}
        </div>
    );
};

export default SampleReceive;
