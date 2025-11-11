import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import FooterSecondery from '../components/FooterSecondery';

const AuthLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <header>
                <Navbar></Navbar>
            </header>
            <main className='flex-1'>
                <Outlet></Outlet>
            </main>
            <footer>
                <FooterSecondery></FooterSecondery>
            </footer>
        </div>
    );
};

export default AuthLayout;