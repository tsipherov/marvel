import { useEffect } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import MarvelServices from "../services/MarvelServices";

import decoration from "../../resources/img/vision.png";

const App = () => {
  const services = new MarvelServices();
  useEffect(async () => {
    const result = await services.getCharacter("1011334");

    console.log("result: ", result.data.results);
  }, []);
  return (
    <div className="app">
      <AppHeader />
      <main>
        <RandomChar />
        <div className="char__content">
          <CharList />
          <CharInfo />
        </div>
        <img className="bg-decoration" src={decoration} alt="vision" />
      </main>
    </div>
  );
};

export default App;
