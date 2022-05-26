import React from 'react';
import NotFoundImg from '../../../assets/not-found.jpg';

const NotFound = () => {
    return (
        <div className='bg-white min-h-screen'>
            <img className='w-full px-5 md:px-0 md:w-2/5 pt-20 mx-auto' src={NotFoundImg} alt="" />
            <h2 className='text-center mt-5 text-error text-xl md:text-3xl'>The page you are looking for is found page</h2>
        </div>
    );
};

export default NotFound;