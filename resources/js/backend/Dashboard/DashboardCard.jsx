import React from "react";

const DashboardCard = ({ title, value, imageUrl }) => {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md p-4">
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-32 object-cover mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="font-semibold text-4xl">{value}</p>
        </div>
    );
};

export default DashboardCard;
