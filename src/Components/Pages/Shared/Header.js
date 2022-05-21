import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuItems from './MenuItems';
import { MenuAlt3Icon } from '@heroicons/react/solid';

const Header = () => {
    const [active, setActive] = useState(false);

    return (
        <div className=' w-full flex justify-between items-center px-10 py-4'>
            <div>
                <h2 className='text-warning text-2xl flex'>Mr Computer Tools</h2>
            </div>

            <nav>
                <div className='absolute right-6 md:hidden top-4'>
                    <MenuAlt3Icon onClick={() => setActive(!active)} className="h-8 w-8 text-indigo-500 cursor-pointer" />
                </div>

                <ul className='hidden md:flex gap-10 uppercase'>
                    <li><Link className='hover:text-warning text-gray-800 px-4 rounded-lg py-2' to='/'>home</Link></li>
                </ul>

                <MenuItems setActive={setActive} active={active} />
            </nav>
        </div>
    );
};

export default Header;