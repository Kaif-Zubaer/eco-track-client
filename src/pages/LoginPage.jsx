import React from 'react';
import { FaGoogle } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link } from 'react-router';

const LoginPage = () => {
    return (
        <div className='flex flex-col justify-center items-center my-15 mx-8'>
            <h1 className='text-xl text-center text-primary font-bold mb-6'>Welcome Back to <br /> EcoTrack</h1>
            <div className='w-full md:w-120 rounded-md px-6 py-12 bg-no-repeat bg-cover bg-center bg-[url(https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjk5MC0wNWEta3MwMXF5bGQuanBn.jpg)]'>
                <form>
                    <div className='flex flex-col'>
                        <label className='font-bold mb-2'>Email</label>
                        <input className='bg-white px-4 py-2 outline-0 mb-4 rounded-sm font-bold' type="email" name="email" placeholder='Enter your email' required />
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold mb-2'>Password</label>
                        <input className='bg-white px-4 py-2 outline-0 mb-3 rounded-sm font-bold' type="password" name="password" placeholder='Password' required />
                    </div>
                    <Link to='/auth/forget-password' className='text-accent text-sm font-bold hover:underline cursor-pointer'>Forget password?</Link>
                    <div className='flex flex-col gap-1 mt-4'>
                        <button className='flex justify-center items-center gap-2 bg-accent text-white font-semibold p-2 rounded-sm border-2 hover:opacity-85 duration-300 cursor-pointer'>
                            <MdOutlineMailOutline className='text-white w-7 h-7' />
                            Login with Email
                        </button>
                        <button className='flex justify-center items-center gap-2 bg-accent text-white font-semibold p-2 rounded-sm border-2'>
                            <FaGoogle className='text-white w-7 h-7' />
                            Login with Google
                        </button>
                    </div>
                </form>
            </div>
            <p className='mt-5 font-semibold'>Don't have an account? <Link className='font-bold text-primary hover:underline' to='/auth/register'>Register now!</Link></p>
        </div>
    );
};

export default LoginPage;