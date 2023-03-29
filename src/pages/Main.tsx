import React from 'react';

import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import cards from '../assets/card.json';

const Main = () => {
  return (
    <div className="page" id="main-page">
      <SearchBar />
      <div className="cards">
        {cards.cards.map((card) => (
          <Card key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Main;
