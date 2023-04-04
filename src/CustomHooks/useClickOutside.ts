import React, { useEffect, useCallback } from 'react';

export default function useClickOutside(calback: () => void, ref: React.RefObject<HTMLElement>) {
  const onClick = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Element)) {
        calback();
      }
    },
    [ref, calback]
  );

  useEffect(() => {
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
    };
  }, [onClick]);
}
