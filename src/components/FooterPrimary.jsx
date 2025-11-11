import React from 'react';
import fooeterPlant from '../assets/footer-plant.png'
import { toast } from 'react-toastify';
import logo from '../assets/Untitled.png'
import { Link } from 'react-router';
import { IoLogoWechat } from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";
import { FaRedditAlien } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const FooterPrimary = () => {
    const handleSubscribe = (e) => {
        e.preventDefault();

        toast.success('Thank you!')

        e.target.reset();
    }

    return (
        <div className='bg-black pt-10 pb-4 px-6 md:px-10 md:pt-12 lg:px-15 2xl:px-25 2xl:gap-15'>
            <div className='xl:grid xl:grid-cols-3 xl:gap-10 justify-center items-center xl:mb-6'>
                <div>
                    <Link className='flex items-center gap-2 mb-4'>
                        <img className='w-10 h-10' src={logo} alt="" />
                        <h1 className='text-3xl text-primary font-bold'>EcoTrack</h1>
                    </Link>
                    <p className='text-white mb-6 lg:text-lg lg:mb-8'>A community platform where eco-conscious people discover and join sustainability challenges, share practical eco-tips, browse local green events, and track personal environmental impact — focused on measurable, community-driven progress.</p>
                </div>
                <div className='bg-primary flex justify-center items-center py-8 rounded-md mb-6 xl:col-span-2 md:gap-6 xl:gap-10'>
                    <img className='hidden md:block h-40 animate-bounce' src={fooeterPlant} alt="" />
                    <div className='flex flex-col justify-center items-center gap-4'>
                        <h1 className='text-xl font-bold text-center px-4'>Sign Up To Get Updates & News About Us..</h1>
                        <form onSubmit={handleSubscribe} className='flex'>
                            <input className='bg-white rounded-l-sm px-4 py-1.5 outline-0' type="email" name="email" placeholder='example@gmail.com' required />
                            <button className='text-white font-semibold bg-black px-5 py-2 rounded-r-sm hover:opacity-80 duration-300 cursor-pointer'>Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                <ul className='text-white flex gap-6 md:gap-10'>
                    <li><FaFacebook className='w-7 h-7 hover:text-primary duration-300 cursor-pointer' /></li>
                    <li><FaInstagram className='w-7 h-7 hover:text-primary duration-300 cursor-pointer' /></li>
                    <li><FaXTwitter className='w-7 h-7 hover:text-primary duration-300 cursor-pointer' /></li>
                    <li><FaRedditAlien className='w-7 h-7 hover:text-primary duration-300 cursor-pointer' /></li>
                    <li><IoLogoWechat className='w-7 h-7 hover:text-primary duration-300 cursor-pointer' /></li>
                    <li><FaTelegramPlane className='w-7 h-7 hover:text-primary duration-300 cursor-pointer' /></li>
                </ul>
            </div>
            <div>
                <ul className='text-white grid grid-cols-2 border-y border-white justify-between mt-6 py-4 text-lg gap-2 cursor-pointer font-medium lg:gap-4 xl:grid-cols-3'>
                    <li className='hover:text-primary hover:underline'>About Us</li>
                    <li className='hover:text-primary hover:underline'>Privacy Policy</li>
                    <li className='hover:text-primary hover:underline'>Blog</li>
                    <li className='hover:text-primary hover:underline'>Contact Us</li>
                    <li className='hover:text-primary hover:underline'>Terms of Service</li>
                    <li className='hover:text-primary hover:underline'>FAQs</li>
                    <li className='hover:text-primary hover:underline'>Support</li>
                </ul>
            </div>
            <div>
                <p className='text-white font-semibold text-lg text-center mt-4'>© 2025 EcoTrack. All rights reserved.</p>
            </div>
        </div>
    );
};

export default FooterPrimary;