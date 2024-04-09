import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logotwo from '../images/logo2.png'; 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../App.css';
import { HashLink } from 'react-router-hash-link';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [mobile, setMobile] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const changeBackground = () => {
    if (window.scrollY >= 900) {
      setMobile(true);
    }
    else {
      setMobile(false);
    }
  }

  window.addEventListener('scroll', changeBackground);

  return (
    <>
      <div>
        <div className={mobile ?'h-24 flex items-center justify-between fixed top-0 left-0 w-ful z-50 w-full mobile-bg-gray-1000 duration-300' : 'h-24 flex items-center justify-between fixed top-0 left-0 w-ful z-50 w-full bg-transparent duration-300'}>
          <a href="/"> <img src={logotwo} className='w-48 mx-6' alt="logo"/> </a>
          <Link to='#' className='ml-8 text-3xl'>
            <Bars3Icon className="h-6 w-6 text-white mx-9" onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active bg-gray-1000 z-50' : 'nav-menu z-50 bg-gray-1000 w-64 h-screen flex justify-center fixed top-0'}>
          <ul className='nav-menu-items w-full px-10 p-3' onClick={showSidebar}>
            <li className='navbar-toggle bg-gray-1000 w-full h-20 flex items-center mx-4 mb-24'>
                <a href="/"> <img src={logotwo} className='w-48' alt="logo"/> </a>
              <Link to='#' className='menu-bars'>
                <XMarkIcon className="h-6 w-6 text-white"/>
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={sidebar ? 'mx-4 flex items-center h-16 text-white transition-transform duration-1000 transform translate-y-[-60%] delay-500' : 'mx-4 transition-transform duration-1000 transform translate-y-[+60%] delay-1000 flex items-center h-16 text-white'}>
                  <HashLink  to={item.path} className="no-underline text-gray-500 font-bold text-2xl h-full flex hover:text-white">
                    {item.icon}
                    <span className='ml-4 whitespace-nowrap'>{item.title}</span>
                  </HashLink >
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