import React from 'react';
import { User } from './Form';

const UserCard = (props: User) => {
  const {
    firstname,
    lastname,
    brainWeight,
    zip,
    birthdate,
    sex,
    policy,
    datashere,
    flatEarth,
    cardColor,
    bio,
    avatar,
  } = props;

  return (
    <div className={`card user-card new-card ${cardColor.toLocaleLowerCase()}`} data-testid="card">
      <div className="avatar-box">
        <img className="avatar" src={avatar} alt={`avatar`} />
      </div>
      <h4 className="card-title">{`${firstname} ${lastname}`}</h4>
      <time>Birthday: {new Date(birthdate).toDateString()}</time>
      <p>Sex: {sex == 'Male' ? 'Male' : 'Female'}</p>
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
};

export default UserCard;
