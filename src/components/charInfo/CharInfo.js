import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import "./charInfo.scss";
import MarvelServices from "../../services/MarvelServices";

const CharInfo = ({ id }) => {
  const [character, setChatacter] = useState({});

  const { loading, error, getCharacter } = MarvelServices();
  useEffect(() => {
    if (id) getCharacter(id).then(setChatacter);

    // eslint-disable-next-line
  }, [id]);

  const { name, description, imgUrl, homepage, wiki, comics } = character;
  const comicsList = comics?.map((item) => (
    <li className="char__comics-item" key={item.name}>
      <a href={item.resourceURI}>{item.name}</a>
    </li>
  ));

  const noComics = (
    <li className="char__comics-item">
      There is no comics with this character
    </li>
  );
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
      <ul className="char__comics-list">
        {comicsList?.length ? comicsList : noComics}
      </ul>
    </div>
  );
};

CharInfo.propTypes = {
  id: PropTypes.number,
};

export default CharInfo;
