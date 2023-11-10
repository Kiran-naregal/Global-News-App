import React, { Component } from "react";

export default class NewsItem extends Component {
    render() {
        let {title, desc, imageUrl, newsUrl, author, date, source} = this.props;
        return (
      <div>
        <div className="card center">
        <span className="position-absolute top-0 translate-middle badge bg-light text-dark" style={{zindex:'1', left:"90%"}}>{source}</span>
          <img src={imageUrl} className="card-img-top" alt="" style={{width:"355px", height:"200px"}} />
          <div className="card-body">
            <h5 className="card-title">{title}..</h5>
            <p className="card-text">
              {desc}..
            </p>
            <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {date}</small></p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary" rel="noreferrer" >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}
