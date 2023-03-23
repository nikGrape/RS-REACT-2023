import React, { Component } from 'react';

import Form from '../components/Form';
import { PagePropsType } from './AbstractPage';
import UserCard from '../components/UserCard';
import { UserInterface } from '../components/User';

interface UsersState {
  users: UserInterface[];
  success: boolean;
}

export default class UsersPage extends Component<PagePropsType, UsersState> {
  constructor(props: PagePropsType) {
    super(props);
    props.updateLocation('Users', 'Sign in a new user!');
    this.state = { users: [], success: false };
    this.pushUser = this.pushUser.bind(this);
  }

  componentDidMount() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    this.setState({ users: users });
  }

  componentWillUnmount() {
    if (this.state.users.length > 0)
      localStorage.setItem('users', JSON.stringify(this.state.users));
  }

  successMessage() {
    this.setState((state) => ({
      ...state,
      success: true,
    }));
    setTimeout(() => {
      this.setState((state) => ({ ...state, success: false }));
    }, 2500);
  }

  pushUser(user: UserInterface) {
    if (user) {
      this.successMessage();
      this.setState((state) => ({
        users: [...state.users, user],
      }));
    }
  }

  render() {
    return (
      <div className="page" id="user-page">
        {this.state.success && (
          <div className="success-message">The user was successfully added</div>
        )}
        <Form pushUser={this.pushUser} />
        <div className="cards user-cards">
          {this.state.users.map((user, i) => (
            <UserCard {...user} key={i + user.lastname} />
          ))}
        </div>
      </div>
    );
  }
}
