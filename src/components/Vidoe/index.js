import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY } from "../../API";

const Vidoe = ({ videoId }) => {
  const [video, setVideo] = useState([]);
  const [more,setMore] = useState(6)
  const getVideo = (key) => {
    axios(
      `https://api.themoviedb.org/3/movie/${videoId}/videos?api_key=${key}&language=en-US`
    ).then((res) => {
      setVideo(res.data.results);
    });
  };
  useEffect(() => {
    getVideo(API_KEY);
  }, []);
  console.log(video);
  return (
    <div id="video">
      <div className="container">
        <div className="video">
          {video.slice(0, more).map((el) => (
            <div className="videos" key={el.id}>
              <iframe
                width="500px"
                height="300px"
                src={`https://www.youtube.com/embed/${el.key}`}
              ></iframe>
            </div>
          ))}
          {
            more >= video.length ? <button onClick={() => setMore( 6)}>Short</button> :  <button onClick={() => setMore(more + 6)}>More</button>
          }
         
        </div>
      </div>
    </div>
  );
};

export default Vidoe;
