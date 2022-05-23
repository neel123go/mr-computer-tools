import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="drawer drawer-mobile border-t-2">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content p-5">
                <h2 className='text-3xl font-bold text-gray-700'><span className='text-red-500'>Welcome</span>, to your Dashboard</h2>
                <div className='mt-2 text-gray-600'>
                    <Outlet></Outlet>
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-60 border-r-2 text-base-content">
                    <li><Link to='/dashboard' className='mb-5 bg-primary text-lg text-gray-800 hover:bg-error focus:bg-error hover:text-white focus:text-white'>My Orders</Link></li>
                    <li><Link to='addReview' className='mb-5 bg-primary text-lg text-gray-800 hover:bg-error focus:bg-error hover:text-white focus:text-white'>Add Review</Link></li>
                    <li><Link to='myProfile' className='mb-5 bg-primary text-lg text-gray-800 hover:bg-error focus:bg-error hover:text-white focus:text-white'>My Profile</Link></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;