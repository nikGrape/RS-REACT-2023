import React, { Component } from 'react';

import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import cards from '../assets/card.json';

export default class Main extends Component<{
  updateLocation: (location: string, topic: string) => void;
}> {
  constructor(props: { updateLocation: (location: string, topic: string) => void }) {
    super(props);
    props.updateLocation('Main', 'Usefull resources to work with Web development');
  }

  render() {
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
  }
}
