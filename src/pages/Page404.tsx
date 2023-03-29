import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Page404Props {
  showHeader: (showHeader: boolean) => void;
}

const Page404 = ({ showHeader }: Page404Props) => {
  const showHeaderRef = useRef(showHeader);

  useEffect(() => {
    const showHeader = showHeaderRef.current;
    showHeader(false);
    return () => {
      showHeader(true);
    };
  }, []);

  return (
    <div id="page-not-found" className="page">
      <h1>404</h1>
      <p data-testid="page-not-found">page not found!</p>
      <Link to="/">GO HOME</Link>
    </div>
  );
};

export default Page404;
