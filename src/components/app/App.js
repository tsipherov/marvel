import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from "../../resources/img/vision.png";
import { useState } from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

const App = () => {
  const [charInfoId, setCharInfoId] = useState(null);
  return (
    <div className="app">
      <AppHeader />
      <main>
        <ErrorBoundary>
          <AppBanner />
          {/* <RandomChar /> */}
        </ErrorBoundary>
        <div className="char__content">
          <ErrorBoundary>
            <ComicsList />
          </ErrorBoundary>
          {/* <ErrorBoundary>
            <CharList selectCharHandler={setCharInfoId} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharInfo id={charInfoId} />
          </ErrorBoundary> */}
        </div>
        <img className="bg-decoration" src={decoration} alt="vision" />
      </main>
    </div>
  );
};

export default App;
