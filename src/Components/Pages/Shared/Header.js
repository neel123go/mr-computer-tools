import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import MenuItems from './MenuItems';
import { MenuAlt3Icon } from '@heroicons/react/solid';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../Firebase.init';
import { signOut } from 'firebase/auth';

const Header = () => {
    const [user] = useAuthState(auth);
    const [name, setName] = useState(null);
    const [active, setActive] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        if (user) {
            const userEmail = user?.email;
            fetch(`http://localhost:5000/user/${userEmail}`)
                .then(res => res.json())
                .then(data => {
                    setName(data?.userName);
                })
        }
    }, [user]);

    const handleLogout = () => {
        signOut(auth);
        localStorage.removeItem('accessToken');
    }

    return (
        <div className='w-full flex justify-between items-center px-10 py-4'>
            <div className='flex justify-center items-center'>
                {pathname.includes("dashboard") && <label htmlFor="my-drawer-2" tabIndex="0" className="btn lg:hidden pl-0 pr-8 btn-link">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                </label>}

                <Link to='/'>
                    <h2 className='text-primary text-3xl text-center font-medium'>Mr.<span className='block text-accent mt-[-10px]' style={{ fontSize: '18px' }}>Computer Tools</span></h2>
                </Link>
            </div>


            <nav>
                <div className='absolute right-8 top-8 md:hidden'>
                    <MenuAlt3Icon onClick={() => setActive(!active)} className="h-8 w-8 text-indigo-500 cursor-pointer" />
                </div>

                <ul className='hidden md:flex gap-6 items-center'>
                    <li><NavLink className='focus:text-indigo-500 uppercase text-gray-800 px-4 rounded-lg py-2' to='/home'>home</NavLink></li>
                    {user ? <>
                        <li><NavLink className='focus:text-indigo-500 uppercase text-gray-800 px-4 rounded-lg py-2' to='/dashboard'>Dashboard</NavLink></li>
                        <li className='transition ease-linear uppercase duration-300 hover:rounded-lg border-b-4 border-primary hover:bg-primary cursor-pointer focus:text-indigo-500 text-gray-800 px-4 py-2' onClick={handleLogout}>Logout</li>
                    </> :
                        <li><NavLink className='bg-primary text-gray-800 px-4 rounded-lg py-2' to='/login'>Login</NavLink></li>}
                    {user && <li><p className='bg-primary text-gray-800 px-4 rounded-lg py-2'>{name || user.displayName}</p></li>}
                </ul>

                <MenuItems setActive={setActive} active={active} user={user} name={name} handleLogout={handleLogout} />
            </nav>
        </div>
    );
};

export default Header;