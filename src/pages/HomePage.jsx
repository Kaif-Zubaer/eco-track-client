import React from 'react';
import HeroBanner from '../components/HeroBanner';
import LiveStatistics from '../components/LiveStatistics';
import ActiveChallenges from '../components/ActiveChallenges';

const HomePage = () => {
    return (
        <div>
            <HeroBanner></HeroBanner>
            <LiveStatistics></LiveStatistics>
            <ActiveChallenges></ActiveChallenges>
        </div>
    );
};

export default HomePage;