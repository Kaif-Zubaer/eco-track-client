import React from 'react';
import { Link, useLoaderData } from 'react-router';
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaUser } from "react-icons/fa";

const ChallengeDetails = () => {
    const challengeDetails = useLoaderData();
    const {
        title,
        category,
        description,
        duration,
        target,
        participants,
        impactMetric,
        createdBy,
        startDate,
        endDate,
        imageUrl
    } = challengeDetails;

    return (
        <div className="container mx-auto p-4 md:p-8 mb-10">
            <Link to="/challenges" className='flex items-center gap-2 text-accent font-semibold mb-4 hover:underline'>
                <IoMdArrowRoundBack className="text-2xl" /> Back to Challenges
            </Link>
            <div className="flex flex-col md:w-4/5 xl:w-full mx-auto xl:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="">
                    <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                </div>
                <div className="xl:w-1/2 p-6 flex flex-col justify-between">
                    <div>
                        <h1 className="mb-3 text-3xl md:text-4xl font-bold text-accent">{title}</h1>
                        <p className="text-lg font-semibold text-primary mb-2">{target}</p>
                        <div className="flex items-center flex-wrap gap-4 my-3">
                            <span className="px-4 py-1 border-2 border-accent bg-accent text-white rounded-full text-sm font-semibold">{category}</span>
                            <span className="px-4 py-1 border-2 border-accent bg-white text-accent rounded-full text-sm font-semibold">{impactMetric}</span>
                        </div>
                        <div className="flex justify-between items-center mb-3 text-accent font-medium">
                            <p className="font-bold text-accent">Duration: <span className="text-primary font-bold">{duration} days</span></p>
                            <p className="flex items-center gap-1"><FaUser className="text-primary" /> {participants} Participants</p>
                        </div>

                        <div className="text-gray-500 font-semibold mb-3">
                            <p className="mb-1"><span className="font-bold text-accent">Created By:</span> {createdBy}</p>
                            <p className="mb-1"><span className="font-bold text-accent">Start Date:</span> {new Date(startDate).toLocaleDateString()}</p>
                            <p className="mb-1"><span className="font-bold text-accent">End Date:</span> {new Date(endDate).toLocaleDateString()}</p>
                        </div>
                        <p className="font-medium text-justify">{description}</p>
                    </div>
                    <div className="mt-6">
                        <button className="w-fit bg-accent text-white font-bold py-2 px-6 rounded-sm shadow-lg hover:opacity-85 cursor-pointer transition duration-300">
                            Join Challenge
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChallengeDetails;