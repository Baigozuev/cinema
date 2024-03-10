import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY } from "../../API";
import { Link } from "react-router-dom";
const Acters = ({ id }) => {
  const [acters, setActers] = useState([]);
  const getActers = (key) => {
    axios(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${key}&language=en-US
    `).then((res) => {
      setActers(res.data.cast);
    });
  };
  console.log(acters);

  useEffect(() => {
    getActers(API_KEY);
  }, []);
  return (
    <div id="actors">
      <div className="container">
        <h1>Актёрский состав сериала</h1>
        <div className="actors">
          {acters.map((el) => (
            <div className="actors--card">
              <Link to={`/acterDetails/${el.id}`}>
                {el.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${el.profile_path}`}
                    width={250}
                    alt="img"
                  />
                ) : (
                  <img
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRlmyJG9V3y7C-qme6ZY7VXuBA0goQLwR-Ag&usqp=CAU"
                    }
                    alt="img"
                    width={250}
                  />
                )}
              </Link>
              <h2>{el.name}</h2>
              <h3>{el.character}</h3>
              <h4>{Math.round(el.popularity * 10)}%</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Acters;
