import React, { useContext, useState } from "react";
import logo from "../../img/header-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { LanguageContext } from "../Context/Context";
import { TbSunFilled } from "react-icons/tb";
import { FaMoon } from "react-icons/fa";
import { BiBookmarkHeart } from "react-icons/bi";


const Header = () => {
  let nav = useNavigate();
  const [search, setSearch] = useState("");
  const { language, dark, setDark, setLanguage } = useContext(LanguageContext);
  return (
    <div id="header">
      <div className="container">
        <div className="header">
          <img src={logo} alt="img" width={200} />
          <div className="header--nav">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/popular"}>Popular</NavLink>
            <NavLink to={"/topRated"}>Top Rated</NavLink>
          </div>
            <NavLink to={"/favorite"}><h1><BiBookmarkHeart/></h1></NavLink>
          <select onChange={(e) => setLanguage(e.target.value)}>
            <option value="en-US">English</option>
            <option value="ru-RU">Русский</option>
            <option value="fr-FR">Frence</option>
          </select>
             
          {dark ? (
            <a onClick={() => setDark(false)} href="#">
              <TbSunFilled />
            </a>
          ) : (
            <a onClick={() => setDark(true)} href="#">
              <FaMoon />
            </a>
          )}
          <div className="header--search">
            <input
              onInput={(e) => nav(`/search /${e.target.value}`)}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="search"
            />
            <button
              onClick={() => {
                nav(`/search/${search}`);
                setSearch("");
              }}
            >
              search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
