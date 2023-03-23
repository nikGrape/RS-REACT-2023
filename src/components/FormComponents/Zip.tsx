import React, { Component, Fragment } from 'react';

export default class ZIP extends Component<{
  zip: { ref: React.RefObject<HTMLInputElement>; err: boolean };
}> {
  render() {
    return (
      <Fragment>
        <input
          type="text"
          name="zip"
          placeholder="ZIP"
          ref={this.props.zip.ref}
          className={this.props.zip.err ? 'flash-error' : ''}
        />
        {this.props.zip.err && (
          <p className="error">ZIP must contain only numbers and have length 4-8</p>
        )}
      </Fragment>
    );
  }
}
