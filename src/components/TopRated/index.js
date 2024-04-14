import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY } from "../../API";
import MovieCard from "../MovieCard";
import loader from "../../assets/img/loader.svg";

const TopRated = () => {
  const [toprated, setToprated] = useState([]);
  const [count, setCount] = useState(1);
  const geTopRadet = (key) => {
    setToprated([]);
    setTimeout(() => {
      axios(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=${count}`
      )
        .then((res) => {
          setToprated(res.data.results);
        })
        .catch((res) => console.log(res.message));
    }, 2000);
  };
  useEffect(() => {
    geTopRadet(API_KEY);
  }, [count]);
  console.log(toprated);
  return (
    <div id="popular">
      <div className="container">
        {!toprated.length ? (
          <img src={loader} alt="" style={{ marginLeft: "450px" }} />
        ) : (
          <div className="popular">
            <div className="popular--movie">
              {toprated.map((el, idx) => (
                <MovieCard movie={el} key={idx} />
              ))}
            </div>
            <div className="popular--pogination">
              <button onClick={() => setCount(count > 1 ? count - 1 : 1)}>
                Prev
              </button>
              <h1>{count}</h1>
              <button onClick={() => setCount(count + 1)}>Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopRated;
