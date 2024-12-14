import React from 'react';

const CreateMolecularResult = () => {
    return (
        <div>
            <Link href={route('results.create', { patient_id: 'MCHM-241212-001' })}>
    Create Results
</Link>

        </div>
    );
};

export default CreateMolecularResult;