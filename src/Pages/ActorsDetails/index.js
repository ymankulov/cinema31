import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../../API";
import MovieActor from "../../components/MovieActor";

const ActorsDetails = () => {
  const [actor, setActor] = useState({});
  const [span, setSpan] = useState(false);
  let { personId } = useParams();
  const getImg = (key) => {
    axios(
      ` https://api.themoviedb.org/3/person/${personId}?api_key=${key}&language=en-US`
    ).then((res) => {
      setActor(res.data);
    });
  };
  useEffect(() => {
    getImg(API_KEY);
  }, []);

  return (
    <div id="actorsDetails">
      <div className="container">
        <div className="actorsDetails">
          <div className="card">
            <div className="card--block1">
              <img
                src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${actor.profile_path}`}
                alt=""
              />
              <p>Персональная информация</p>
              <h1>Дата рождения</h1>
              <h2>{actor.birthday}</h2>
            </div>
            <div className="card--movie">
              <div className="card--block">
                <h1>{actor.name}</h1>
                {actor.biography ? <h2>Биография</h2> : null}
                <h3>
                  {span === false
                    ? actor.biography?.slice(0, 299)
                    : actor.biography}{" "}
                  <span
                    onClick={() => {
                      setSpan(!span);
                    }}
                  >
                    {span ? "zakryt" : "open"}
                  </span>
                </h3>
                <MovieActor actorsId={personId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorsDetails;
