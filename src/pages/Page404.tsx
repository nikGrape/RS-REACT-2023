import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setShowHeader } from '../redux/appSlice';

const Page404 = () => {
  const dispatch = useDispatch();
  // const showHeaderRef = useRef(showHeader);

  useEffect(() => {
    // const showHeader = showHeaderRef.current;
    dispatch(setShowHeader(false));
    return () => {
      dispatch(setShowHeader(true));
    };
  }, [dispatch]);

  return (
    <div id="page-not-found" className="page">
      <h1>404</h1>
      <p data-testid="page-not-found">page not found!</p>
      <Link to="/">GO HOME</Link>
    </div>
  );
};

export default Page404;
