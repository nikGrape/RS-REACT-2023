import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [activeLink, setActiveLink] = useState('/');

  const links = new Map<string, string[]>();
  links.set('/', ['Main', 'Usefull resources to work with Web development']);
  links.set('/users', ['Users', 'Sign Up a new user']);
  links.set('/about', ['About Us', 'This is what it is all about']);

  const getHeader: (key: string) => string[] = (key) => {
    const res = links.get(key);
    if (res) return res;
    return ['', ''];
  };

  return (
    <div id="app-header">
      <h1>{getHeader(activeLink)[0]}</h1>
      <h3>{getHeader(activeLink)[1]}</h3>
      <div id="links">
        {[...links.keys()].map((link) => (
          <NavLink
            to={link}
            key={link}
            className={({ isActive }) => (isActive ? 'active-link' : '')}
            onClick={() => setActiveLink(link)}
          >
            {getHeader(link)[0]}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Header;
