import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import axios from 'axios';
import { FaArrowUpLong, FaArrowDownLong, FaRegCircleUser } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";

const Tips = () => {
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://eco-track-nu-one.vercel.app/tips')
            .then(data => {
                setTips(data.data);
                setLoading(false);
            })
    }, [])

    return (
        <div>
            <section className="bg-[#f5faf7] py-12 px-6 md:px-8 xl:px-25">
                <div className="max-w-6xl mx-auto text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-accent  mb-3">Community Eco Tips</h2>
                    <p className="text-gray-600">Explore the latest sustainability tips shared by community members to help you live greener every day.</p>
                </div>
                {
                    loading
                        ? <Loading></Loading>
                        : tips.length > 0
                            ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {
                                        tips.map((tip) => (
                                            <div key={tip._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-5 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-primary mb-2">{tip.title}</h3>
                                                    <p className="text-gray-600 text-sm mb-3">{tip.content}</p>
                                                </div>
                                                <div className="text-sm text-gray-500 space-y-1 mt-auto">
                                                    <p className="flex items-center gap-2"><BiCategory className="text-primary w-5 h-5" /> {tip.category}</p>
                                                    <p className="flex items-center gap-2">
                                                        <FaCalendarAlt className="text-primary w-5 h-5" />
                                                        {
                                                            new Date(tip.createdAt).toLocaleDateString("en-GB", {
                                                                day: "numeric",
                                                                month: "short",
                                                                year: "numeric",
                                                            })
                                                        }
                                                    </p>
                                                    <p className="flex items-center gap-2"><FaRegCircleUser className="text-primary w-5 h-5" /> {tip.authorName} <span>({tip.author})</span></p>
                                                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                                                        <p className="flex items-center gap-2 font-semibold">
                                                            <FaArrowUpLong className='text-green-600' /> {tip.upvotes}
                                                        </p>
                                                        <p className="flex items-center gap-2 font-semibold">
                                                            <FaArrowDownLong className='text-red-600' /> 0
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )
                            : <p className="text-center text-gray-500 mt-10 text-3xl font-bold">No tips found.</p>
                }
            </section>
        </div>
    );
};

export default Tips;