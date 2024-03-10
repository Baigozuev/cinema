import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../Context/Context";
import MovieCard from "../MovieCard";
// let favor = JSON.parse(localStorage.getItem("fover"))|| []
const Favorite = () => {
    // const [follow, setFollow]= useState(false)
  const { favorite } = useContext(LanguageContext);
//   console.log(favorite);
//   favorite.map(el=>{el !=="" ? favor.push(el) : el})
//   localStorage.setItem("fover", JSON.stringify(favor))
  return (
    <div id="popular">
      <div className="container">
        <div className="popular">
          {favorite.map((el) => (
            <MovieCard movie={el} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorite;
