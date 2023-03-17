import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faEye } from '@fortawesome/free-solid-svg-icons';

export interface CardProps {
  icon: string;
  title: string;
  desc: string;
  link: string;
  likes: number;
  views: number;
}

interface CardState {
  likes: number;
  views: number;
}

export default class Card extends Component<CardProps, CardState> {
  constructor(props: CardProps) {
    super(props);
    this.state = {
      likes: props.likes,
      views: props.views,
    };

    this.clickLike = this.clickLike.bind(this);
  }

  clickLike() {
    this.setState((state) => ({
      ...state,
      likes: state.likes + 1,
    }));
  }

  render() {
    return (
      <div className="card">
        <a href={this.props.link} rel="noreferrer" target="_blank">
          <img
            className="card-icon"
            id={`${this.props.title.toLocaleLowerCase()}-svg`}
            src={this.props.icon}
            alt={`${this.props.title} icon`}
          />
        </a>
        <h4 className="card-title">{this.props.title}</h4>
        <p className="card-desc">{this.props.desc}</p>
        <span className="card-likes-views">
          <p className="card-likes" onClick={this.clickLike}>
            <FontAwesomeIcon icon={faThumbsUp} />
            {this.state.likes}
          </p>
          <p className="card-views">
            <FontAwesomeIcon icon={faEye} />
            {this.state.views}
          </p>
        </span>
      </div>
    );
  }
}
