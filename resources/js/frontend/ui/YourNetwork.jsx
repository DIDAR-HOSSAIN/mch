import React from "react";
import net_bg from "@/assets/images/net_bg.png";

const YourNetwork = () => {
    return (
        <div
            className="hero lg:h-80  flex items-center justify-center overflow-hidden"
            style={{
                backgroundImage: `url(${net_bg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover", // Default background size for smaller devices
                margin: "0", // Default margin for smaller devices
            }}
        >
            <div className=""></div>
            <div className="hero-content text-center text-neutral-content relative">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-extrabold text-white">
                        YOUR NETWORK
                    </h1>
                    <h1 className="mb-5 text-5xl font-extrabold text-white">
                        OUR EXPERTISE
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default YourNetwork;
