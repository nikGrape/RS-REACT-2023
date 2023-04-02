import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
  const [search, setSearch] = useState(localStorage.getItem('search') || '');

  const searchRef = useRef<string>('');

  useEffect(() => {
    searchRef.current = search;
  }, [search]);

  useEffect(() => {
    return () => {
      localStorage.setItem('search', searchRef.current);
    };
  }, []);

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
          setSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
