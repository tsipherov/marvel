import "./comicsList.scss";
import MarvelServices from "../../services/MarvelServices";
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import ComicsListItem from "../comicsListItem/ComicsListItem";

export const setContent = (process, Component, isEmpty) => {
  switch (process) {
    case "Waiting":
      return <Spinner />;
    case "Loading":
      return isEmpty ? <Spinner /> : <Component />;
    case "Confirmed":
      return <Component />;
    case "Error":
      return <ErrorMessage />;

    default:
      throw new Error("Unexpected process state");
  }
};

const ComicsList = () => {
  const randomOffset = Math.floor(Math.random() * 56000);
  const [comicsList, setComicsList] = useState([]);
  const [isEmpty, setEmpty] = useState(true);
  const [offset, setOffset] = useState(randomOffset);
  const { loading, error, getAllComics, process, setProcess } =
    MarvelServices();

  useEffect(() => {
    getListComics();
    setEmpty(false);
    // eslint-disable-next-line
  }, []);

  const getListComics = () => {
    getAllComics(offset)
      .then((res) => {
        setComicsList([...comicsList, ...res]);
        setOffset(offset + res.length);
      })
      .then(() => setProcess("Confirmed"));
  };

  // console.log(" body");

  // console.log("comicsList >>> ", comicsList);

  const comics = comicsList?.map((comics) => {
    return (
      <li className="comics__item" key={comics.id}>
        <ComicsListItem comics={comics} />
      </li>
    );
  });

  return (
    <div className="comics__list">
      <ul className="comics__grid">
        {setContent(process, () => comics, isEmpty)}
      </ul>
      <button
        className="button button__main button__long"
        onClick={getListComics}
        disabled={loading}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
