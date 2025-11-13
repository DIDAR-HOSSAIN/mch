import React from "react";
import Barcode from "react-barcode";

const BarcodeLabel = ({ entry }) => {
    const widthCm = 4; // 4cm
    const heightCm = 2.5; // 2.5cm

    return (
        <div
            style={{
                width: `${widthCm}cm`,
                height: `${heightCm}cm`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid black",
                padding: "2px",
            }}
        >
            <p style={{ fontSize: "10px", margin: 0 }}>{entry.pre_medical_id}</p>
            <Barcode value={entry.pre_medical_id} width={1} height={30} displayValue={false} />
            <p style={{ fontSize: "10px", margin: 0 }}>{entry.collection_date}</p>
        </div>
    );
};

export default BarcodeLabel;
