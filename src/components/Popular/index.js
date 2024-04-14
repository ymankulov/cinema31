import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard";
import loader from "../../assets/img/loader.svg";
import { API_KEY } from "../../API";
const Popular = () => {
  const [popular, setPopular] = useState([]);
  const [count, setCount] = useState(1);

  const getPopular = (key) => {
    setPopular([]);
    setTimeout(() => {
      axios(
        `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=${count}`
      )
        .then((res) => {
          setPopular(res.data.results);
        })
        .catch((res) => console.log(res.message));
    }, 1500);
  };

  useEffect(() => {
    getPopular(API_KEY);
  }, [count]);
  console.log(popular);
  return (
    <div id="popular">
      <div className="container">
        <div className="popular">
          {!popular.length ? (
            <img src={loader} alt="" style={{ marginTop: "200px" }} />
          ) : (
            <>
              <div className="popular--movie">
                {popular.map((el, idx) => (
                  <MovieCard movie={el} key={idx} />
                ))}
              </div>
              <div className="popular--pagination">
                <button onClick={() => setCount(count > 1 ? count - 1 : 1)}>
                  Prev
                </button>
                <h1>{count}</h1>
                <button onClick={() => setCount(count + 1)}>Next</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popular;
