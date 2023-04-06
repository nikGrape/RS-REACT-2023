import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Page404 extends Component<{ updateLocation: (location: string) => void }> {
  constructor(props: { updateLocation: (location: string) => void }) {
    super(props);
    props.updateLocation('404');
  }

  render() {
    return (
      <div id="page-not-found" className="page">
        <h1>404</h1>
        <p data-testid="page-not-found">page not found!</p>
        <Link to="/">GO HOME</Link>
      </div>
    );
  }
}
