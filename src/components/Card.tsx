import React, { useState } from 'react';

import { MiniCard } from './MiniCard';
import { ModalCard } from './ModalCard';

export interface CardProps {
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
}

const Card = (props: CardProps) => {
  const [showModalWindow, setShowModalWindow] = useState(false);

  return (
    <>
      {showModalWindow && <ModalCard {...props} hideModalCard={setShowModalWindow} />}
      <MiniCard {...props} showModalCard={setShowModalWindow} />
    </>
  );
};

export default Card;
