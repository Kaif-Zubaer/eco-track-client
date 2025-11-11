import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import FooterPrimary from '../components/FooterPrimary';

const HomeLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <header>
                <Navbar></Navbar>
            </header>
            <main className='flex-1'>
                <Outlet></Outlet>
            </main>
            <footer>
                <FooterPrimary></FooterPrimary>
            </footer>
        </div>
    );
};

export default HomeLayout;