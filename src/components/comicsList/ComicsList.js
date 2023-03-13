import "./comicsList.scss";
// import xMen from "../../resources/img/x-men.png";
import MarvelServices from "../../services/MarvelServices";
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import ComicsListItem from "../comicsListItem/ComicsListItem";

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [isEmpty, setEmpty] = useState(true);
  const { loading, error, getAllComics, clearError } = MarvelServices();

  useEffect(() => {
    // console.log(" Effect");
    getListComics();
  }, []);

  const getListComics = () => {
    getAllComics().then(setComicsList);
    setEmpty(false);
  };

  console.log(" body");

  console.log("comicsList >>> ", comicsList);

  const comics = comicsList?.map((comics) => {
    return (
      <li className="comics__item" key={comics.id}>
        <ComicsListItem comics={comics} />
      </li>
    );
  });

  return (
    <div className="comics__list">
      {isEmpty && loading ? <Spinner /> : null}
      {!loading && error && <ErrorMessage />}
      <ul className="comics__grid">{comics}</ul>
      <button className="button button__main button__long">
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
