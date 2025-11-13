import React from "react";
import { FaLeaf, FaRecycle, FaGlobeAmericas, FaHeart, FaWater, FaBolt, FaBicycle, FaSeedling } from "react-icons/fa";

const WhyGoGreen = () => {
    const reasons = [
        { icon: <FaLeaf />, text: "Protect Nature" },
        { icon: <FaRecycle />, text: "Reduce Waste" },
        { icon: <FaGlobeAmericas />, text: "Global Impact" },
        { icon: <FaHeart />, text: "Healthy Living" },
        { icon: <FaWater />, text: "Conserve Water" },
        { icon: <FaBolt />, text: "Save Energy" },
        { icon: <FaBicycle />, text: "Eco-Friendly Transport" },
        { icon: <FaSeedling />, text: "Support Biodiversity" },
    ];

    return (
        <section className="bg-[#f5faf7] py-12 px-4 md:px-8 xl:px-25 text-center">
            <div className="max-w-6xl mx-auto text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-accent  mb-3">Why Go Green?</h2>
                <p className="text-gray-600">Adopting eco-conscious habits helps our planet, communities, and personal well-being. Here’s why every small step matters:</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8">
                {
                    reasons.map((reason, index) => (
                        <div key={index} className="flex flex-col items-center bg-white rounded-full shadow-md w-40 h-40 justify-center p-4 hover:animate-pulse transition">
                            <div className="text-primary text-4xl mb-2">{reason.icon}</div>
                            <p className="text-primary font-medium text-center">{reason.text}</p>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default WhyGoGreen;