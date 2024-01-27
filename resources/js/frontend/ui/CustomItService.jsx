import React from 'react';

const CustomItService = () => {
    return (
        <>
        <div className="flex flex-col w-full border-opacity-50 mt-4">
            <div className="divider lg:text-2xl">
                Custom IT Services & solutions for your business
            </div>
        </div>

    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-auto mx-auto">
    {[
    { title: "IT Support", description: "Supporting your business with IT services" },
    { title: "Managed IT", description: "Maintenance & monitoring your networks" },
    { title: "Cybersecurity", description: "Protecting your network" },
        ].map((service, index) => (
    <div
    key={index}
    className="relative overflow-hidden border-t-[20px] border-indigo-600 shadow-2xl p-4 m-2"
    style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        height: "300px",
    }}
    >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-blue-600">
            <h2 className="text-2xl font-bold mb-4">
                {service.title}
            </h2>
            <p className="text-lg">
                {service.description}
            </p>
        </div>
    </div>
        ))}
   </div>
        </>
    );
};


export default CustomItService;