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
                    <span className='text-lg font-semibold'>Pages</span>
                    <Link to='/myPortfolio' className="link link-hover">My Portfolio</Link>
                    <Link to='/blogs' className="link link-hover">Blogs</Link>
                    <Link to='/dashboard' className="link link-hover">Dashboard</Link>
                </div>
                <div>
                    <span className="text-lg font-semibold">Office</span>
                    <p>Meghna C-31, Dariapara, Sylhet</p>
                    <p>phone - 01726384739</p>
                    <p>email - mr.conputer@gmail.com</p>
                </div>
            </footer>
            <footer className="footer px-8 lg:px-32 text-center flex justify-center items-center py-4 border-t bg-base-300 border-gray-400">
                <p className='text-md md:text-lg'>Copyright © {currentYear} - All right reserved</p>
            </footer>
        </div>
    );
};

export default Footer;