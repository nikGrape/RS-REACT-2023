import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faEye } from '@fortawesome/free-solid-svg-icons';
import { CardProps } from './Card';

interface MiniCardProps extends CardProps {
  showModalCard: (value: boolean) => void;
}

export const MiniCard = (props: MiniCardProps) => {
  const [likes, addLike] = useState(0);
  const [views, setViews] = useState(0);
  const { name, status, species, image, showModalCard } = props;
  const likesRef = useRef<HTMLParagraphElement | null>(null);

  const onClick = (e: React.MouseEvent) => {
    if (likesRef.current && likesRef.current?.contains(e.target as Element)) return;
    showModalCard(true);
    setViews(views + 1);
  };

  return (
    <div className="card" data-testid="card" onClick={(e) => onClick(e)}>
      <img className="card-icon" src={image} alt={`${name}-image`} />
      <h4 className="card-title">{name}</h4>
      <p role="definition" className="card-desc">
        {`${species} (${status})`}
      </p>
      <span>
        <p
          ref={likesRef}
          className="card-likes"
          data-testid="card-likes"
          onClick={() => addLike(likes + 1)}
        >
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
