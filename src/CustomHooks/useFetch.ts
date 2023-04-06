import { useEffect, useState } from 'react';
import { CardProps } from '../components/Card';
import axios from 'axios';

import { LS_SEARCH_QUERY_KEY } from '../pages/Main';

export default function (url: string) {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [TotalNumberOfPages, setTotalNumberOfPages] = useState<number>(0);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(1);
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const callAPI = async () => {
      try {
        setError(null);
        setLoading(true);
        setCurrentPageIndex(1);
        const res = await axios.get(url, { signal: controller.signal });
        const { results } = res.data;
        setNextPageUrl(res.data.info.next);
        setPrevPageUrl(res.data.info.prev);
        setTotalNumberOfPages(res.data.info.pages);
        const cards = results.map((item: CardProps) => ({ ...item }));
        if (res.status != 400) setCards(cards);
        setLoading(false);
        localStorage.setItem(LS_SEARCH_QUERY_KEY, url);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    callAPI();
    return () => {
      controller.abort();
    };
  }, [url]);

  return { cards, loading, error, TotalNumberOfPages, currentPageIndex, prevPageUrl, nextPageUrl };
}
