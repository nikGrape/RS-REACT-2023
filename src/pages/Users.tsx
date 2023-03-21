import React from 'react';

import Form from '../components/Form';
import { Page, PagePropsType } from './Page';

export default class Users extends Page {
  constructor(props: PagePropsType) {
    super(props, 'Users', 'Sign in a new user!');
  }
  render() {
    return (
      <div className="page" id="user-page">
        <Form />
      </div>
    );
  }
}
