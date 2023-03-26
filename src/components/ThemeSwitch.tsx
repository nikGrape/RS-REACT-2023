import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';

export default class ThemeSwitch extends Component<object, { theme: string }> {
  constructor(props: object) {
    super(props);
    this.state = {
      theme: 'light',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.state.theme == 'light') {
      this.setState({ theme: 'dark' });
    } else {
      this.setState({ theme: 'light' });
    }
  }

  dark = `body {
	--color: rgba(255, 255, 255, 0.87);
	--background-color: #242424;
	--cards-color: #353535;
	--serch-bar-border: rgb(183, 160, 238);
	--error-color: rgb(121, 98, 103);
	--active-link-color: #c8caf5;
	--avatar-upload-hover: #362857;
	--avatar-upload-select: rgb(58, 82, 58);
	--button-color: #1a1a1a;
  }`;
  light = `body { 
	--color: #213547;
	--background-color: whitesmoke;
	--cards-color: white;
	--serch-bar-border: #213547;
	--error-color: rgb(251, 192, 204);
	--active-link-color: #242cb3;
	--avatar-upload-hover: #c8caf5;
	--avatar-upload-select: rgb(178, 241, 178);
	--button-color: #dbdbdb;
  }`;

  render() {
    return (
      <div onClick={this.handleClick} className="theme">
        <Helmet>
          <style>{this.state.theme == 'light' ? this.light : this.dark}</style>
        </Helmet>
        {this.state.theme == 'light' ? (
          <FontAwesomeIcon icon={faSun} />
        ) : (
          <FontAwesomeIcon icon={faMoon} />
        )}
      </div>
    );
  }
}
