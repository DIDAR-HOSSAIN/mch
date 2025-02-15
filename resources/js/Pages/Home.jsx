import React from "react";
import FrontendLayout from "@/frontend/Layout/FrontendLayout";
import { Head } from "@inertiajs/react";
import HomeSearch from "@/frontend/ui/HomeSearch";

const Home = ({ auth, results }) => {
    return (
        <FrontendLayout
            user={auth.user}
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    Home
                </h1>
            }
        >
            <Head title="Home" />

            <HomeSearch results={results} />     

            {/* <Carousel />
            <OurNetworkService />
            <Fold />
            <WhyChooseUs />
            <FreeEvaluation />
            <CustomItService />
            <YourNetwork /> */}
        </FrontendLayout>
    );
};

export default Home;
