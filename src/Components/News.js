import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const updateNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4c3afa96defc4a8db86eb670db99ffa7&pageSize=${props.pageSize}&page=${pageNumber}`;
    // this.setState({ loading: true });
    let res = await fetch(url);
    let parsedData = await res.json();

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  useEffect(() => {
    updateNews();
  }, []);

  const handlePrevClick = async () => {
    setPageNumber(pageNumber - 1);
    updateNews();
  };

  const handleNextClick = async () => {
    setPageNumber(pageNumber + 1);
    updateNews();
  };

  const fetchMoreData = async () => {
    setPageNumber(pageNumber + 1);
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${
      props.category
    }&apiKey=4c3afa96defc4a8db86eb670db99ffa7&pageSize=${props.pageSize}&page=${
      pageNumber + 1
    }`;
    // this.setState({ loading: true });
    let res = await fetch(url);
    let parsedData = await res.json();

    console.log(parsedData);

    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  return (
    <>
      <h2 className="text-center">
        Top headline from {capitalize(props.category)}{" "}
      </h2>
      {/* {loading && <Spinner />} */}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length + 1 < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((item, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <NewsItem
                    title={item.title ? item.title.slice(0, 45) : ""}
                    description={
                      item.description ? item.description.slice(0, 81) : ""
                    }
                    urlToImage={
                      item.urlToImage
                        ? item.urlToImage
                        : "https://a57.foxnews.com/static.foxbusiness.com/foxbusiness.com/content/uploads/2023/10/0/0/78156782-4.jpg?ve=1&tl=1"
                    }
                    newsUrl={item.url}
                    author={item.author}
                    date={item.publishedAt}
                    source={item.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
          <button
            disabled={pageNumber <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              pageNumber + 1 >
              Math.ceil(totalResults / props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            {" "}
            Next &rarr;
          </button>
        </div> */}
    </>
  );
};
export default News;
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
