import React from 'react';
import { useLocation } from 'react-router-dom';

// useLocation Wrapper
export const Location = () => {
  const location = useLocation();

  const adjustLocation = (location: string) => {
    switch (location) {
      case '/':
        return 'Main';
      case '/about':
        return 'About Us';
      default:
        return '404';
    }
  };

  return (
    <div>
      <h1 id="location">{adjustLocation(location.pathname)}</h1>
    </div>
  );
};
