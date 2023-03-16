import AppHeader from "../appHeader/AppHeader";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "../spinner/Spinner";

const CharactersPage = lazy(() => import("../../pages/CharactersPage"));
const ComicsPage = lazy(() => import("../../pages/ComicsPage"));
const SingleComicPage = lazy(() => import("../../pages/SingleComicPage"));
const PageNotFound = lazy(() => import("../../pages/404Page"));
const App = () => {
  return (
    <div className="app">
      <AppHeader />
      <main>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<CharactersPage />} />
            <Route path="/comics" element={<ComicsPage />} />
            <Route path="/comics/:id" element={<SingleComicPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default App;
