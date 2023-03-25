import React, { Component } from 'react';
import { UserInterface } from './User';

export default class UserCard extends Component<UserInterface> {
  render() {
    const {
      firstname,
      lastname,
      brainWeight,
      zip,
      birthdate,
      male,
      policy,
      datashere,
      flatEarth,
      cardColor,
      bio,
      avatar,
    } = this.props;

    return (
      <div className={`card user-card new-card ${cardColor}`} data-testid="card">
        <div className="avatar-box">
          <img className="avatar" src={avatar} alt={`avatar`} />
        </div>
        <h4 className="card-title">{`${firstname} ${lastname}`}</h4>
        <time>Birthday: {new Date(birthdate).toDateString()}</time>
        <p>Sex: {male ? 'Male' : 'Female'}</p>
        <p>Brain Weight: {brainWeight}</p>
        <p>ZIP: {zip}</p>
        <p className="card-desc">Bio: {bio}</p>
        <p>
          Agreed to: {datashere && 'Share data'}
          {policy && ', Policy'}
        </p>
        <p>{!flatEarth && 'I believe that Earth is flat!'}</p>
      </div>
    );
  }
}
