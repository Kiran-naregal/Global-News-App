import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";
import NewsItem from "./NewsItem";

export default function Scroller({ loading, state, fetchMoreData }) {
    const articlesLen = state.articles.length ?? 0;
    return (
        <div className="my-3">
            <InfiniteScroll
                dataLength={articlesLen}
                next={fetchMoreData}
                hasMore={articlesLen < state.totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {state.articles?.map((e, i) => {
                            return (
                                <div className="col-md-4 my-2" key={i}>
                                    <NewsItem
                                        title={e.title ? e.title.slice(0, 20) : ""}
                                        desc={e.description ? e.description.slice(0, 40) : ""}
                                        imageUrl={
                                            e.urlToImage
                                        }
                                        newsUrl={e.url}
                                        author={e.author}
                                        date={e.publishedAt}
                                        source={e.source.name}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    )
}
