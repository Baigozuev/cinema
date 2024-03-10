import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="movieCard">
      <Link to={`/movieDatels/${movie.id}`}>
      <img
        src={`https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
        alt="img"
        width={350}
      />
      </Link>
      <h2>{movie.title}</h2>
      <h3>{movie.release_date}</h3>
    </div>
  );
};

export default MovieCard;
