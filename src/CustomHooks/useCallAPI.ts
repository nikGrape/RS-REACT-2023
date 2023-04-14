import { useEffect, useState } from 'react';
import { CardProps } from '../components/Card';
import { useDispatch } from 'react-redux';
import axios from 'axios';

type API = {
  cards: CardProps[];
  loading: boolean;
  error: string | null;
  TotalNumberOfPages: number;
  currentPageIndex: number;
  prevPageUrl: string | null;
  nextPageUrl: string | null;
  setError: (error: string | null) => void;
};

export const extractCurrentPageIndex = (url: string | null): number => {
  if (!url) return 1;
  let page = '1';
  let tpm = url.match(/page=\d+/);
  if (tpm && tpm[0]) tpm = tpm[0].match(/\d+/);
  if (tpm && tpm[0]) page = tpm[0];
  return parseInt(page);
};

export default function (url: string): API {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [TotalNumberOfPages, setTotalNumberOfPages] = useState<number>(0);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(1);
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const callAPI = async () => {
      console.log('api has been called!');
      try {
        setError(null);
        setLoading(true);
        setCurrentPageIndex(extractCurrentPageIndex(url));
        const res = await axios.get(url, { signal: controller.signal });
        const { results } = res.data;
        setNextPageUrl(res.data.info.next);
        setPrevPageUrl(res.data.info.prev);
        setTotalNumberOfPages(res.data.info.pages);
        const cards = results.map((item: CardProps) => ({ ...item }));
        // if (res.status != 400) dispatch(setSearchResult(cards));
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    callAPI();
    return () => {
      controller.abort();
    };
  }, [url, dispatch]);

  return {
    cards,
    loading,
    error,
    setError,
    TotalNumberOfPages,
    currentPageIndex,
    prevPageUrl,
    nextPageUrl,
  };
}
