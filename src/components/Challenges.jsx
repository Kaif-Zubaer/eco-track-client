import React, { useEffect, useState } from 'react';
import { FaUserFriends } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import { Link, useLoaderData } from 'react-router';
import Loading from './Loading';
import notFound from '../assets/notFound.jpg';

const Challenges = () => {
    const challenges = useLoaderData();

    const [search, setSearch] = useState('');
    const [filteredChallenges, setFilteredChallenges] = useState(challenges);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const delay = setTimeout(() => {
            const filtered = challenges.filter(challenge =>
                challenge.title.toLowerCase().includes(search.toLowerCase()) ||
                challenge.category.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredChallenges(filtered);
            setLoading(false);
        }, 300);

        return () => clearTimeout(delay);
    }, [search, challenges]);

    return (
        <div className='mx-6 md:mx-10 lg:mx-30'>
            <h1 className='text-center mt-10 mb-6 md:my-10 text-2xl text-primary font-bold'>All Challenges</h1>
            <div className='flex flex-col gap-4 md:flex-row md:justify-between md:items-center'>
                <p className='text-lg font-medium'>Number of challenges available: {filteredChallenges.length}</p>
                <input onChange={(e) => setSearch(e.target.value)} className='border-2 border-primary outline-0 rounded-sm py-2 md:py-1 px-3 font-semibold' type="search" value={search} placeholder='Search...' />
            </div>
            {
                loading
                    ? <Loading></Loading>
                    : filteredChallenges.length > 0
                        ? <div className='mx-2  my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6'>
                            {
                                challenges.map(challenge => (
                                    <div key={challenge._id} className='border-2 border-primary rounded-sm p-5 bg-base-200 pb-7'>
                                        <img className='rounded-md' src={challenge.imageUrl} alt="" />
                                        <h1 className='mt-5 mb-2 text-lg text-accent font-bold'>{challenge.title}</h1>
                                        <div className='flex justify-between items-center mb-2'>
                                            <p className='border border-primary py-1 px-2 rounded-3xl text-sm text-primary font-medium bg-white'>{challenge.category}</p>
                                            <div className='flex justify-center items-center gap-4'>
                                                <FaUserFriends className='text-accent w-6 h-6' />
                                                <p className='text-lg text-accent font-bold'>{challenge.participants}</p>
                                            </div>
                                            <div className='flex justify-center items-center gap-4'>
                                                <IoTimeSharp className='text-accent w-6 h-6' />
                                                <p className='text-lg text-accent font-bold'>{challenge.duration}</p>
                                            </div>
                                        </div>
                                        <p className='line-clamp-3 mb-5'>{challenge.description}</p>
                                        <Link to={`/challenges/${challenge._id}`} className='border-2 border-accent bg-accent p-2 px-4 rounded-sm text-white font-bold cursor-pointer hover:bg-white hover:text-accent duration-350'>View details</Link>
                                    </div>
                                ))
                            }
                        </div>
                        : <div className='flex flex-col justify-center items-center my-10'>
                            <img src={notFound} alt="" />
                            <h1 className='text-primary text-3xl font-bold mt-4'>Challenge Not Found!</h1>
                        </div>
            }
        </div>
    );
};

export default Challenges;