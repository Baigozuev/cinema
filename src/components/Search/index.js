import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../../API";
import MovieCard from "../MovieCard";

const Search = () => {
  let { movieName } = useParams();
  const [name,setName] = useState ([])
  const getSearch = (key) => {
    axios(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${movieName}
        `).then((res) => setName(res.data.results));
  };
  useEffect(() => {
    getSearch(API_KEY);

  }, [movieName]);
  console.log(name);
  return (
    <div id="popular">
        <div className="conatiner">
            <div className="popular">
                {
                    name.map((el) =><MovieCard movie={el}/>)
                }
            </div>
        </div>
        </div>
  );
};

export default Search;
