import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const ThemeSwitch = () => {
  const [theme, setTheme] = useState('light');

  const dark = `body {
		--color: rgba(255, 255, 255, 0.87);
		--background-color: #242424;
		--cards-color: #353535;
		--serch-bar-border: rgb(183, 160, 238);
		--error-color: rgb(121, 98, 103);
		--active-link-color: #c8caf5;
		--avatar-upload-hover: #362857;
		--avatar-upload-select: rgb(58, 82, 58);
		--button-color: #1a1a1a;
	  }`;
  const light = `body { 
		--color: #213547;
		--background-color: whitesmoke;
		--cards-color: white;
		--serch-bar-border: #213547;
		--error-color: rgb(251, 192, 204);
		--active-link-color: #242cb3;
		--avatar-upload-hover: #c8caf5;
		--avatar-upload-select: rgb(178, 241, 178);
		--button-color: #dbdbdb;
	  }`;

  const handleClick = () => {
    if (theme == 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <HelmetProvider>
      <div onClick={handleClick} className="theme" role="button">
        <Helmet>
          <style>{theme == 'light' ? light : dark}</style>
        </Helmet>
        {theme == 'light' ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
      </div>
    </HelmetProvider>
  );
};

export default ThemeSwitch;
