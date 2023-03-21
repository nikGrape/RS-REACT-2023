import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component<{ location: string; topic?: string }, object> {
  constructor(props: { location: string; topic?: string }) {
    super(props);
  }

  activeStyle = (isActive: boolean) =>
    isActive
      ? {
          color: 'darkblue',
          textDecoration: 'none',
        }
      : {};
  render() {
    return this.props.location !== '404' ? (
      <div id="app-header">
        <h1>{this.props.location}</h1>
        <h3>{this.props.topic}</h3>
        <div id="links">
          <NavLink to="/" style={({ isActive }) => this.activeStyle(isActive)}>
            Main
          </NavLink>
          <NavLink to="/about" style={({ isActive }) => this.activeStyle(isActive)}>
            About
          </NavLink>
          <NavLink to="/users" style={({ isActive }) => this.activeStyle(isActive)}>
            Users
          </NavLink>
        </div>
      </div>
    ) : (
      <div />
    );
  }
}
