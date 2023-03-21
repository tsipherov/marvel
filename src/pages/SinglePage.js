import React, { useEffect, useState } from "react";
import AppBanner from "../components/appBanner/AppBanner";
import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
import { useParams } from "react-router-dom";
import MarvelServices from "../services/MarvelServices";

const SinglePage = ({ Component, pageType }) => {
  const [item, setItem] = useState({});
  const { id: itemId } = useParams();
  const { loading, error, getComic, getCharacter, clearError } =
    MarvelServices();

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [itemId]);

  const getData = () => {
    clearError();
    if (pageType === "comic") getComic(itemId).then(setItem);
    if (pageType === "char") getCharacter(itemId).then(setItem);
  };

  return (
    <>
      <AppBanner />
      {loading ? (
        <Spinner />
      ) : error ? (
        <ErrorMessage />
      ) : (
        <Component item={item} />
      )}
    </>
  );
};

export default SinglePage;
