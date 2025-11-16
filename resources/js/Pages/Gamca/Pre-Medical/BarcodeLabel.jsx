import React from "react";
import Barcode from "react-barcode";

const BarcodeLabel = ({ entry }) => {
    console.log('barcode', entry);
    return (
        <div
            style={{
                width: "4cm",
                height: "2.5cm",
                margin: 0,
                padding: 0,
                backgroundColor: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Barcode
                value={entry?.pre_medical_id || "00000000"}  // ✅ Scan = ID
                width={2}         // ✅ Thick bars → full width cover
                height={80}       // ✅ Full-height barcode
                displayValue={false}
                margin={0}        // ❌ No padding
                background="#fff"
                lineColor="#000"
                renderer="svg"
            />
        </div>
    );
};

export default BarcodeLabel;
