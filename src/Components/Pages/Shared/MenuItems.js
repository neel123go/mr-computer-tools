import React from 'react';
import { NavLink } from 'react-router-dom';
import { XIcon } from '@heroicons/react/solid';

const MenuItems = ({ setActive, active, user, name, handleLogout }) => {
    return (
        <ul className={active ? 'md:hidden flex flex-col items-center fixed justify-center left-1/4 bg-black/50 backdrop-blur-lg gap-5 inset-0 p-8 z-30 uppercase' : 'hidden'}>
            <div>
                <XIcon onClick={() => setActive(!active)} className="cursor-pointer h-8 w-8 text-primary" />
            </div>
            <li><NavLink className='focus:text-primary text-gray-200 px-4 rounded-lg py-2' to='/home'>home</NavLink></li>
            <li><NavLink className='focus:text-primary text-gray-200 px-4 rounded-lg py-2' to='/blogs'>Blogs</NavLink></li>
            <li><NavLink className='focus:text-primary text-gray-200 px-4 rounded-lg py-2' to='/myPortfolio'>My Portfolio</NavLink></li>
            {user ? <>
                <li><NavLink className='focus:text-primary text-gray-200 px-4 rounded-lg py-2' to='/dashboard'>Dashboard</NavLink></li>
                <li className='transition ease-linear duration-300 hover:rounded-lg border-b-4 border-primary hover:bg-primary hover:text-gray-800 cursor-pointer focus:text-indigo-500 text-gray-200 px-4 py-2' onClick={handleLogout}>Logout</li>
            </> : <div>
                <li><NavLink className='bg-primary text-gray-800 px-4 rounded-lg py-2' to='/login'>Login</NavLink></li>
            </div>}
            {user && <li><p className='bg-primary text-gray-800 px-4 rounded-lg py-2'>{name}</p></li>}
        </ul>
    );
};

export default MenuItems;