import React from 'react';

import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import cards from '../assets/card.json';
import { PagePropsType, Page } from './AbstractPage';

export default class Main extends Page {
  constructor(props: PagePropsType) {
    super(props, 'Main', 'Usefull resources to work with Web development');
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
