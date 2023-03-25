import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

interface AvatarProps {
  avatar: { ref: React.RefObject<HTMLInputElement>; err: boolean };
  setAvatar: (img: string) => void;
  selected: boolean;
}

export default class Avatar extends Component<AvatarProps> {
  constructor(props: AvatarProps) {
    super(props);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleFileUpload({ target: { files } }: React.ChangeEvent<HTMLInputElement>) {
    if (!files) return;
    const file = files[0];
    const image = URL.createObjectURL(file);
    this.props.setAvatar(image);
  }

  render() {
    return (
      <Fragment>
        <label
          htmlFor="avatar-input"
          className={this.props.selected ? 'avatar-upload img-selected' : 'avatar-upload'}
        >
          Avatar:
          <input
            type="file"
            name="avatar"
            ref={this.props.avatar.ref}
            id="avatar-input"
            accept="image/*"
            onChange={(e) => this.handleFileUpload(e)}
          />
          <FontAwesomeIcon icon={faUserPlus} />
        </label>
        {this.props.avatar.err && <p className="error">Avatar Error</p>}
      </Fragment>
    );
  }
}
