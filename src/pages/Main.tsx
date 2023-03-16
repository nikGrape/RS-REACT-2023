import React, { Component } from 'react';

import SearchBar from '../components/SearchBar';

export default class Main extends Component {
  render() {
    return (
      <div className="page">
        <SearchBar />
        <h1>RS School 2023</h1>
      </div>
    );
  }
}
