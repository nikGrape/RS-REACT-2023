import React, { Component } from 'react';

import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import cards from '../assets/card.json';

export default class Main extends Component<{ updateLocation: (location: string) => void }> {
  constructor(props: { updateLocation: (location: string) => void }) {
    super(props);
    props.updateLocation('Main');
  }

  render() {
    const reactCard = {
      icon: '../../public/react.svg',
      title: 'REACT',
      desc: 'the best web framework',
      link: 'https://react.dev/',
      likes: 100,
      views: 5,
    };
    return (
      <div className="page" id="main-page">
        <SearchBar />
        <h2>RS School 2023</h2>
        <div className="cards">
          {cards.cards.map((card) => (
            <Card key={card.title} {...card} />
          ))}
        </div>
      </div>
    );
  }
}
