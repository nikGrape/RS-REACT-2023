import React, { Component, Fragment } from 'react';

export default class Brain extends Component<{
  brainWeight: { ref: React.RefObject<HTMLInputElement>; err: boolean };
}> {
  render() {
    return (
      <Fragment>
        <input
          type="number"
          name="brain"
          placeholder="Brain Weight (grams)"
          ref={this.props.brainWeight.ref}
          className={this.props.brainWeight.err ? 'flash-error' : ''}
        />
        {this.props.brainWeight.err && (
          <p className="error">Brain weight shold be in range of 1000-1500</p>
        )}
      </Fragment>
    );
  }
}
