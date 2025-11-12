import React from 'react';
import { Link } from 'react-router';

const ErrorLayout = () => {
    return (
        <div className='flex flex-col justify-center items-center h-screen bg-primary'>
            <h1 className='text-9xl lg:text-[200px] font-extrabold'>404</h1>
            <h3 className='text-2xl lg:text-4xl font-bold mt-3'>Oops, This Page Not Found!</h3>
            <Link to='/' className='px-6 py-2 lg:py-3 lg:px-8 lg:text-xl text-white bg-black mt-10 font-semibold rounded-sm'>GO BACK HOME</Link>
        </div>
    );
};

export default ErrorLayout;