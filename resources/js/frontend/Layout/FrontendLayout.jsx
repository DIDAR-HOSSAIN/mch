import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const FrontendLayout = ({ user, children }) => {
    return (
        <div>
            <Navbar user={user} />
            {children}
            <Footer />
        </div>
    );
};

export default FrontendLayout;
