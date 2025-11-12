import React from 'react';
import HeroBanner from '../components/HeroBanner';
import LiveStatistics from '../components/LiveStatistics';

const HomePage = () => {
    return (
        <div>
            <HeroBanner></HeroBanner>
            <LiveStatistics></LiveStatistics>
        </div>
    );
};

export default HomePage;