import React from 'react';
import { PagePropsType, Page } from './Page';

export default class About extends Page {
  constructor(props: PagePropsType) {
    super(props, 'About Us', "That's what it's all about");
  }
  render() {
    return (
      <div className="page" id="about">
        <h2>This site contains many useful resources and frameworks for web development</h2>
        <p>
          This resource was created as an assignment for the first week of
          <a href="https://www.rs.school/" target="_blank" rel="noreferrer">
            {' '}
            RS-SCHOOL{' '}
          </a>
          React boot camp 2023
        </p>
      </div>
    );
  }
}
