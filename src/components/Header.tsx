import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component<{ location: string; topic?: string }, object> {
  constructor(props: { location: string; topic?: string }) {
    super(props);
  }
  render() {
    return this.props.location !== '404' ? (
      <div id="app-header">
        <h1>{this.props.location}</h1>
        <h3>{this.props.topic}</h3>
        <div id="links">
          <Link to="/">Main</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
    ) : (
      <div />
    );
  }
}
