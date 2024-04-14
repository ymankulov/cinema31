import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY } from "../../API";
import { useParams } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import Actors from "../../components/Actors";
import Videos from "../../components/Videos";


const MovieDetails = () => {
  const [details, setDetails] = useState({});
  let { movieId } = useParams();
  const [modal, setModal] = useState(false);
  const [link1, setLink1] = useState(false);
  const [link2, setLink2] = useState(false);
  const [link3, setLink3] = useState(false);

  console.log(details);
  const getDetails = (key) => {
    axios(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=en-US`
    ).then((res) => {
      setDetails(res.data);
    });
  };
  useEffect(() => {
    getDetails(API_KEY);
  }, []);
  let {
    title,
    poster_path,
    release_date,
    overview,
    vote_average,
    runtime,
    backdrop_path,

    tagline,
  } = details;
  return (
    <>
      <div
        id="movieDetails"
        style={{
          background: `linear-gradient(rgba(10.5, 31.5, 52.5, 1),
        rgba(10.5, 31.5, 52.5, 0.84) 50%, rgba(10.5, 31.5, 52.5, 0.84) 100%), url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${backdrop_path})`,
          minHeight: "60vh",
        }}
      >
        <div
          className="bg"
          onClick={() => setModal(false)}
          style={{
            display: modal ? "block" : "none",
          }}
        ></div>
        <div className="container">
          <div className="movieDetails">
            <img
              onClick={() => {
                setModal(true);
              }}
              src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${poster_path}`}
              alt=""
            />

            <div
              className="modal"
              style={{
                display: modal ? "block" : "none",
              }}
            >
              <img
                src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${poster_path}`}
                alt=""
                className="modalImg"
              />
              <h2>{title}</h2>
              <h3
                className="close"
                onClick={() => {
                  setModal(false);
                }}
              >
                X
              </h3>
            </div>
            <div className="movieDetails--text">
              <div className="lp">
                <h1>{title}</h1>
                <h2>({release_date?.slice(0, 4)})</h2>
              </div>

              <div className="tim">
                <div className="pl">
                  <h1>{Math.round(vote_average * 10)}%</h1>
                </div>
                <h2>
                  {Math.floor(runtime / 60)}h {Math.floor(runtime % 60)} min
                </h2>
              </div>

              <div className="icons">
                <div
                  onClick={() => {
                    setLink1(!link1);
                    setLink2(false);
                    setLink3(false);
                  }}
                  style={{
                    color: link1 ? "green" : "white",
                  }}
                >
                  <a>
                    <TiThMenu />
                  </a>
                </div>
                <div
                  onClick={() => {
                    setLink2(!link2);
                    setLink1(false);
                    setLink3(false);
                  }}
                  style={{
                    color: link2 ? "red" : "white",
                  }}
                >
                  <a>
                    <FaHeart />
                  </a>
                </div>
                <div
                  onClick={() => {
                    setLink3(!link3);
                    setLink2(false);
                    setLink1(false);
                  }}
                  style={{
                    color: link3 ? "yellow" : "white",
                  }}
                >
                  <a>
                    <FaBookmark />
                  </a>
                </div>
              </div>
              <h3>
                <i>"{tagline}"</i>
              </h3>
              <p>{overview}</p>
            </div>
          </div>
        </div>
      </div>
      <Actors actorsId={movieId}/>
      <Videos videosId={movieId}/>
      
    </>
  );
};

export default MovieDetails;
