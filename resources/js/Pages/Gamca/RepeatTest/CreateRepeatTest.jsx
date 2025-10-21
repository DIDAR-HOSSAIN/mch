import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

const CreateRepeatTest = ({ tests }) => {
    const { data, setData, post, processing, errors } = useForm({
        pre_medical_id: '', // এখন preMedical.id নেই
        delivery_date: '',
        is_free: false,
        deduct: 0,
        total: 0,
        net_pay: 0,
        items: [],
    });

    const handleCheckbox = (test, checked) => {
        let newItems = [...data.items];
        if (checked) {
            newItems.push({
                medical_test_id: test.id,
                amount: test.fee,
            });
        } else {
            newItems = newItems.filter(i => i.medical_test_id !== test.id);
        }
        setData('items', newItems);
    };

    useEffect(() => {
        const total = data.items.reduce((sum, item) => sum + Number(item.amount), 0);
        const net = data.is_free ? 0 : total - Number(data.deduct || 0);
        setData('total', total);
        setData('net_pay', net);
    }, [data.items, data.is_free, data.deduct]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('repeat-test.store'));
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4">Repeat Test Entry</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label>Delivery Date:</label>
                    <input
                        type="date"
                        className="border p-2 w-full"
                        value={data.delivery_date}
                        onChange={e => setData('delivery_date', e.target.value)}
                    />
                    {errors.delivery_date && <p className="text-red-500 text-sm">{errors.delivery_date}</p>}
                </div>

                <div className="border p-3 rounded">
                    <h3 className="font-semibold mb-2">Select Tests</h3>
                    <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                        {tests.map(test => (
                            <label key={test.id} className="flex justify-between items-center border p-2 rounded">
                                <span>{test.test_name} ({test.fee} TK)</span>
                                <input
                                    type="checkbox"
                                    onChange={e => handleCheckbox(test, e.target.checked)}
                                    checked={data.items.some(i => i.medical_test_id === test.id)}
                                />
                            </label>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <label>Total: <input type="number" value={data.total} readOnly className="border p-2 w-full" /></label>
                    <label>Deduct: <input type="number" value={data.deduct} onChange={e => setData('deduct', e.target.value)} className="border p-2 w-full" /></label>
                    <label>
                        <input type="checkbox" checked={data.is_free} onChange={e => setData('is_free', e.target.checked)} />
                        &nbsp; Free
                    </label>
                    <label>Net Pay: <input type="number" value={data.net_pay} readOnly className="border p-2 w-full" /></label>
                </div>

                <button disabled={processing} className="bg-blue-600 text-white px-4 py-2 rounded">
                    {processing ? 'Saving...' : 'Save'}
                </button>
            </form>
        </div>
    );
};

export default CreateRepeatTest;
