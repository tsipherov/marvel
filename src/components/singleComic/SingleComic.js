import "./singleComic.scss";
import xMen from "../../resources/img/x-men.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import MarvelServices from "../../services/MarvelServices";
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const SingleComic = () => {
  const [comic, setComic] = useState({});
  const { id: comicId } = useParams();
  const navigate = useNavigate();
  const { loading, error, getComic, clearError } = MarvelServices();

  useEffect(() => {
    getComicById(comicId);
  }, [comicId]);

  const getComicById = (comicId) => {
    getComic(comicId).then(setComic);
  };

  console.log("comic >>> ", comic);
  const { title, price, description, imgUrl, pageCount, language } = comic;
  return (
    <div className="single-comic">
      {loading && <Spinner />}
      {!loading && error && <ErrorMessage />}
      {!loading && !error && (
        <>
          <img src={imgUrl} alt={title} className="single-comic__img" />
          <div className="single-comic__info">
            <h2 className="single-comic__name">{title}</h2>
            <p className="single-comic__descr">{description}</p>
            <p className="single-comic__descr">{pageCount}</p>
            <p className="single-comic__descr">Language: {language}</p>
            <div className="single-comic__price">{price}</div>
          </div>
          <Link to="/comics" className="single-comic__back">
            Back to all
          </Link>
        </>
      )}
    </div>
  );
};

export default SingleComic;
