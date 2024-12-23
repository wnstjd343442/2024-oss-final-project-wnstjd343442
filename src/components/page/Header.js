import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./../css/Header.css";
import axios from "axios";
import SearchItem from "./SearchItem.js";

function Header() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchHandler = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    const kakao = axios.create({
      baseURL: "https://dapi.kakao.com/v3/search/book",
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_APIKEY}`,
      },
    });

    try {
      const response = await kakao.get("", {
        params: { query },
      });
      setResults(response.data.documents);
    } catch (err) {
      setError("검색 중 오류가 발생했습니다.");
      console.log(process.env.REACT_APP_APIKEY);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <div className="header-container">
      {/* 로고 영역 */}
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <h1 className="logo-text">한동문고</h1>
        </Link>
      </div>
      <div className="input-container">
        <input
          type="text"
          className="search-input"
          placeholder="검색어를 입력해주세요"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchHandler();
            }
          }}
        />
        <span className="remove-icon" onClick={clearSearch}></span>
      </div>
      <span className="search-icon" onClick={searchHandler}></span>

      <div className="search-results">
        {isLoading && <p>검색 중...</p>}
        {error && <p>{error}</p>}
        {results.length > 0 && (
          <ul>
            {results.map((item, index) => (
              <li key={index}>
                <SearchItem
                  thumbnail={item.thumbnail}
                  title={item.title}
                  author={item.authors}
                  isbn={item.isbn}
                  publisher={item.publisher}
                  datetime={item.datetime}
                  price={item.price}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Header;
