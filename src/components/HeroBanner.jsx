import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Link } from 'react-router';
import Loading from './Loading';

const HeroBanner = () => {
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
        <div className='p-6 lg:px-15 lg:py-8 xl:px-25 xd:py-10 2xl:px-30 bg-black'>
            {
                loading
                    ? <Loading></Loading>
                    : <Swiper
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        modules={[Autoplay]}
                        simulateTouch={true}
                        loop={true}
                    >
                        {
                            challenges.map(challenge => (
                                <SwiperSlide>
                                    <div className='grid grid-cols-1 md:grid-cols-2 md:gap-10 justify-center items-center'>
                                        <img className='rounded-sm' src={challenge.imageUrl} alt="" />
                                        <div className='my-6 flex flex-col gap-3 2xl:gap-4'>
                                            <h1 className='text-white text-2xl font-bold 2xl:text-3xl'>{challenge.title}</h1>
                                            <h3 className='text-white text-xl font-semibold'>{challenge.target}</h3>
                                            <p className='text-primary font-medium text-lg  line-clamp-3 md:line-clamp-2 xl:line-clamp-3 2xl:text-xl'>{challenge.description}</p>
                                            <Link to={`/challenges/${challenge._id}`} className='text-white bg-primary w-fit px-6 py-2 mt-2 rounded-sm font-semibold'>View Challenge</Link>
                                        </div>
                                    </div>
                                </SwiperSlide>

                            ))
                        }
                    </Swiper>
            }
        </div >
    );
};

export default HeroBanner;