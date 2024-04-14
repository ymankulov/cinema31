import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY } from "../../API";
import { Link } from "react-router-dom";

const MovieActor = ({ actorsId }) => {
  const [actros, setActros] = useState([]);
  const getMovieActors = (key) => {
    axios(
      `https://api.themoviedb.org/3/person/${actorsId}/movie_credits?api_key=${key}&language=en-US`
    ).then((res) => {
      setActros(res.data.cast);
    });
  };
  useEffect(() => {
    getMovieActors(API_KEY);
  }, []);
  console.log(actros);
  return (
    <div id="movieActros">
      <div className="movieActros">
        {actros.map((el) => (
          <div className="movieActros--img">
            <Link to={`/movieDetails/${el.id}`}>
              <img
                src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${el.poster_path}`}
                alt="img"
                width={200}
              />
            </Link>
            <h2>{el.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieActor;
