import React from 'react';
import { Link } from 'react-router';

const ForgetPasswordPage = () => {
    return (
        <div>
            <div className='flex flex-col justify-center items-center my-15 mx-8'>
                <h1 className='text-xl text-center text-primary font-bold mb-10 border-b-2 pb-2 w-full md:w-120'>Forget password?</h1>
                <h1 className='text-xl text-center text-accent font-bold mb-6'>Enter your email <br /> We'll send you a link to get back into your account.</h1>
                <div className='w-full md:w-120 rounded-md px-6 py-12 bg-no-repeat bg-cover bg-center bg-[url(https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjk5MC0wNWEta3MwMXF5bGQuanBn.jpg)]'>
                    <form>
                        <div className='flex flex-col'>
                            <label className='font-bold mb-2'>Email</label>
                            <input className='bg-white px-4 py-2 outline-0 mb-4 rounded-sm font-bold' type="email" name="email" placeholder='Enter your email' required />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <button className='flex justify-center items-center gap-2 bg-accent text-white font-semibold p-2 rounded-sm border-2 hover:opacity-85 duration-300 cursor-pointer'>
                                Send Login Link
                            </button>
                        </div>
                    </form>
                </div>
                <Link className='font-bold text-primary hover:underline mt-5' to='/auth/login'>Back to Login!!</Link>
            </div>
        </div>
    );
};

export default ForgetPasswordPage;