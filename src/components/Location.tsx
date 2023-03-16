import React from 'react';
import { useLocation } from 'react-router-dom';

// useLocation Wrapper
export const Location = () => {
  const location = useLocation();

  const adjustLocation = (location: string) => {
    switch (location) {
      case '/':
        return 'main';
      case '/about':
        return 'about';
      default:
        return '404';
    }
  };

  return (
    <div>
      <h1>{adjustLocation(location.pathname)}</h1>
    </div>
  );
};
