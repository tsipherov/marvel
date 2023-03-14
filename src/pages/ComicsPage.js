import React from "react";
import AppBanner from "../components/appBanner/AppBanner";
import ComicsList from "../components/comicsList/ComicsList";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";

const ComicsPage = () => {
  return (
    <>
      <AppBanner />
      <div className="char__content">
        <ErrorBoundary>
          <ComicsList />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default ComicsPage;
