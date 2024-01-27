import FrontendLayout from '@/frontend/Layout/FrontendLayout';
import Contact from '@/frontend/ui/Contact';
import { Head } from '@inertiajs/react';
import React from 'react';

const Create = () => {
    return (
        <FrontendLayout
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    About Page
                </h1>
            }
        >
            <Head className="text-2xl font-semibold mb-4" title="Contact Page" />
            <Contact />
        </FrontendLayout>
    );
};

export default Create;