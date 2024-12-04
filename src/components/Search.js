import { useEffect, useReducer, useState } from "react";
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

export default function Search({ pageSize }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const { query } = useParams();

    useEffect(function () {
        async function getNews() {
            setLoading(true);
            //   setProgress(10);
            let url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.REACT_APP_NEW_API}&page=1&pageSize=${pageSize}`;
            let data = await fetch(url);
            //   setProgress(40);
            let parsedData = await data.json();
            //   setProgress(80);
            dispatch({ type: "news/reset", payload: { articles: parsedData.articles, totalResults: parsedData.totalResults } });
            setLoading(false);
            //   setProgress(100);
        }
        getNews();

    }, [query, pageSize]);

    async function fetchMoreData() {

        setLoading(true);
        let url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.REACT_APP_NEW_API}&page=${page + 1}&pageSize=${pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        dispatch({ type: "news/add", payload: { articles: parsedData.articles, totalResults: parsedData.totalResults } });
        setLoading(false);
        setPage(page + 1);
    };
    return (
        <Scroller loading={loading} state={state} fetchMoreData={fetchMoreData} />
    )
}
