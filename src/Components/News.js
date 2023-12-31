import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    console.log();
    this.state = {
      articles: [],
      loading: false,
      pageNumber: 1,
      totalResults: 0,
    };
  }

  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?${this.props.country}&category=${this.props.category}&apiKey=4c3afa96defc4a8db86eb670db99ffa7&pageSize=${this.props.pageSize}&page=${this.state.pageNumber}`;
    this.setState({ loading: true });
    let res = await fetch(url);
    let parsedData = await res.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({
      pageNumber: this.state.pageNumber - 1,
    });
    this.updateNews();
  };

  handleNextClick = async () => {
    this.setState({
      pageNumber: this.state.pageNumber + 1,
    });
    this.updateNews();
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">Patel's News top headline </h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((item) => {
              return (
                <div className="col-md-4" key={item.url}>
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
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.pageNumber <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.pageNumber + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            {" "}
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
