import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import MenuItems from './MenuItems';
import { MenuAlt3Icon } from '@heroicons/react/solid';

const Header = () => {
    const [active, setActive] = useState(false);

    return (
        <div className='w-full flex justify-between items-center px-10 py-4'>
            <Link to='/'>
                <h2 className='text-primary text-3xl text-center font-medium'>Mr.<span className='block text-accent mt-[-10px]' style={{ fontSize: '18px' }}>Computer Tools</span></h2>
            </Link>

            <nav>
                <div className='absolute right-8 top-8 md:hidden'>
                    <MenuAlt3Icon onClick={() => setActive(!active)} className="h-8 w-8 text-indigo-500 cursor-pointer" />
                </div>

                <ul className='hidden md:flex gap-6 uppercase'>
                    <li><NavLink className='focus:text-indigo-500 text-gray-800 px-4 rounded-lg py-2' to='/'>home</NavLink></li>
                    <li><NavLink className='focus:text-indigo-500 text-gray-800 px-4 rounded-lg py-2' to='/'>About</NavLink></li>
                    <li><NavLink className='bg-primary text-gray-800 px-4 rounded-lg py-2' to='/login'>Login</NavLink></li>
                </ul>

                <MenuItems setActive={setActive} active={active} />
            </nav>
        </div>
    );
};

export default Header;