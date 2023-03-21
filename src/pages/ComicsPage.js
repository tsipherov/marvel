import React from "react";
import { Helmet } from "react-helmet";
import AppBanner from "../components/appBanner/AppBanner";
import ComicsList from "../components/comicsList/ComicsList";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";

const ComicsPage = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Marvel comics" />
        <title>Comics Page</title>
      </Helmet>
      <AppBanner />
      {/* <div className="char__content"> */}
      <ErrorBoundary>
        <ComicsList />
      </ErrorBoundary>
      {/* </div> */}
    </>
  );
};

export default ComicsPage;
