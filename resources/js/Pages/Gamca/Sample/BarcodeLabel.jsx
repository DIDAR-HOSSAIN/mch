import React from "react";
import Barcode from "react-barcode";

const BarcodeLabel = ({ entry }) => {
    const today = new Date().toLocaleDateString("en-GB");

    return (
        <div
            style={{
                width: "4cm",
                height: "2.5cm",
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                textAlign: "center",
                boxSizing: "border-box",
                paddingTop: "0.2cm",
                paddingBottom: "0.2cm",
            }}
        >
            <p
                style={{
                    fontSize: "0.45cm",
                    fontWeight: "700",
                    margin: 0,
                }}
            >
                {entry?.barcode_no}
            </p>

            <Barcode
                value={entry?.barcode_no || "00000000"}
                width={1.2}
                height={35}
                displayValue={false}
                margin={0}
                background="#fff"
                lineColor="#000"
                renderer="svg"
            />

            <p
                style={{
                    fontSize: "0.35cm",
                    fontWeight: "600",
                    margin: 0,
                }}
            >
                {entry?.collection_date || today}
            </p>
        </div>
    );
};

export default BarcodeLabel;
