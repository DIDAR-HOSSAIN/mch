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

const Home = () => {
    return (
            <FrontendLayout>
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
