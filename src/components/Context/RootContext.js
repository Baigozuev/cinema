import React, { useEffect, useState } from "react";
import { LanguageContext } from "./Context";

const RootContext = ({ children }) => {
  const [dark, setDark] = useState(false);
  const [favorite, setFavorite] = useState([]);
  const [language, setLanguage] = useState("en-US");

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem("follow")) || [];  
    setFavorite(res);
  }, [])

  return (
    <LanguageContext.Provider
      value={{
        dark,
        language,
        favorite,

        setLanguage,
        setDark,
        setFavorite,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default RootContext;
