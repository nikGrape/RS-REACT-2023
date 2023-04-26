import React, { Component, Fragment } from 'react';

export default class Check extends Component<{
  policy: { ref: React.RefObject<HTMLInputElement>; err: boolean };
  datashere: { ref: React.RefObject<HTMLInputElement>; err: boolean };
  flatEarth: { ref: React.RefObject<HTMLInputElement>; err: boolean };
}> {
  render() {
    return (
      <Fragment>
        <div className="input-group">
          <label htmlFor="policy">
            <input type="checkbox" name="policy" id="policy" ref={this.props.policy.ref} />I agree
            to the private policy
          </label>

          <label htmlFor="datashere">
            <input
              type="checkbox"
              name="datashere"
              id="datashere"
              ref={this.props.datashere.ref}
              className={this.props.datashere.err ? 'flash-error' : ''}
            />
            I agree to share my personal data
          </label>

          <label htmlFor="flatEarth">
            <input type="checkbox" name="flatEarth" id="flatEarth" ref={this.props.flatEarth.ref} />
            {'I agree that Earth is not flat'}
          </label>
        </div>
        <div className="check-errors">
          <div className="keep30">
            {this.props.policy.err && <p className="error">Policy Error</p>}
          </div>
          <div className="keep30">
            {this.props.datashere.err && (
              <p className="error">You have to agree to share your data</p>
            )}
          </div>
          <div className="keep30">
            {this.props.flatEarth.err && (
              <p className="error">
                If you believe in flat Earth your brain weight cannot be more than 1050!
              </p>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}
