import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

type keyType = '/' | '/users' | '/about';

const Header = () => {
  const [activeLink, setActiveLink] = useState<keyType>('/');

  const links = {
    '/': ['Main', 'Rick and Morty'],
    '/users': ['Users', 'Sign Up a new user'],
    '/about': ['About Us', 'This is what it is all about'],
  };

  const getHeader: (key: keyType) => string[] = (key) => {
    return links[key];
  };

  return (
    <div id="app-header">
      <h1>{getHeader(activeLink)[0]}</h1>
      <h3>{getHeader(activeLink)[1]}</h3>
      <div id="links">
        {[...Object.keys(links)].map((link) => (
          <NavLink
            to={link}
            key={link}
            className={({ isActive }) => (isActive ? 'active-link' : '')}
            onClick={() => setActiveLink(link as keyType)}
          >
            {getHeader(link as keyType)[0]}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Header;
