import React, { useState } from 'react';
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

const Card = (props: CardProps) => {
  const [state, setState] = useState({
    likes: props.likes,
    views: props.views,
  });

  const { likes, views } = state;
  const { icon, title, desc } = props;

  const addLike = () => {
    setState((state) => ({
      ...state,
      likes: state.likes + 1,
    }));
  };

  return (
    <div className="card" data-testid="card">
      <img className="card-icon" src={icon} alt={`${title} icon`} />
      <h4 className="card-title">{title}</h4>
      <p role="definition" className="card-desc">
        {desc}
      </p>
      <span>
        <p className="card-likes" data-testid="card-likes" onClick={addLike}>
          <FontAwesomeIcon icon={faThumbsUp} />
          {likes}
        </p>
        <p className="card-views">
          <FontAwesomeIcon icon={faEye} />
          {views}
        </p>
      </span>
    </div>
  );
};

export default Card;
