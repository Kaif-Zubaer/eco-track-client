import React from 'react';
import { useLoaderData } from 'react-router';
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
        <div>
            <h3 className='flex items-center mx-3 my-2 text-xl gap-2 font-bold text-accent'><IoMdArrowRoundBack /> Back to Challenges</h3>
            <div className='mt-3 mb-10'>
                <div>
                    <img src={imageUrl} alt="" />
                    <p className='hidden text-lg mt-5 px-6 text-justify'>{description}</p>
                </div>
                <div className='px-6'>
                    <h1 className='text-2xl font-bold text-primary pt-5 pb-2 border-b-2'>{title}</h1>
                    <h3 className='text-xl font-bold text-accent py-2 border-b-2 border-primary'>{target}</h3>
                    <div className='flex items-center py-3 gap-3 border-b-2 border-primary'>
                        <p className='text-lg text-accent font-bold'>Category:</p>
                        <p className='py-1 px-5 bg-primary text-white font-semibold rounded-4xl'>{category}</p>

                    </div>
                    <div className='flex justify-between pr-8 py-3 text-lg font-bold text-accent border-b-2 border-primary'>
                        <p>Duration: <span className='text-primary'>{duration} Days</span></p>
                        <p className='flex justify-center items-center gap-2'><FaUser className='text-primary' /> Participants: <span className='text-primary'>{participants}</span></p>
                    </div>
                    <h3>{impactMetric}</h3>
                    <p>{createdBy}</p>
                    <div>
                        <p>{startDate}</p>
                        <p>{endDate}</p>
                    </div>
                    <div>
                        <p className='text-lg mt-5 text-justify'>{description}</p>
                    </div>
                    <button>Join</button>
                </div>
            </div>
            <div>
                <h2>Participent:</h2>
            </div>
        </div>
    );
};

export default ChallengeDetails;