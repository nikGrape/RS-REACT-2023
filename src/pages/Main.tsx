import React, { Component } from 'react';

import SearchBar from '../components/SearchBar';

export default class Main extends Component<{ updateLocation: (location: string) => void }> {
  constructor(props: { updateLocation: (location: string) => void }) {
    super(props);
    props.updateLocation('Main');
  }
  render() {
    return (
      <div className="page">
        <SearchBar />
        <h2>RS School 2023</h2>
      </div>
    );
  }
}
