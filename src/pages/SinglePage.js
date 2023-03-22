import React, { useEffect, useState } from "react";
import AppBanner from "../components/appBanner/AppBanner";
import { useParams } from "react-router-dom";
import MarvelServices from "../services/MarvelServices";
import { setContent } from "../utils/setContent";

const SinglePage = ({ Component, pageType }) => {
  const [item, setItem] = useState({});
  const { id: itemId } = useParams();
  const { getComic, getCharacter, clearError, process, setProcess } =
    MarvelServices();

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [itemId]);

  const getData = () => {
    clearError();
    if (pageType === "comic")
      getComic(itemId)
        .then(setItem)
        .then(() => {
          setProcess("Confirmed");
        });
    if (pageType === "char")
      getCharacter(itemId)
        .then(setItem)
        .then(() => {
          setProcess("Confirmed");
        });
  };

  return (
    <>
      <AppBanner />
      {setContent(process, Component, item)}
    </>
  );
};

export default SinglePage;
