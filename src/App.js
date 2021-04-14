import React, { useEffect, useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { GET_SEARCHLISTS } from "./actions";
import { connect } from "react-redux";
import "./App.css";
import icon from "./icon.png";

function App(props) {
  const {
    searchLists,
    isLoading,
    getSearchLists,
    errorMessage,
    hasMore,
  } = props;

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query) {
      getSearchLists(query);
    }
  }, [query, getSearchLists]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          // console.log("entry", entry);
          if (entry.isIntersecting) {
            // 只在目標元素進入 viewport 時執行這裡的工作
            !!hasMore && getSearchLists(query, true);
          } else {
            // 只在目標元素離開 viewport 時執行這裡的工作
          }
        });
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, getSearchLists, query, hasMore]
  );

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      getSearchLists(query);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="searchBar">
          <div className="searchBox">
            <img className="searchIcon" src={icon} alt="search" />
            <input
              placeholder="搜尋關鍵字"
              className="searchInput"
              value={query}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <div className="vedioContainer">
          {searchLists.map((item, index) => {
            return (
              <div
                className="vedioBox"
                ref={searchLists.length === index + 1 ? lastElementRef : null}
                key={item.id.videoId}
              >
                <a
                  href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <img
                    className="vedioImg"
                    src={item.snippet.thumbnails.medium.url}
                    alt={item.snippet.description}
                  />
                  <div className="vedioTitle">{item.snippet.title}</div>
                </a>
              </div>
            );
          })}
        </div>
        {isLoading && (
          <div className="lds-circle">
            <div></div>
          </div>
        )}
        {errorMessage && <span className="infoText">{errorMessage}</span>}
        {!hasMore && !errorMessage && (
          <span className="infoText">Sorry~ 沒有更多內容了</span>
        )}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  const { searchLists, isLoading, errorMessage, hasMore } = state;
  return {
    searchLists,
    isLoading,
    errorMessage,
    hasMore,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getSearchLists: (query, auto = false) => {
    dispatch({ type: GET_SEARCHLISTS, payload: { query, auto } });
  },
});

App.propTypes = {
  getSearchLists: PropTypes.func,
  searchLists: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
