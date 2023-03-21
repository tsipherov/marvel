import AppHeader from "../appHeader/AppHeader";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "../spinner/Spinner";

const CharactersPage = lazy(() => import("../../pages/CharactersPage"));
const ComicsPage = lazy(() => import("../../pages/ComicsPage"));
const SinglePage = lazy(() => import("../../pages/SinglePage"));
const PageNotFound = lazy(() => import("../../pages/404Page"));
const SingleComicLayout = lazy(() =>
  import("../../pages/SingleComicLayout/SingleComicLayout")
);
const SingleCharLayout = lazy(() =>
  import("../../pages/SingleCharLayout/SingleCharLayout")
);
const App = () => {
  return (
    <div className="app">
      <AppHeader />
      <main>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<CharactersPage />} />
            <Route path="/comics" element={<ComicsPage />} />
            <Route
              path="/comics/:id"
              element={
                <SinglePage Component={SingleComicLayout} pageType={"comic"} />
              }
            />
            <Route
              path="/characters/:id"
              element={
                <SinglePage Component={SingleCharLayout} pageType={"char"} />
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default App;
