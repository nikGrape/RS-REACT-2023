import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Location } from './Location';

export default class Header extends Component {
  render() {
    return (
      <div id="app-header">
        <Location />
        <Link to="/">Main</Link>
        <Link to="/about">About</Link>
        <Link to="/404">404</Link>
      </div>
    );
  }
}
