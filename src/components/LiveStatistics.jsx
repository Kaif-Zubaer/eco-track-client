import axios from 'axios';
import React, { useEffect, useState } from 'react';

const LiveStatistics = () => {
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        axios.get('https://eco-track-nu-one.vercel.app/challenges')
            .then(data => setChallenges(data.data))
    }, [])

    const totalParticipants = challenges.reduce((sum, challenge) => sum + (challenge.participants || 0), 0);

    return (
        <div className='my-10 mx-6 md:my-15 lg:mx-20'>
            <h1 className='text-3xl font-bold text-center text-accent'>Live Community Impact</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 my-10 mx-5'>
                <div className='px-6 text-center py-8 shadow-[0_4px_10px_rgb(0,0,0,0.1)] flex flex-col gap-4 justify-center items-center'>
                    <h3 className='text-xl font-bold'>Active Challenges</h3>
                    <p className='text-green-600 text-4xl font-extrabold'>{challenges.length}</p>
                    <p className='font-semibold'>Ongoing challenges you are participating</p>
                </div>
                <div className='px-6 text-center py-8 shadow-[0_4px_10px_rgb(0,0,0,0.1)] flex flex-col gap-4 justify-center items-center'>
                    <h3 className='text-xl font-bold'>Total Participants</h3>
                    <p className='text-green-600 text-4xl font-extrabold'>{totalParticipants}</p>
                    <p className='font-semibold'>Number of participants in all challenges</p>
                </div>
                <div className='px-6 text-center py-8 shadow-[0_4px_10px_rgb(0,0,0,0.1)] flex flex-col gap-4 justify-center items-center'>
                    <h3 className='text-xl font-bold'>Plastic Items Avoided</h3>
                    <p className='text-green-600 text-4xl font-extrabold'>28,930 items</p>
                    <p className='font-semibold'>Saved by reducing single-use plastics</p>
                </div>
                <div className='px-6 text-center py-8 shadow-[0_4px_10px_rgb(0,0,0,0.1)] flex flex-col gap-4 justify-center items-center'>
                    <h3 className='text-xl font-bold'>Water Saved</h3>
                    <p className='text-green-600 text-4xl font-extrabold'>63,200 L</p>
                    <p className='font-semibold'>Conserved through daily mindful habits</p>
                </div>
                <div className='px-6 text-center py-8 shadow-[0_4px_10px_rgb(0,0,0,0.1)] flex flex-col gap-4 justify-center items-center'>
                    <h3 className='text-xl font-bold'>E-Waste Properly Recycled</h3>
                    <p className='text-green-600 text-4xl font-extrabold'>1,240 devices</p>
                    <p className='font-semibold'>Repaired, reused, or safely recycled electronics</p>
                </div>
                <div className='px-6 text-center py-8 shadow-[0_4px_10px_rgb(0,0,0,0.1)] flex flex-col gap-4 justify-center items-center'>
                    <h3 className='text-xl font-bold'>Trees Planted</h3>
                    <p className='text-green-600 text-4xl font-extrabold'>1,050 trees</p>
                    <p className='font-semibold'>Contributing to a greener and healthier planet</p>
                </div>
                <div className='px-6 text-center py-8 shadow-[0_4px_10px_rgb(0,0,0,0.1)] flex flex-col gap-4 justify-center items-center'>
                    <h3 className='text-xl font-bold'>Energy Saved</h3>
                    <p className='text-green-600 text-4xl font-extrabold'>25,600 kWh</p>
                    <p className='font-semibold'>Conserved electricity through mindful energy usage</p>
                </div>
                <div className='px-6 text-center py-8 shadow-[0_4px_10px_rgb(0,0,0,0.1)] flex flex-col gap-4 justify-center items-center'>
                    <h3 className='text-xl font-bold'>Food Waste Reduced</h3>
                    <p className='text-green-600 text-4xl font-extrabold'>3,780 kg</p>
                    <p className='font-semibold'>Minimized waste through thoughtful consumption</p>
                </div>
            </div>
        </div>
    );
};

export default LiveStatistics;