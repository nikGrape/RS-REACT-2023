import React, { Component } from 'react';

export default class Sex extends Component<{
  male: { ref: React.RefObject<HTMLInputElement>; err: boolean };
  female: { ref: React.RefObject<HTMLInputElement>; err: boolean };
}> {
  render() {
    return (
      <div className={'sex'}>
        <div className={this.props.male.err ? 'sex flash-error' : 'sex'}>
          <label>
            <input type="radio" name="sex" value="Female" ref={this.props.female.ref} />
            Female
          </label>
          <label>
            <input type="radio" name="sex" value="Male" ref={this.props.male.ref} />
            Male
          </label>
        </div>
        {this.props.male.err && <p className="error">You need to choose one</p>}
      </div>
    );
  }
}
