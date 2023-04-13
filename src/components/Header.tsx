import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectPath, setPath } from '../features/path';

const Header = () => {
  const { path, header } = useSelector(selectPath);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    switch (pathname) {
      case '/users':
        dispatch(setPath({ path: 'Users', header: 'Sign Up a new user' }));
        break;
      case '/about':
        dispatch(setPath({ path: 'About Us', header: 'This is what it is all about' }));
        break;
      default:
        dispatch(setPath({ path: 'Main', header: 'Rick and Morty' }));
    }
  }, [location, dispatch]);

  return (
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
  );
};

export default Header;
