import React, { useEffect } from 'react';
import Barcode from 'react-barcode';

const PrintLabel = ({ entry }) => {
    useEffect(() => { setTimeout(() => window.print(), 500); }, []);

    const widthPx = 151; // 4 cm
    const heightPx = 94; // 2.5 cm

    return (
        <div className="p-2 text-center" style={{ width: widthPx, height: heightPx }}>
            <p className="text-sm mb-1">{entry.first_name} {entry.last_name}</p>
            <Barcode
                value={entry.pre_medical_id || entry.id}
                width={2}
                height={heightPx - 20}
                displayValue={true}
                fontSize={10}
                margin={0}
                renderer="svg"
            />
        </div>
    );
};

export default PrintLabel;
