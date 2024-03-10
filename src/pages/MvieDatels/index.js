import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { API_KEY } from "../../API";
import { useParams } from "react-router-dom";
import { TiThMenuOutline } from "react-icons/ti";
import { GiHearts } from "react-icons/gi";
import { CiBookmark } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import Actors from "../../components/Acters";
import Vidoe from "../../components/Vidoe";
import { LanguageContext } from "../../components/Context/Context";
import MovieCard from "../../components/MovieCard";

// https://api.themoviedb.org/3/movie/${movieId}?api_key=api&language=en-US
let follow = JSON.parse(localStorage.getItem("follow")) || [];
const MovieDatels = () => {
  let { movieId } = useParams();
  const [details, setDetails] = useState({});
  const [modal, setModal] = useState(false);
  const [icon, setIcon] = useState(false);
  const [icon2, setIcon2] = useState(false);

  const [icon3, setIcon3] = useState(false);
  const [icon4, setIcon4] = useState(false);
  const { language, favorite, setFavorite } = useContext(LanguageContext);

  const getDatels = (key) => {
    axios(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=${language}`
    ).then((res) => setDetails(res.data));
  };
  let {
    title,
    poster_path,
    release_date,
    runtime,
    vote_average,

    backdrop_path,
    tagline,
    overview,
    homepage,
    genres,

    production_companies,
  } = details;

  

  let addToFavorite = (fav) => {
    let findMov = favorite.find ((el) => el.id === fav.id) 
    if (!findMov) {
      let result = [...favorite, fav]

    }
    const res = JSON.parse(localStorage.getItem("follow")) || [];  
    res.push(fav)
    // setFavorite([...favorite, fav]);
    localStorage.setItem("follow", JSON.stringify(res));  
  };

  useEffect(() => {
    getDatels(API_KEY);
  }, [language]);
  return (
    <div>
      <div
        id="details"
        style={{
          background: `linear-gradient(to right, rgba(12, 6, 6, 0.631) calc((50vw - 170px) - 340px), rgba(8, 3, 3, 0.607) 50%, rgba(8, 3, 3, 0.592) 100%), url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${backdrop_path})no-repeat center/cover fixed `,
          minHeight: "55vh",
        }}
      >
        <div className="container">
          <div
            className="modals"
            style={{
              display: modal ? "flex" : "none",
            }}
          >
            <img
              onClick={() => setModal(false)}
              src={`https://image.tmdb.org/t/p/w220_and_h330_face/${poster_path}`}
              alt="img"
              width={330}
            />
            <div className="modal">
              <div className="modal-text"></div>
            </div>
          </div>
          <div className="details">
            <img
              onClick={() => setModal(true)}
              src={`https://image.tmdb.org/t/p/w220_and_h330_face/${poster_path}`}
              alt="img"
              width={350}
              height={500}
            />

            <div className="details--content">
              <h1>
                {title} &nbsp;
                <span>({release_date?.slice(0, 4)})</span>
              </h1>
              <div className="data">
                <h3>
                  {release_date?.split("-").join("/")}(US). +
                  {genres?.map((el) => el.name)} &nbsp;+
                  {Math.floor(runtime / 60)}h &nbsp;&nbsp;
                  {runtime % 60}min{" "}
                </h3>
              </div>
              <div className="icons">
                <h4>
                  <div
                    className="ratingBacgraund"
                    style={{
                      background: vote_average
                        ? vote_average * 10 >= 80
                          ? "green"
                          : vote_average && vote_average * 10 >= 50
                          ? "yellow"
                          : "red"
                        : "",
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="reityng"
                      style={{
                        width: "50px",
                        height: "50px",
                        background: "rgba(0, 0, 0, 0.645)",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {vote_average ? ` ${Math.round(vote_average * 10)}` : ""}%
                    </div>
                  </div>
                  {
                    <div className="icon">
                      <div className="icon2">
                        <h2
                          onClick={() => setIcon(true)}
                          style={{
                            color: icon ? "green" : "",
                            transform: icon ? "scale(1.1)" : "",
                          }}
                        >
                          <TiThMenuOutline />
                        </h2>
                      </div>
                    </div>
                  }
                  {
                    <div
                      className="icon"
                      onClick={() => addToFavorite(details)}
                    >
                      <div className="icon2">
                        <h2
                          onClick={() => setIcon2(!icon2)}
                          style={{
                            color: icon2 ? "red" : "",
                            transform: icon2 ? "scale(1.1)" : "",
                          }}
                        >
                          <GiHearts />
                        </h2>
                      </div>
                    </div>
                  }
                  {
                    <div className="icon">
                      <div className="icon2">
                        <h2
                          onClick={() => setIcon3(true)}
                          style={{
                            color: icon3 ? "yellow" : "",
                            transform: icon3 ? "scale(1.1)" : "",
                          }}
                        >
                          <CiBookmark />
                        </h2>
                      </div>
                    </div>
                  }{" "}
                  {
                    <div className="icon">
                      <div className="icon2">
                        <FaRegStar />
                      </div>
                    </div>
                  }
                  <a href={homepage} target="_blank">
                    Воспроизвести трейлер
                  </a>
                </h4>
              </div>
              {tagline}
              <h2 className="text">Обзор </h2>

              <h3>{overview}</h3>
              <div className="block">
                <h4>{production_companies?.map((el) => el.name)}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Actors id={movieId} />
      <Vidoe videoId={movieId} />
    </div>
  );
};

export default MovieDatels;
