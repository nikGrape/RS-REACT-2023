import React, { useState } from 'react';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import { Hint } from '../components/Hint';
import { Loading } from '../components/Loading';
import useCallAPI from '../CustomHooks/useCallAPI';
export const BASE_URL = 'https://rickandmortyapi.com/api/character/';
export const LS_SEARCH_QUERY_KEY = 'search#0q2h2nl1kj3123lw9kzjee';

const Main = () => {
  const [url, setUrl] = useState<string>(localStorage.getItem(LS_SEARCH_QUERY_KEY) || '');

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
      <SearchBar setSearch={setUrl} />
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
              if (prevPageUrl) setUrl(prevPageUrl);
            }}
          >
            prev
          </button>
          <div>{`${currentPageIndex}/${TotalNumberOfPages}`}</div>
          <button
            type="button"
            onClick={() => {
              if (nextPageUrl) setUrl(nextPageUrl);
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
