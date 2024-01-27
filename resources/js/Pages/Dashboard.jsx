import DashboardCard from "@/backend/Components/DashboardCard";
import Layout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head } from "@inertiajs/react";
import React from "react";

const AdminDashboard = ({ auth }) => {
     const cardsData = [
        { id: 1, title: 'Card 1', description: 'Description for Card 1', imageUrl: 'https://placekitten.com/400/300' },
        { id: 2, title: 'Card 2', description: 'Description for Card 2', imageUrl: 'https://placekitten.com/400/301' },
        { id: 3, title: 'Card 3', description: 'Description for Card 2', imageUrl: 'https://placekitten.com/400/301' },
        { id: 4, title: 'Card 4', description: 'Description for Card 2', imageUrl: 'https://placekitten.com/400/301' },
        { id: 5, title: 'Card 5', description: 'Description for Card 2', imageUrl: 'https://placekitten.com/400/301' },
        { id: 6, title: 'Card 6', description: 'Description for Card 2', imageUrl: 'https://placekitten.com/400/301' },
        // Add more card data as needed
    ];

    return (
        <Layout
            user={auth.user}
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h1>
            }
        >
            <Head title="Dashboard" />

                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-center">
                {cardsData.map(card => (
                    <div key={card.id} className="m-2">
                        <DashboardCard {...card} />
                    </div>
                ))}
                </div>
        </Layout>
    );
};

export default AdminDashboard;
