import React from 'react';

interface HintProps {
  messages: string[];
  closeHint: (showHint: boolean) => void;
}

export const Hint = ({ messages, closeHint }: HintProps) => {
  return (
    <>
      <div className="hint">
        <button type="button" className="cross" onClick={() => closeHint(false)}>
          X
        </button>
        {messages.map((msg) => (
          <p key={msg}>{msg}</p>
        ))}
      </div>
      <div className="blur"></div>
    </>
  );
};
