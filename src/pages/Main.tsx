import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import { CardProps } from '../components/Card';
import { Hint } from '../components/Hint';
const baseURL = 'https://rickandmortyapi.com/api/character/';

const Main = () => {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | boolean>(null);

  const requestData = useCallback(async (search: string) => {
    try {
      setError(null);
      setLoading(true);
      const url = `${baseURL}${search}`;
      const res = await axios.get(url);
      const { results } = res.data;
      const cards = results.map(
        (item: { name: string; image: string; status: string; species: string }) => {
          const { name, image, status, species } = item;
          return {
            icon: image,
            title: name,
            desc: `${species} (${status})`,
            link: '',
            likes: 30,
            views: 40,
          };
        }
      );
      setCards(cards);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const setSearch = useCallback(
    (search: string) => {
      requestData(search);
    },
    [requestData]
  );

  // useEffect(() => {
  //   requestData('book');
  // }, [requestData]);

  return (
    <div className="page" id="main-page">
      <SearchBar setSearch={setSearch} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="cards">
          {cards.map((card, idx) => (
            <Card {...card} key={idx} />
          ))}
        </div>
      )}
      {error && (
        <Hint
          closeHint={setError}
          messages={['Oooops!', "We didn't find anything with your reques!", error.toString()]}
        />
      )}
    </div>
  );
};

export default Main;
