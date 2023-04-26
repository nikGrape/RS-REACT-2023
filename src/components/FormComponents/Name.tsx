import React, { Component, Fragment } from 'react';

interface PersonalInfoProps {
  firstname: { ref: React.RefObject<HTMLInputElement>; err: boolean };
  lastname: { ref: React.RefObject<HTMLInputElement>; err: boolean };
}

export default class PersonalInfo extends Component<PersonalInfoProps> {
  render() {
    return (
      <Fragment>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          className={this.props.firstname.err ? 'flash-error' : ''}
          ref={this.props.firstname.ref}
        />
        {this.props.firstname.err && (
          <p className="error">
            First name lenght should be at listh 2 simbols and start with capital letter
          </p>
        )}
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          ref={this.props.lastname.ref}
          className={this.props.lastname.err ? 'flash-error' : ''}
        />
        {this.props.lastname.err && (
          <p className="error">
            Last name lenght should be at listh 2 simbols and start with capital letter
          </p>
        )}
      </Fragment>
    );
  }
}
