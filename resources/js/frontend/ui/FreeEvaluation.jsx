import React from "react";
import freeImg from "@/assets/images/evaluation.png";

const FreeEvaluation = () => {
    const containerStyle = {
        position: "relative",
        backgroundImage: `url(${freeImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "50vh", // Adjust this to fit your design
    };

    const textStyle = {
        position: "absolute",
        top: "10%", // Adjust this value to set the distance from the top
        left: "50%",
        transform: "translateX(-50%)",
        width: "50%",
        textAlign: "center",
        borderRadius: "10px",
    };

    return (
        <div style={containerStyle}>
            <h1 className="lg:text-4xl font-bold text-white bg-blue-600 mt-8" style={textStyle}>
                Get a FREE evaluation
            </h1>
        </div>
    );
};

export default FreeEvaluation;

