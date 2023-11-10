import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import { PropTypes } from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "business",
  };
  static propType = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `GoogleNews - ${this.capitalizeFirstLetter(
      this.props.category
    )}`;
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  updateNews = async () => {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=${process.env.REACT_APP_NEW_API}&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(40);
    let parsedData = await data.json();
    this.props.setProgress(80);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
    this.props.setProgress(100);
  };
  async componentDidMount() {
    this.updateNews();
  }
  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
  };
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  render() {
    return (
      <div className="container my-4">
        <h2 className="text-center">
          Google News - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h2>
        {this.state.loading && <Spinner />}
        <div className="my-3">
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length < this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="container">
              <div className="row">
                {!this.state.loading &&
                  this.state.articles.map((e, i) => {
                    return (
                      <div className="col-md-4 my-2" key={i}>
                        <NewsItem
                          title={e.title ? e.title.slice(0, 20) : ""}
                          desc={e.description ? e.description.slice(0, 40) : ""}
                          imageUrl={
                            e.urlToImage
                              ? e.urlToImage
                              : "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.23.3/images/bbc-sport-logo.png"
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
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-outline-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Prev
          </button>
          <button
            disabled={
              this.state.page === this.state.totalResults / this.props.pageSize
            }
            type="button"
            className="btn btn-outline-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  }
}
