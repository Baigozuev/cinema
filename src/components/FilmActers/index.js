import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY } from "../../API";
import { Link } from "react-router-dom";

const FilmActers = ({ id }) => {
  const [film, setFilm] = useState([]);
  const getFilm = (key) => {
    axios(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${key}&language=en-US
        `).then((res) => {
      setFilm(res.data.cast);
    });
  };
  useEffect(() => {
    getFilm(API_KEY);
  }, []);
  console.log(film);
  return (
    <div id="film">
      {/* <div className="container"> */}
      <h3>Известность за</h3>
      <div className="film">
        {film.map((el) => (
          <div className="film--read">
            <div className="img_film">
           <Link to={`/movieDatels/${el.id}`}>
           {el.poster_path ? (
                <>
                  <img
                    src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${el.poster_path}`}
                    alt="img"
                    width={100}
                  />
                </>
              ) : (
                <img
                  src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyTadb_ED4JW_8W5DjByIEA_OcfHiq_yGhM604KGdattYqcFQSn8h0TLiro4nTmjpa7FE&usqp=CAU`}
                  alt="img"
                  width={80}
                />
              )}
           </Link>
            </div>
            <h1>
              {" "}
              {el.title.length > 20 ? el.title.slice(0, 15) + "..." : el.title}
            </h1>
            {/* <h2>{el.release_date}</h2> */}
          </div>
        ))}
      </div>
    </div>
    // </div>
  );
};

export default FilmActers;
