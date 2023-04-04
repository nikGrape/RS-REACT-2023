import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import { CardProps } from '../components/Card';
import { Hint } from '../components/Hint';
import { Loading } from '../components/Loading';
const BASE_URL = 'https://rickandmortyapi.com/api/character/';

const Main = () => {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const requestData = useCallback(async (search: string) => {
    try {
      setError(null);
      setLoading(true);
      const url = `${BASE_URL}${search}`;
      const res = await axios.get(url);
      const { results } = res.data;
      const cards = results.map((item: CardProps) => ({ ...item }));
      if (res.status != 400) setCards(cards);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  const setSearch = useCallback(
    (search: string) => {
      requestData(search);
    },
    [requestData]
  );

  useEffect(() => {
    requestData('');
  }, [requestData]);

  return (
    <div className="page" id="main-page">
      <SearchBar setSearch={setSearch} />
      {loading ? (
        <Loading />
      ) : (
        <div className="cards">
          {cards.map((card, idx) => (
            <Card {...card} key={idx} />
          ))}
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
