import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY } from "../../API";
import user from "../../assets/img/user.png";
import { Link } from "react-router-dom";

const Actors = ({actorsId}) => {
  const [actors, setActors] = useState([]);
  // https://api.themoviedb.org/3/movie/1011985/credits?api_key=${key}&language=en-US
  const getActors = (key) => {
    axios(`https://api.themoviedb.org/3/movie/${actorsId}/credits?api_key=${key}&language=en-US    
    `).then((res) => {
      setActors(res.data.cast);
    });
  };
  useEffect(() => {
    getActors(API_KEY);
  }, []);
  console.log(actors);


  return (
    <div id="actors">
      <div className="container">
        <div className="actors">
          {actors.map((el) => (
            <div className="actors--text">
              <Link to={`/actorsDetails/${el.id}`}>
                <img
                  src={
                    el.profile_path
                      ? `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${el.profile_path}`
                      : user
                  }
                  alt="img"
                  width={200}
                />
              </Link>

              <h1>{el.original_name}</h1>
              <h2>{el.character}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Actors;
