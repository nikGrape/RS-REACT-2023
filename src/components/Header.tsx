import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { selectApp } from '../features/app';

const Header = () => {
  const [path, setPath] = useState('Main');
  const [header, setHeader] = useState('Rick and Morty');
  const location = useLocation();
  const { showHeader } = useSelector(selectApp);

  useEffect(() => {
    const pathname = location.pathname;
    switch (pathname) {
      case '/users':
        setPath('Users');
        setHeader('Sign Up a new user');
        break;
      case '/about':
        setPath('About Us');
        setHeader('This is what it is all about');
        break;
      case '/':
        setPath('Main');
        setHeader('Rick and Morty');
        break;
      default:
        setPath('#');
        setHeader('Page not found');
    }
  }, [location]);

  return (
    <Fragment>
      {showHeader && (
        <div id="app-header">
          <h1>{path}</h1>
          <h3>{header}</h3>
          <div id="links">
            <NavLink to={'/'} className={({ isActive }) => (isActive ? 'active-link' : '')}>
              Home
            </NavLink>
            <NavLink to={'/users'} className={({ isActive }) => (isActive ? 'active-link' : '')}>
              Users
            </NavLink>
            <NavLink to={'/about'} className={({ isActive }) => (isActive ? 'active-link' : '')}>
              About
            </NavLink>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Header;
