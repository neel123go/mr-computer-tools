import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import MenuItems from './MenuItems';
import { MenuAlt3Icon } from '@heroicons/react/solid';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../Firebase.init';
import { signOut } from 'firebase/auth';
// // import Loading from './Loading';
// import { useQuery } from 'react-query';

const Header = () => {
    const [user] = useAuthState(auth);
    const [name, setName] = useState('');

    if (user) {
        const userEmail = user?.email;
        fetch(`http://localhost:5000/user/${userEmail}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                setName(data?.userName);
            })
    }

    const [active, setActive] = useState(false);

    const handleLogout = () => {
        signOut(auth);
        localStorage.removeItem('accessToken');
    }

    return (
        <div className='w-full flex justify-between items-center px-10 py-4'>
            <Link to='/'>
                <h2 className='text-primary text-3xl text-center font-medium'>Mr.<span className='block text-accent mt-[-10px]' style={{ fontSize: '18px' }}>Computer Tools</span></h2>
            </Link>

            <nav>
                <div className='absolute right-8 top-8 md:hidden'>
                    <MenuAlt3Icon onClick={() => setActive(!active)} className="h-8 w-8 text-indigo-500 cursor-pointer" />
                </div>

                <ul className='hidden md:flex gap-6 items-center'>
                    <li><NavLink className='focus:text-indigo-500 uppercase text-gray-800 px-4 rounded-lg py-2' to='/'>home</NavLink></li>
                    <li><NavLink className='focus:text-indigo-500 uppercase text-gray-800 px-4 rounded-lg py-2' to='/purchase'>Purchase</NavLink></li>
                    {user ? <li className='transition ease-linear uppercase duration-300 hover:rounded-lg border-b-4 border-primary hover:bg-primary cursor-pointer focus:text-indigo-500 text-gray-800 px-4 py-2' onClick={handleLogout}>Logout</li> : <div>
                        <li><NavLink className='bg-primary text-gray-800 px-4 rounded-lg py-2' to='/login'>Login</NavLink></li>
                    </div>}
                    {user && <li><p className='bg-primary text-gray-800 px-4 rounded-lg py-2'>{name}</p></li>}
                </ul>

                <MenuItems setActive={setActive} active={active} user={user} name={name} handleLogout={handleLogout} />
            </nav>
        </div>
    );
};

export default Header;