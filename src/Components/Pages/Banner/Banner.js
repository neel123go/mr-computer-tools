import React from 'react';
import Background from '../../../assets/backgroundImage.jpg';

const Banner = () => {
    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: `url(${Background})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Hello There text lekha lagbo</h1>
                        <p className="mb-5">Here you can find your all </p>
                        <button className="btn btn-primary hover:bg-nature hover:text-white px-10">Explore</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;