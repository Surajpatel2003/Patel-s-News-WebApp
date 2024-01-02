import React from "react";

const NewsItem = (props) => {
  let { title, description, urlToImage, newsUrl, author, date, source } = props;

  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <img src={urlToImage} className="card-img-top" alt="..." />
        <div className="card-body">
          <span className="badge rounded-pill text-bg-success">{source}</span>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a href={newsUrl} className="btn btn-dark btn-sm" target="_blank">
            Read More
          </a>
          <p className="card-text">
            <small className="text-muted">
              by {author ? author : "Unknown"} on {new Date(date).toUTCString()}
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
