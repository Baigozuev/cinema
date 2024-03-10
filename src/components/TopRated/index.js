import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { API_KEY } from "../../API";
import MovieCard from "../MovieCard";
import loader from "../../img/loader.svg";

const TopRated = () => {
  const [count, setCount] = useState(1);
  const [topRated, setTopRated] = useState([]);
  const getTopRadet = (key) =>{
  window.scroll(0, 0)
  setTopRated([])

    setTimeout(() => {
      axios(
        ` https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=${count}`
      ).then((res) => {
        setTopRated(res.data.results);
      });
    }, 1000)
  };
  console.log(topRated);

  useEffect(() => {
    getTopRadet(API_KEY);
  }, [count]);

  // https://api.themoviedb.org/3/movie/top_rated?api_key=api&language=en-US&page=1

  return (
    <div id="popular">
      <div className="container">
        {
        topRated.length ? (
          <>
            <div className="popular">
              {topRated.map((el) => (
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
        ) : (
          <div className="loader">
            <img src={loader} alt="img" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TopRated;
