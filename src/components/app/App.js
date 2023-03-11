import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from "../../resources/img/vision.png";
import { useState } from "react";

const App = () => {
  const [charInfoId, setCharInfoId] = useState("");
  // console.log("charInfoId >>> ", charInfoId);
  return (
    <div className="app">
      <AppHeader />
      <main>
        <RandomChar />
        <div className="char__content">
          <CharList selectCharHandler={setCharInfoId} />
          <CharInfo id={charInfoId} />
        </div>
        <img className="bg-decoration" src={decoration} alt="vision" />
      </main>
    </div>
  );
};

export default App;
