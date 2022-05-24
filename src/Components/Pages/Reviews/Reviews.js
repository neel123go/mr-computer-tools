import React from 'react';
import ReviewSlider from '../ReviewSlider/ReviewSlider';

const Reviews = () => {
    return (
        <div className='px-7 md:px-20 lg:px-26 xl:px-32 mb-10'>
            <h2 className='text-4xl font-bold ml-2 md:text-4xl mt-10 text-warning' style={{ fontFamily: 'Changa, sans-serif' }}>Client Reviews</h2>
            <div className='w-1/2 md:w-1/4 lg:w-1/6 h-1 mt-2 rounded-lg bg-indigo-500'></div>
            <ReviewSlider></ReviewSlider>
        </div>
    );
};

export default Reviews;