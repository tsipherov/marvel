import AppHeader from "../appHeader/AppHeader";
import { Route, Routes } from "react-router-dom";
import CharactersPage from "../../pages/CharactersPage";
import ComicsPage from "../../pages/ComicsPage";
import PageNotFound from "../../pages/404Page";
import SingleComic from "../singleComic/SingleComic";

const App = () => {
  return (
    <div className="app">
      <AppHeader />
      <main>
        <Routes>
          <Route path="/" element={<CharactersPage />} />
          <Route path="/comics" element={<ComicsPage />} />
          <Route path="/comics/:id" element={<SingleComic />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
