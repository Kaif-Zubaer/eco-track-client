import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUserFriends } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";

const Challenges = () => {
    const [challenges, setChallenges] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [filteredChallenges, setFilteredChallenges] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/challenges')
            .then(data => {
                setChallenges(data.data);
                setFilteredChallenges(data.data);
            })
            .catch(err => console.error(err));
    }, [])

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchItem(value);

        const filtered = challenges.filter(ch =>
            ch.title.toLowerCase().includes(value) ||
            ch.category.toLowerCase().includes(value)
        );

        setFilteredChallenges(filtered);
    };

    return (
        <div className='mx-6 md:mx-10 lg:mx-30'>
            <h1 className='text-center mt-10 mb-6 md:my-10 text-2xl text-primary font-bold'>All Challenges</h1>
            <div className='flex flex-col gap-4 md:flex-row md:justify-between md:items-center'>
                <p className='text-lg font-medium'>Number of challenges available: {challenges.length}</p>
                <input onChange={handleSearch} className='border-2 border-primary outline-0 rounded-sm py-2 md:py-1 px-3 font-semibold' type="search" value={searchItem} placeholder='Search...' />
            </div>
            <div className='mx-2  my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {
                    filteredChallenges.map(challenge => (
                        <div key={challenge._id} className='border-2 border-primary rounded-sm p-5 bg-secondary'>
                            <img className='rounded-md' src={challenge.imageUrl} alt="" />
                            <h1 className='mt-5 mb-2 text-lg text-accent font-bold'>{challenge.title}</h1>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='border border-primary py-1 px-2 rounded-3xl text-sm text-primary font-medium bg-white'>{challenge.category}</p>
                                <div className='flex justify-center items-center gap-2'>
                                    <FaUserFriends className='text-accent w-6 h-6' />
                                    <p className='text-lg text-accent font-bold'>{challenge.participants}</p>
                                </div>
                                <div className='flex justify-center items-center gap-2'>
                                    <IoTimeSharp className='text-accent w-6 h-6' />
                                    <p className='text-lg text-accent font-bold'>{challenge.duration}</p>
                                </div>
                            </div>
                            <p className='line-clamp-3 mb-5'>{challenge.description}</p>
                            <button className='border-2 border-accent bg-accent p-2 px-4 rounded-sm text-white font-bold cursor-pointer hover:bg-white hover:text-accent duration-350'>View details</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Challenges;