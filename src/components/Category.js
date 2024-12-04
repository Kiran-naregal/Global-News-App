import { useEffect, useReducer, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { useParams } from "react-router-dom";
import Scroller from "./Scroller";

const initialState = {
  articles: [],
  totalResults: 1,
}

function reducer(state, action) {
  switch (action.type) {
    case 'news/add':
      return { ...state, articles: state.articles.concat(action.payload.articles), totalResults: action.payload.totalResults }
    case 'news/reset':
      return { ...state, articles: action.payload.articles, totalResults: action.payload.totalResults }
    default:
      throw new Error('Unknown type');
  }
}

export default function News({ country, pageSize, language }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { category } = useParams();


  const [page, setPage] = useState(1);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(function () {
    async function getNews() {
      setLoading(true);
      setProgress(10);
      setPage(1);
      let url = `https://newsapi.org/v2/top-headlines?country=${country}${category !== 'top-headlines' ? `&category=${category}` : ''}&apiKey=${process.env.REACT_APP_NEW_API}&page=1&pageSize=${pageSize}&language=${language}`;
      let data = await fetch(url);
      setProgress(40);
      let parsedData = await data.json();
      setProgress(80);
      dispatch({ type: "news/reset", payload: { articles: parsedData.articles, totalResults: parsedData.totalResults } });
      setLoading(false);
      setProgress(100);
    }
    getNews();

  }, [pageSize, category, country, language]);

  useEffect(function () {
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    document.title = `GoogleNews - ${capitalizeFirstLetter(
      category
    )}`;
  }, [category])

  async function fetchMoreData() {

    setLoading(true);
    let url = `https://newsapi.org/v2/top-headlines?country=${country}${category !== 'top-headlines' ? `&category=${category}` : ''}&apiKey=${process.env.REACT_APP_NEW_API}&page=${page + 1}&pageSize=${pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    dispatch({ type: "news/add", payload: { articles: parsedData.articles, totalResults: parsedData.totalResults } });
    setLoading(false);
    setPage(page + 1);
  };

  return (
    <>
      <LoadingBar
        // color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={3}
      />
      <div className="container my-4">
        <h2 className="text-center">
          Google News - Top {capitalizeFirstLetter(category)}{" "}
          Headlines
        </h2>
        <Scroller loading={loading} state={state} fetchMoreData={fetchMoreData} />
      </div>
    </>
  );
}
