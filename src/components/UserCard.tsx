import React, { Component } from 'react';

export interface UserInterface {
  firstname: string;
  lastname: string;
  brainWeight: number;
  zip: string;
  birthdate: Date;
  male: boolean;
  female: boolean;
  policy: boolean;
  datashere: boolean;
  flatEarth: boolean;
  cardColor: string;
  bio: string;
  avatar: string;
}

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
      //   cardColor,
      bio,
      avatar,
    } = this.props;

    return (
      <div className="card" data-testid="card">
        <img className="card-icon" src={avatar} alt={`avatar`} />
        <h4 className="card-title">Name: {`${firstname} ${lastname}`}</h4>
        <time>Birthday: {birthdate.toDateString()}</time>
        <p>Sex: {male ? 'Male' : 'Female'}</p>
        <p>My Brain Weight: {brainWeight}</p>
        <p>ZIP: {zip}</p>
        <p className="card-desc">Bio: {bio}</p>
        <p>
          Permitions: {policy && 'Policy'} {datashere && 'Share my data'}
        </p>
        <p>{!flatEarth && 'I believe that Earth is flat!'}</p>
      </div>
    );
  }
}
