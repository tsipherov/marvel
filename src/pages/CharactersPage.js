import React, { useState } from "react";
import CharInfo from "../components/charInfo/CharInfo";
import CharList from "../components/charList/CharList";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import RandomChar from "../components/randomChar/RandomChar";
import decoration from "../resources/img/vision.png";

const CharactersPage = () => {
  const [charInfoId, setCharInfoId] = useState(null);
  return (
    <>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList selectCharHandler={setCharInfoId} />
        </ErrorBoundary>
        <ErrorBoundary>
          <CharInfo id={charInfoId} />
        </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default CharactersPage;
