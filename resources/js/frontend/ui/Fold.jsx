import React from 'react';
import foldIcon from '@/assets/images/icon.png';

const Fold = () => {
    return (
        <div className='mx-auto mt-4 text-center'>
            <div style={{ maxWidth: '100px', maxHeight: '100px', margin: '0 auto' }}>
                <img src={foldIcon} alt="Fold Icon" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </div>
            <h1 className='font-bold text-2xl text-blue-300'>Fold</h1>
        </div>
    );
};

export default Fold;
