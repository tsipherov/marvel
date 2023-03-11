import "./charInfo.scss";
import thor from "../../resources/img/thor.jpeg";
import { useEffect, useState } from "react";
import MarvelServices from "../services/MarvelServices";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

const CharInfo = ({ id }) => {
  const [character, setChatacter] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const ms = new MarvelServices();
  useEffect(() => {
    setLoading(true);
    if (id) ms.getCharacter(id).then(setChatacter).catch(setError);
    setLoading(false);
  }, [id]);

  const { name, description, imgUrl, homepage, wiki, comics } = character;
  const comicsList = comics?.map((item) => (
    <li className="char__comics-item" key={item.name}>
      <a href={item.resourceURI}>{item.name}</a>
    </li>
  ));
  return (
    <div className="char__info">
      {loading && <Spinner />}
      {!loading && error && <ErrorMessage />}
      {!loading && !error && !id && <Skeleton />}
      {!loading && !error && id && (
        <>
          <div className="char__basics">
            <img src={imgUrl} alt={name} />
            <div>
              <div className="char__info-name">{name}</div>
              <div className="char__btns">
                <a href={homepage} className="button button__main">
                  <div className="inner">Home page</div>
                </a>
                <a href={wiki} className="button button__secondary">
                  <div className="inner">Wiki</div>
                </a>
              </div>
            </div>
          </div>
          <div className="char__descr">{description}</div>
        </>
      )}
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">{comicsList}</ul>
    </div>
  );
};

export default CharInfo;
