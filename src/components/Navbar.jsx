import React, { useState } from 'react';
import logo from '../assets/Untitled.png'
import { Link, NavLink } from 'react-router';
import { HiMenu } from "react-icons/hi";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Navbar = () => {
    const [menu, setMenu] = useState(false);

    const links = <>
        <li className='transition-transform hover:-translate-y-0.5 duration-300'><NavLink to="/">Home</NavLink></li>
        <li className='transition-transform hover:-translate-y-0.5 duration-300'><NavLink to="/challenges">Challenges</NavLink></li>
        <li className='transition-transform hover:-translate-y-0.5 duration-300'><NavLink to="/my-activities">My Activities</NavLink></li>
    </>

    const linksSmallDevice = <>
        <li className='py-3 pl-4 border-b-2 border-white'><NavLink to="/">Home</NavLink></li>
        <li className='py-3 pl-4 border-b-2 border-white'><NavLink to="/challenges">Challenges</NavLink></li>
        <li className='py-3 pl-4 border-b-2 border-white'><NavLink to="/my-activities">My Activities</NavLink></li>
        <li className='text-start py-3 pl-4  border-b-2 border-white w-full'><Link to="/auth/login" >login</Link></li>
        <li className='text-start py-3 pl-4  border-b-2 border-white w-full'><Link to="/auth/register" >Register</Link></li>
    </>

    return (
        <nav className='flex justify-between items-center p-2 md:px-6 py-4 border-b border-primary'>
            <div className='flex justify-center items-center gap-16'>
                <div className='flex justify-center items-center gap-2'>
                    <span onClick={() => setMenu(!menu)}>
                        {
                            menu
                                ? <IoIosCloseCircleOutline className='md:hidden text-primary w-8 h-8' />
                                : <HiMenu className='md:hidden text-primary w-8 h-8' />
                        }
                        <ul className={`md:hidden absolute duration-500 top-[73px] ${menu ? 'left-0' : '-left-60'}
                     bg-primary w-45 h-[calc(100%-73px)] text-xl font-semibold`}>
                            {linksSmallDevice}
                        </ul>
                    </span>
                    <Link className='flex justify-center items-center gap-2'>
                        <img className='w-10 h-10' src={logo} alt="" />
                        <h1 className='text-3xl text-primary font-bold'>EcoTrack</h1>
                    </Link>
                </div>
                <div className='hidden md:flex'>
                    <ul className='flex justify-center items-center gap-6 font-semibold'>
                        {links}
                    </ul>
                </div>
            </div>
            <div className='hidden md:flex justify-center items-center gap-4'>
                <Link to="/auth/login" className='border-2 border-primary text-primary font-medium rounded-sm px-6 py-1 hover:bg-primary hover:text-white cursor-pointer duration-400'>Login</Link>
                <Link to="/auth/register" className='border-2 border-primary text-primary font-medium rounded-sm px-4 py-1 hover:bg-primary hover:text-white cursor-pointer duration-350'>Register</Link>
            </div>
        </nav>
    );
};

export default Navbar;