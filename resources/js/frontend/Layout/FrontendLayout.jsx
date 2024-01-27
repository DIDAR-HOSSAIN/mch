import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const FrontendLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default FrontendLayout;
