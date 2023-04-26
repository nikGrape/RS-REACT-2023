import React, { Component, Fragment } from 'react';

export default class BirthDate extends Component<{
  birthdate: { ref: React.RefObject<HTMLInputElement>; err: boolean };
}> {
  render() {
    return (
      <Fragment>
        <label htmlFor="birthdate">
          Birth Date:
          <input
            type="date"
            name="birthdate"
            id="birthdate"
            placeholder="Birth Date"
            ref={this.props.birthdate.ref}
          />
        </label>
        {this.props.birthdate.err && <p className="error">You must be at least 14 years old</p>}
      </Fragment>
    );
  }
}
