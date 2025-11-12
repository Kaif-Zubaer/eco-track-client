import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUserFriends } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import { Link } from 'react-router';
import Loading from './Loading';

const ActiveChallenges = () => {
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3000/challenges')
            .then(data => {
                setChallenges(data.data);
                setLoading(false);
            })
    }, [])

    return (
        <div className='mt-20 mb-10 mx-6 md:mx-10 lg:mx-30'>
            <h1 className='text-center text-3xl font-bold text-accent'>Active Challenges</h1>
            {
                loading
                    ? <Loading></Loading>
                    : <div className='mx-2  my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6'>
                        {
                            challenges.slice(0, 5).map(challenge => (
                                <div key={challenge._id} className='border-2 border-primary rounded-sm p-5 bg-base-200 pb-7'>
                                    <img className='rounded-md' src={challenge.imageUrl} alt="" />
                                    <h1 className='mt-5 mb-2 text-lg text-accent font-bold'>{challenge.title}</h1>
                                    <div className='flex justify-between items-center mb-2'>
                                        <p className='border border-primary py-1 px-2 rounded-3xl text-sm text-primary font-medium bg-white'>{challenge.category}</p>
                                    </div>
                                    <p className='line-clamp-3 mb-5'>{challenge.description}</p>
                                    <Link to={`/challenges/${challenge._id}`} className='border-2 border-accent bg-accent p-2 px-4 rounded-sm text-white font-bold cursor-pointer hover:bg-white hover:text-accent duration-350'>View details</Link>
                                </div>
                            ))
                        }
                    </div>
            }
            <Link to='/challenges' className='flex justify-center px-8 py-2.5 bg-primary w-fit mx-auto text-white font-semibold rounded-sm'>View All</Link>
        </div>
    );
};

export default ActiveChallenges;