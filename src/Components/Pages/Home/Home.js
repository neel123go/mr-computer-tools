import React from 'react';
import Banner from '../Banner/Banner';
import BusinessSummary from '../BusinessSummary/BusinessSummary';
import Tools from '../Tools/Tools';
import Reviews from '../Reviews/Reviews';

const Home = () => {
    return (
        <div>
            <Banner />
            <Tools />
            <BusinessSummary />
            <Reviews />
        </div>
    );
};

export default Home;