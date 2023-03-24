import React, { Component } from 'react';

export default class CardColor extends Component<{
  cardColor: { ref: React.RefObject<HTMLSelectElement>; err: boolean };
}> {
  render() {
    return (
      <label htmlFor="card-color">
        <select name="cardColor" id="card-color" ref={this.props.cardColor.ref}>
          <option value="">Choose Your Card Color</option>
          <option>Blue</option>
          <option>Green</option>
          <option>Yellow</option>
          <option>Purple</option>
          <option>Red</option>
        </select>
      </label>
    );
  }
}
