import AdminDashboardLayout from '@/backend/Dashboard/AdminDashboardLayout';
import { Head, Link } from '@inertiajs/react';
import React, { useRef } from 'react';
import Barcode from "react-barcode";
import { useReactToPrint } from 'react-to-print';

const BarcodeGenerate = ({auth, barcodeData}) => {

    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: `${barcodeData.patient_id || "N/A"}`,
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
        content: () => contentToPrint.current,
        pageStyle: `
                @page {
                    size: B4;
                    margin: 0;
                }
            `,
    });

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Barcode Generate
                </h2>
            }
        >
            <Head title="Barcode Generate" />

            <div className="flex justify-center mt-2 space-x-4">
                <Link
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    href={route("sample.create")}
                >
                    Sample Input
                </Link>

                <button
                    onClick={() => {
                        handlePrint(null, () => contentToPrint.current);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Print
                </button>
            </div>

            <div className="text-center my-4" ref={contentToPrint}>
                <div className="mx-auto" style={{ width: "200px" }}>
                    <Barcode
                        value={barcodeData.patient_id || "N/A"}
                        width={1} // Set the desired width (in pixels)
                        height={50} // Set the desired height (in pixels)
                    />
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default BarcodeGenerate;