import React from 'react';
import { Link } from 'react-router-dom';
import { PagePropsType, Page } from './AbstractPage';

export default class Page404 extends Page {
  constructor(props: PagePropsType) {
    super(props, '404');
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
