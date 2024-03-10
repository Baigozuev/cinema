import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TopRated from "./components/TopRated";
import Popular from "./components/Popular";
import MovieDatels from "./pages/MvieDatels";
import ActerDetails from "./ActerDetails";
import Search from "./components/Search";
import FilmActers from "./components/FilmActers";
import { useContext } from "react";
import { LanguageContext } from "./components/Context/Context";
import Favorite from "./components/Favorite";

function App() {
  const {dark} = useContext(LanguageContext)
  return (
    <div className="App" style={{
      background: dark ? "black" : "white",
      color: dark ? "white" : "black"
    }}>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/topRated" element={<TopRated />} />
        <Route path="/movieDatels/:movieId" element={<MovieDatels/>}/>
        <Route path="/acterDetails/:acterId"element={<ActerDetails/>}/>
        <Route path="/search/:movieName" element={<Search/>}/>
        <Route path="/favorite" element={<Favorite/>}/>

      </Routes>
    </div>
  );
}

export default App;
