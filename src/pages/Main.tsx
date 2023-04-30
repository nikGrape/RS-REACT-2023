import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import { Hint } from '../components/Hint';
import { Loading } from '../components/Loading';
import { selectSearch, setError, fetchData } from '../redux/searchSlice';
import { AppThunkDispatch } from 'store';

const Main = () => {
  const { cards, status, error, totalNumberOfPages, currentPageIndex, prevPageUrl, nextPageUrl } =
    useSelector(selectSearch);
  const dispatch = useDispatch<AppThunkDispatch>();

  return (
    <div className="page" id="main-page">
      <SearchBar />
      {status === 'pending' ? (
        <Loading />
      ) : (
        <div className="cards">
          {cards.map((card, idx) => (
            <Card {...card} key={idx} />
          ))}
        </div>
      )}
      {status !== 'pending' && (
        <div className="prev-next-buttons">
          <button
            type="button"
            onClick={() => {
              if (prevPageUrl) dispatch(fetchData(prevPageUrl));
            }}
          >
            prev
          </button>
          <div>{`${currentPageIndex}/${totalNumberOfPages}`}</div>
          <button
            type="button"
            onClick={() => {
              if (nextPageUrl) dispatch(fetchData(nextPageUrl));
            }}
          >
            next
          </button>
        </div>
      )}
      {error && error != 'canceled' && (
        <Hint
          closeHint={() => dispatch(setError(null))}
          messages={['Oooops!', "We didn't find anything with your request!", error.toString()]}
        />
      )}
    </div>
  );
};

export default Main;
