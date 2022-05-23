import React from 'react';
import { GlobeIcon, UserGroupIcon, StarIcon } from '@heroicons/react/solid';

const BusinessSummary = () => {
    return (
        <div className='min-h-screen px-7 md:px-20 lg:px-26 xl:px-32 mb-10'>
            <h2 className='text-4xl font-bold ml-2 md:text-4xl mt-10 text-warning' style={{ fontFamily: 'Changa, sans-serif' }}>Our Business Summary</h2>
            <div className='w-1/2 md:w-1/4 lg:w-1/6 h-1 mt-2 rounded-lg bg-error'></div>
            <div className='w-full rounded-xl mt-10 h-full bg-primary p-5 sm:p-10 lg:p-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                <div className="card w-auto bg-base-100 shadow-xl">
                    <div className="card-body items-center text-center">
                        <GlobeIcon className='w-10 h-10 text-primary'></GlobeIcon>
                        <h2 className="card-title">32</h2>
                        <p className='text-2xl'>Countries</p>
                    </div>
                </div>
                <div className="card w-auto bg-base-100 shadow-xl">
                    <div className="card-body items-center text-center">
                        <UserGroupIcon className='w-10 h-10 text-primary'></UserGroupIcon>
                        <h2 className="card-title">45.9K+</h2>
                        <p className='text-2xl'>Happy Client</p>
                    </div>
                </div>
                <div className="card w-auto bg-base-100 shadow-xl">
                    <div className="card-body items-center text-center">
                        <StarIcon className='w-10 h-10 text-primary'></StarIcon>
                        <h2 className="card-title">38.5K+</h2>
                        <p className='text-2xl'>Reviews</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessSummary;