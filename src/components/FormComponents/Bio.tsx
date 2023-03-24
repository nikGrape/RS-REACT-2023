import React, { Component } from 'react';

export default class Bio extends Component<{
  bio: { ref: React.RefObject<HTMLTextAreaElement>; err: boolean };
}> {
  render() {
    return (
      <textarea
        name="bio"
        cols={30}
        rows={1}
        ref={this.props.bio.ref}
        placeholder="type in your bio"
      ></textarea>
    );
  }
}
