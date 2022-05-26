import React from 'react';
import Banner from '../Banner/Banner';
import BusinessSummary from '../BusinessSummary/BusinessSummary';
import Tools from '../Tools/Tools';
import Reviews from '../Reviews/Reviews';
import TopBrands from '../TopBrands/TopBrands';
import LatestBlogs from '../LatestBlogs/LatestBlogs';

const Home = () => {
    return (
        <div>
            <Banner />
            <Tools />
            <BusinessSummary />
            <Reviews />
            <TopBrands />
            <LatestBlogs />
        </div>
    );
};

export default Home;