import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import axios from 'axios';
import { FaArrowUpLong } from "react-icons/fa6";
import { FaArrowDownLong } from "react-icons/fa6";

const Tips = () => {
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3000/tips')
            .then(data => {
                setTips(data.data);
                setLoading(false);
            })
    }, [])

    return (
        <div className='p-6 xl:mx-10'>
            <h1 className='text-center text-3xl font-bold text-accent mb-10'>Recent Tips</h1>
            {
                loading
                    ? <Loading></Loading>
                    : <div className='grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
                        {
                            tips.map(tip => (
                                <div key={tip._id} className='py-8 bg-primary rounded-md'>
                                    <h1 className='px-4 text-2xl font-bold'>{tip.title}</h1>
                                    <h3 className='mx-4 px-6 py-1.5 bg-accent text-white w-fit my-3 font-semibold text-lg rounded-4xl'>{tip.category}</h3>
                                    <p className='bg-black text-white px-4 py-5 text-lg text-justify font-bold'>{tip.content}</p>
                                    <p className='font-bold pt-4 px-4 text-accent'><span className='text-lg text-black'>Author name:</span> {tip.authorName}</p>
                                    <p className='font-bold px-4 text-accent'><span className='text-lg text-black'>Author email:</span> {tip.author}</p>
                                    <div className='flex justify-between items-center px-4 mt-3'>
                                        <p className='font-bold text-accent'><span className='text-lg text-black'>Data:</span> {new Date(tip.createdAt).toLocaleDateString()}</p>
                                        <div className='flex justify-center items-center gap-4'>
                                            <p className='flex justify-center items-center font-bold'><FaArrowUpLong /> {tip.upvotes}</p>
                                            <p className='flex justify-center items-center font-bold'><FaArrowDownLong /> 0</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            }
        </div>
    );
};

export default Tips;