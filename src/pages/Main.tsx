import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import { Hint } from '../components/Hint';
import { Loading } from '../components/Loading';
import useCallAPI from '../CustomHooks/useCallAPI';
import { selectSearch, setUrl } from '../features/search';
export const BASE_URL = 'https://rickandmortyapi.com/api/character';

const Main = () => {
  const { url } = useSelector(selectSearch);
  const dispatch = useDispatch();

  const {
    cards,
    loading,
    error,
    setError,
    TotalNumberOfPages,
    currentPageIndex,
    prevPageUrl,
    nextPageUrl,
  } = useCallAPI(url);

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
          <div>{`${currentPageIndex}/${TotalNumberOfPages}`}</div>
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
          closeHint={() => setError(null)}
          messages={['Oooops!', "We didn't find anything with your request!", error.toString()]}
        />
      )}
    </div>
  );
};

export default Main;
