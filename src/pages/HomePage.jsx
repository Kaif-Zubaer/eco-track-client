import React from 'react';
import HeroBanner from '../components/HeroBanner';
import LiveStatistics from '../components/LiveStatistics';
import ActiveChallenges from '../components/ActiveChallenges';
import Tips from '../components/Tips';
import Events from '../components/Events';
import WhyGoGreen from '../components/WhyGoGreen';
import HowItWorks from '../components/HowItWorks';

const HomePage = () => {
    return (
        <div>
            <HeroBanner></HeroBanner>
            <LiveStatistics></LiveStatistics>
            <ActiveChallenges></ActiveChallenges>
            <Tips></Tips>
            <Events></Events>
            <WhyGoGreen></WhyGoGreen>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default HomePage;