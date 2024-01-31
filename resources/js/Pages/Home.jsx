import React from "react";
import Carousel from "@/frontend/ui/Carousel";
import CustomItService from "@/frontend/ui/CustomItService";
import Fold from "@/frontend/ui/Fold";
import FreeEvaluation from "@/frontend/ui/FreeEvaluation";
import OurNetworkService from "@/frontend/ui/OurNetworkService";
import WhyChooseUs from "@/frontend/ui/WhyChooseUs";
import YourNetwork from "@/frontend/ui/YourNetwork";
import Contact from "@/frontend/ui/contact";
import FrontendLayout from "@/frontend/Layout/FrontendLayout";
import { Head } from "@inertiajs/react";

const Home = ({ auth }) => {
    console.log("from home", auth.user);
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

            <Carousel />
            <OurNetworkService />
            <Fold />
            <WhyChooseUs />
            <FreeEvaluation />
            <CustomItService />
            <YourNetwork />
            <Contact />
        </FrontendLayout>
    );
};

export default Home;
