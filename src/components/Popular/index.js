import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { API_KEY } from "../../API";
import MovieCard from "../MovieCard";
import loader from "../../img/loader.svg";
import { LanguageContext } from "../Context/Context";

const Popular = () => {
  const [popular, setPopular] = useState([]);
  const [count, setCount] = useState(1);
  const [movie, setMovie] = useState("new");
  const { language ,dark} = useContext(LanguageContext);
  const getPopular = (key) => {
    window.scroll(0, 0);
    setPopular([]);

    setTimeout(() => {
      axios(
        `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=${language}&page=${count}`
      ).then((res) => {
        setPopular(res.data.results);
      });
    }, [1000]);
  };
  let sortedNewData = [...popular].sort((a, b) =>
    movie === "new"
      ? Number(b.release_date.slice(0, 4)) - Number(a.release_date.slice(0, 4))
      : Number(a.release_date.slice(0, 4)) - Number(b.release_date.slice(0, 4))
  );
  useEffect(() => {
    getPopular(API_KEY);
  }, [count,language]);
  return (
    <div id="popular" style={{
      background: dark ? "black" : "white"
    }}>
      <div className="container">
        {!popular.length ? (
          <div className="loader">
            <img src={loader} alt="img" />
          </div>
        ) : (
          <>
            <select onChange={(e) => setMovie(e.target.value)}>
              <option value="new">new</option>
              <option value="old">old</option>
            </select>
            <div className="popular">
              {sortedNewData.map((el) => (
                <MovieCard movie={el} />
              ))}
            </div>
            <div className="pagination">
              <button
                onClick={() => setCount(count > 1 ? count - 1 : count)}
                className="pagination-btnLeft"
              >
                prev
              </button>
              <h1>{count}</h1>
              <button
                onClick={() => setCount(count + 1)}
                className="pagination-btnRight"
              >
                next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Popular;
