import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { selectApp } from '../redux/appSlice';

const Header = () => {
  const location = useLocation();
  const { showHeader } = useSelector(selectApp);

  const getPathAndHeader = useCallback((pathname: string) => {
    switch (pathname) {
      case '/users':
        return ['Users', 'Sign Up a new user'];
      case '/about':
        return ['About Us', 'This is what it is all about'];
      case '/':
        return ['Main', 'Rick and Morty'];
      default:
        return ['#', 'Page not found'];
    }
  }, []);

  const pathAndHeader = getPathAndHeader(location.pathname);
  const [path, setPath] = useState(pathAndHeader[0]);
  const [header, setHeader] = useState(pathAndHeader[1]);

  useEffect(() => {
    const pathAndHeader = getPathAndHeader(location.pathname);
    setPath(pathAndHeader[0]);
    setHeader(pathAndHeader[1]);
  }, [location, getPathAndHeader]);

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
