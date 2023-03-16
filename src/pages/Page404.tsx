import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Page404 extends Component {
  render() {
    return (
      <div id="page-not-found">
        <h1>Oops</h1>
        <p data-testid="page-not-found">page not found!</p>
        <Link to="/">GO HOME</Link>
      </div>
    );
  }
}
