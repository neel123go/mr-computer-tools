import React from 'react';
import Background from '../../../assets/backgroundImage.jpg';

const Banner = () => {
    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: `url(${Background})` }}>
                <div className="hero-overlay bg-opacity-70"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-4xl font-bold">
                        <h1 className="text-3xl">Get the best quality equipment for computer</h1>
                        <p className='my-2 text-xl'>FROM</p>
                        <p className="mb-16 text-3xl font-bold">MR. Computer Tools</p>
                        <button className="btn btn-primary hover:bg-nature hover:text-white px-10"><a href="#tools">Explore</a></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;