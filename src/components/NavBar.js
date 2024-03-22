import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Transition } from '@headlessui/react'
import logo from '../images/logo.png'; 
import logotwo from '../images/logo2.png'; 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../App.css';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div>
        <div className='bg-zinc-900 h-24 flex items-center justify-between'>
            <img src={logotwo} className='w-48 mx-6'/>
          <Link to='#' className='ml-8 text-3xl'>
            <Bars3Icon className="h-6 w-6 text-white mx-9" onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active bg-zinc-950 ' : 'nav-menu bg-zinc-950 w-64 h-screen flex justify-center fixed top-0'}>
          <ul className='nav-menu-items w-full px-10 p-3' onClick={showSidebar}>
            <li className='navbar-toggle bg-zinc-950 w-full h-20 flex items-center mx-4 mb-10'>
                <img src={logotwo} className='w-48'/>
              <Link to='#' className='menu-bars'>
                <XMarkIcon className="h-6 w-6 text-white"/>
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className="flex items-center h-16 text-white">
                  <Link to={item.path} className="no-underline text-gray-500 font-bold text-2xl h-full flex hover:text-white">
                    {item.icon}
                    <span className='ml-4'>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navbar;