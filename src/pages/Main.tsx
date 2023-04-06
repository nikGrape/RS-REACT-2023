import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import { CardProps } from '../components/Card';
import { Hint } from '../components/Hint';
import { Loading } from '../components/Loading';
export const BASE_URL = 'https://rickandmortyapi.com/api/character/';
export const LS_SEARCH_QUERY_KEY = 'search#0q2h2nl1kj3123lw9kzjee';

const Main = () => {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);

  const requestData = useCallback(async (search: string) => {
    try {
      setError(null);
      setLoading(true);
      setCurrentPage(1);
      const url = `${BASE_URL}${search}`;
      const res = await axios.get(url);
      const { results } = res.data;
      setNextPage(res.data.info.next);
      setPrevPage(res.data.info.prev);
      setPages(res.data.info.pages);
      const cards = results.map((item: CardProps) => ({ ...item }));
      if (res.status != 400) setCards(cards);
      setLoading(false);
      localStorage.setItem(LS_SEARCH_QUERY_KEY, search);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  const GoToPage = (search: string | null) => {
    if (!search) return;
    let page = '1';
    let tpm = search.match(/page=\d+/);
    if (tpm && tpm[0]) tpm = tpm[0].match(/\d+/);
    if (tpm && tpm[0]) page = tpm[0];
    requestData('?' + search.split('?')[1]);
    setCurrentPage(parseInt(page));
  };

  useEffect(() => {
    requestData(localStorage.getItem(LS_SEARCH_QUERY_KEY) || '');
  }, [requestData]);

  return (
    <div className="page" id="main-page">
      <SearchBar setSearch={requestData} />
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
          <button type="button" onClick={() => GoToPage(prevPage)}>
            prev
          </button>
          <div>{`${currentPage}/${pages}`}</div>
          <button type="button" onClick={() => GoToPage(nextPage)}>
            next
          </button>
        </div>
      )}
      {error && (
        <Hint
          closeHint={() => setError(null)}
          messages={['Oooops!', "We didn't find anything with your request!", error.toString()]}
        />
      )}
    </div>
  );
};

export default Main;
