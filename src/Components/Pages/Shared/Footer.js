import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const date = new Date();
    const currentYear = date.getFullYear();

    return (
        <div className='border-t-2 border-gray-300'>
            <footer className="footer px-8 lg:px-32 p-10 bg-base-300 text-base-content">
                <div>
                    <span className="text-lg font-semibold">Company</span>
                    <p className='text-xl'>Mr Computer Tools</p>
                </div>
                <div>
                    <span className='text-lg font-semibold'>Services</span>
                    <Link to='/' className="link link-hover">Branding</Link>
                    <Link to='/' className="link link-hover">Design</Link>
                    <Link to='/' className="link link-hover">Marketing</Link>
                    <Link to='/' className="link link-hover">Advertisement</Link>
                </div>
                <div>
                    <span className="text-lg font-semibold">Legal</span>
                    <Link to='/' className="link link-hover">About us</Link>
                    <Link to='/' className="link link-hover">Contact</Link>
                    <Link to='/' className="link link-hover">Jobs</Link>
                    <Link to='/' className="link link-hover">Press kit</Link>
                </div>
            </footer>
            <footer className="footer px-8 lg:px-32 text-center flex justify-center items-center py-4 border-t bg-base-300 border-gray-400">
                <p className='text-md md:text-lg'>Copyright © {currentYear} - All right reserved</p>
            </footer>
        </div>
    );
};

export default Footer;