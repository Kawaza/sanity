import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
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
        <div className='h-24 flex items-center justify-between fixed top-0 left-0 w-ful z-50 w-full'>
            <img src={logotwo} className='w-48 mx-6'/>
          <Link to='#' className='ml-8 text-3xl'>
            <Bars3Icon className="h-6 w-6 text-white mx-9" onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active bg-gray-800 z-50' : 'nav-menu z-50 bg-gray-800 w-64 h-screen flex justify-center fixed top-0'}>
          <ul className='nav-menu-items w-full px-10 p-3' onClick={showSidebar}>
            <li className='navbar-toggle bg-gray-800 w-full h-20 flex items-center mx-4 mb-24'>
                <img src={logotwo} className='w-48'/>
              <Link to='#' className='menu-bars'>
                <XMarkIcon className="h-6 w-6 text-white"/>
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={sidebar ? 'mx-4 flex items-center h-16 text-white transition-transform duration-1000 transform translate-y-[-60%] delay-200' : 'mx-4 transition-transform duration-1000 transform translate-y-[+60%] delay-200 flex items-center h-16 text-white'}>
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