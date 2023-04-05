import React from 'react';
import { CardProps } from './Card';
interface ModalCardProps extends CardProps {
  hideModalCard: (value: boolean) => void;
}

export const ModalCard = (props: ModalCardProps) => {
  const { name, status, species, type, gender, image, origin, location, hideModalCard } = props;

  const episodes = props.episode.map((ep) => {
    const epNum = ep.match(/\d+$/);
    return epNum ? epNum[0] : 0;
  });

  return (
    <div>
      <div className="modal-window">
        <button type="button" className="cross" onClick={() => hideModalCard(false)}>
          X
        </button>
        <img className="card-icon-big" src={image} alt={`${name}-image`} />
        <h1 className="card-title">{name}</h1>
        <p>{`Species: ${species}`}</p>
        <p>{`Status: ${status}`}</p>
        <p>{`Gender: ${gender}`}</p>
        {type && <p>{`Type: ${type}`}</p>}
        <p>{`Origin: ${origin.name}`}</p>
        <p>{`Location: ${location.name}`}</p>
        <p>Episodes: [ {episodes.join(', ')} ]</p>
      </div>
      <div className="blur" onClick={() => hideModalCard(false)}></div>
    </div>
  );
};
