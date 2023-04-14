import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import { Hint } from '../components/Hint';
import { Loading } from '../components/Loading';
import { selectSearch, setUrl, setError } from '../features/search';

const Main = () => {
  const { cards, loading, error, totalNumberOfPages, currentPageIndex, prevPageUrl, nextPageUrl } =
    useSelector(selectSearch);
  const dispatch = useDispatch();

  return (
    <div className="page" id="main-page">
      <SearchBar />
      {loading ? (
        <Loading />
      ) : (
        <div className="cards">
          {cards.map((card, idx) => (
            <Card {...card} key={idx} />
          ))}
        </div>
      )}
      {!loading && (
        <div className="prev-next-buttons">
          <button
            type="button"
            onClick={() => {
              if (prevPageUrl) dispatch(setUrl(prevPageUrl));
            }}
          >
            prev
          </button>
          <div>{`${currentPageIndex}/${totalNumberOfPages}`}</div>
          <button
            type="button"
            onClick={() => {
              if (nextPageUrl) dispatch(setUrl(nextPageUrl));
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
