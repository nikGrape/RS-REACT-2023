import React, { Component } from 'react';

export default class About extends Component<{
  updateLocation: (location: string, topic: string) => void;
}> {
  constructor(props: { updateLocation: (location: string, topic: string) => void }) {
    super(props);
    props.updateLocation('About Us', "That's what it's all about");
  }
  render() {
    return (
      <div className="page">
        <h2>WEEK ONE OF RS-REACT BOOT CAMP</h2>
      </div>
    );
  }
}
