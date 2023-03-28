import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
  const [state, setState] = useState({
    search: localStorage.getItem('search') || '',
  });

  const { search } = state;

  useEffect(() => {
    return () => {
      localStorage.setItem('search', search);
    };
  }, [search]);

  return (
    <div id="search-bar">
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input
        type="text"
        name="search"
        id="search-input"
        placeholder="search bar"
        value={search}
        onChange={(e) => {
          setState({ search: e.target.value });
        }}
      />
    </div>
  );
};

export default SearchBar;
