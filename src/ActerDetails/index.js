import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_KEY } from "../API";
import FilmActers from "../components/FilmActers";
import { LanguageContext } from "../components/Context/Context";

const ActerDetails = () => {
  const [acterDetails, setActerDetails] = useState({});
  const [bio, setBio] = useState(false);
  const {language} = useContext(LanguageContext)
  let { acterId } = useParams();

  // https://api.themoviedb.org/3/person/${personId}?api_key=${key}&language=en-US
  const getActers = (key) => {
    axios(` https://api.themoviedb.org/3/person/${acterId}?api_key=${key}&language=${language}
    `).then((res) => setActerDetails(res.data));
  };
  console.log(acterDetails);
  useEffect(() => {
    getActers(API_KEY);
  }, [language]);
  let { profile_path, name, biography, birthday, place_of_birth } =
    acterDetails;

  return (
    <div id="acterDetails">
      <div className="container">
        <div className="acterDetails">
          <Link to={`/acterDetails/${acterId}`}>
            {profile_path ? (
              <>
                {" "}
                <img
                  src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${profile_path}`}
                  alt="img"
                />
              </>
            ) : (
              <img
                src={`https://aif-s3.aif.ru/images/031/450/dbcf9e441db11cd63171cb22dcf20dea.jpg`}
                alt="img"
                width={350}
              />
            )}
          </Link>
          <div className="acterDetails--content">
            <h1>{name}</h1>
            <h2>Дата рождения: {birthday}</h2>
            {place_of_birth?.length ? (
              <h2>Место рождения: {place_of_birth}</h2>
            ) : null}
            {biography?.length ? (
              <>
                <h3>Биография</h3>
                <p>
                  {bio ? biography : biography?.slice(0, 200)}{" "}
                  {biography.length >= 200 ? (
                    <span onClick={() => setBio(!bio)}>
                      {!bio ? "more..." : "close!!!"}
                    </span>
                  ) : (
                    ""
                  )}
                </p>
              </>
            ) : null}
            <FilmActers id={acterId} />
          </div>

        </div>
      </div>
    </div>
     
  );
};

export default ActerDetails;
