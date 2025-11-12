import React from 'react';
import HeroBanner from '../components/HeroBanner';
import LiveStatistics from '../components/LiveStatistics';
import ActiveChallenges from '../components/ActiveChallenges';
import Tips from '../components/Tips';

const HomePage = () => {
    return (
        <div>
            <HeroBanner></HeroBanner>
            <LiveStatistics></LiveStatistics>
            <ActiveChallenges></ActiveChallenges>
            <Tips></Tips>
        </div>
    );
};

export default HomePage;