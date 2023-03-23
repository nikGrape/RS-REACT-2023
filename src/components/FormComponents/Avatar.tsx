import React, { Component, Fragment } from 'react';

export default class Avatar extends Component<{
  avatar: { ref: React.RefObject<HTMLInputElement>; err: boolean };
}> {
  render() {
    return (
      <Fragment>
        <label className="avatar">
          Avatar:
          <input type="file" name="avatar" ref={this.props.avatar.ref} placeholder="Avarat" />
        </label>
        {this.props.avatar.err && <p className="error">Avatar Error</p>}
      </Fragment>
    );
  }
}
