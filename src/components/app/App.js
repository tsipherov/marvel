import AppHeader from "../appHeader/AppHeader";
import { Route, Routes } from "react-router-dom";
import CharactersPage from "../../pages/CharactersPage";
import ComicsPage from "../../pages/ComicsPage";

const App = () => {
  return (
    <div className="app">
      <AppHeader />
      <main>
        <Routes>
          <Route path="/" element={<CharactersPage />} />
          <Route path="/comics" element={<ComicsPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
