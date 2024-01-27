import React from "react";
import servicesBg from "@/assets/images/our_technologies_bg.png";
import service1 from "@/assets/images/reasons/certified.png";
import service2 from "@/assets/images/reasons/good_value.png";
import service3 from "@/assets/images/reasons/yrs_of_xp.png";
import service4 from "@/assets/images/reasons/response_time.png";
import service5 from "@/assets/images/reasons/satisfaction.png";

const WhyChooseUs = () => {
    const reasons = [
        {
            image: service1,
            title: "Industry leading vendor, certified engineers",
            description: "Cisco, Microsoft, Meraki, Fortinet, Paloalto, AWS.",
        },
        {
            image: service2,
            title: "Good Value",
            description:
                "Great rates and someone you can trust to make sure you are taken care of without overspending.",
        },
        {
            image: service3,
            title: "Years of Experience",
            description: "Serving multiple industries since 2011.",
        },
        {
            image: service4,
            title: "Fast Response Times",
            description:
                "You can count on a quick response, and 24-hour remote support and onsite support when needed.",
        },
        {
            image: service5,
            title: "100 % Satisfaction Guarantee",
            description:
                "You can rely on us for safe, reliable, and cost-effective IT support and solutions. Your satisfaction is our top priority, that's why we work to exceed your expectations.",
        },
    ];

    return (
        <>
        <div className="grid gap-4 mx-auto justify-center md:full"
            style={{
                backgroundImage: `url(${servicesBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: "20px",
                textAlign: "center",
            }}
        >
            <h1 className="text-lg font-bold text-blue-300">WHY CHOOSE US</h1>
            <h1 className="lg:text-4xl font-bold text-blue-600">5 Reasons to partner with</h1>
            <h1 className="lg:text-4xl font-bold text-blue-600 mb-8">Aritechs</h1>

            {/* Grid items */}
            <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
                {reasons.map((service, index) => (
                    <div
                        key={index}
                        className="flex rounded-xl p-4 justify-center items-center"
                    >
                        {/* Left column (Image) */}
                        <div className="flex-none mr-4" style={{ width: "80px", height: "80px" }}>
                            <img
                                className="w-full h-full object-contain"
                                src={service.image}
                                alt={`Service ${index + 1}`}
                            />
                        </div>
                        {/* Right column (Text) */}
                        <div className="flex-grow flex flex-col justify-center">
                            <h2 className="text-2xl font-bold mb-2">
                                {service.title}
                            </h2>
                            <p className="text-base text-lg justify-center">{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        {/* Rest of the JSX remains unchanged */}
    </>
    );
};

export default WhyChooseUs;
