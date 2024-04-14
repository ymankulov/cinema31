import React, { useState } from "react";
import logo from "../../assets/img/header-log.svg";
import { Link } from "react-router-dom";
import { CgDarkMode } from "react-icons/cg";

const Header = () => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div id="header">
      <div className="container">
        <div className="header">
          <img src={logo} alt="img" width={200} />
          <div className="header--nav">
            <Link to={"/"}>Home</Link>
            <Link to={"/popular"}>Popular</Link>
            <Link to={"/toprated"}>TopRated</Link>
          </div>
          <select>
            <option value="en-US">English</option>
            <option value="ru-RU">Русский</option>
            <option value="fr-FR">France</option>
          </select>
          <h1
            style={{
              color: "white",
            }}
          >
            {inputValue}
          </h1>
          <div className="header--search">
            <input
              type="text"
              placeholder="search...."
              onInput={(e) => setInputValue(e.target.value)}
            />
            <button>search</button>
          </div>
          <a className="header--dark">
            <CgDarkMode />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
