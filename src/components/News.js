import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import { PropTypes } from "prop-types";

export default class News extends Component {
  static defaultProps = {
    country:"in",
    pageSize:8,
    category:"business",
  }
  static propType ={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category:PropTypes.string,
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
  }

  updateNews = async() => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4a5af4ac3702490ba39b149132de38c3&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading:false,
    });
  }
  async componentDidMount(){
    this.updateNews()
  }
  handleNextClick = async() =>{
      this.setState({page: this.state.page + 1})
      this.updateNews()
  }
  handlePrevClick = async() =>{
    this.setState({page: this.state.page - 1})
  }
  render() {
    return (
      <div className="container my-4">
        <h2 className="text-center">Google News</h2>
        {this.state.loading && (<Spinner />)}
        <div className="my-3">
          <div className="row">
            {!this.state.loading && this.state.articles.map((e) => {
              return(
              <div className="col-md-4 my-2" key={e.url}>
                <NewsItem
                  title={e.title?e.title.slice(0,20):""}
                  desc={e.description?e.description.slice(0,40):""}
                  imageUrl={e.urlToImage?e.urlToImage:"https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.23.3/images/bbc-sport-logo.png"}
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
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-outline-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
          <button disabled={this.state.page === this.state.totalResults/this.props.pageSize} type="button" className="btn btn-outline-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}
