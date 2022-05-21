import React from 'react';
import { Link } from 'react-router-dom';
import { XIcon } from '@heroicons/react/solid';

const MenuItems = ({ setActive, active }) => {
    return (
        <ul className={active ? 'md:hidden flex flex-col items-center fixed justify-center left-1/4 bg-black/20 backdrop-blur-lg gap-5 inset-0 p-8 z-30 uppercase' : 'hidden'}>
            <div>
                <XIcon onClick={() => setActive(!active)} className="cursor-pointer h-8 w-8 text-primary" />
            </div>

            <li><Link className='hover:text-primary text-white px-4 rounded-lg py-2' to='/'>home</Link></li>
        </ul>
    );
};

export default MenuItems;