import "./charInfo.scss";
import thor from "../../resources/img/thor.jpeg";
import { useEffect, useState } from "react";
import MarvelServices from "../services/MarvelServices";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const CharInfo = ({ id }) => {
  const [character, setChatacter] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ms = new MarvelServices();
  useEffect(() => {
    if (id) ms.getCharacter(id).then(setChatacter).catch(setError);
    setLoading(false);
  }, [id]);

  const { name, description, imgUrl, homepage, wiki } = character;

  return (
    <div className="char__info">
      {loading && <Spinner />}
      {!loading && error && <ErrorMessage />}
      {!loading && !error && (
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
      )}
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        <li className="char__comics-item">
          All-Winners Squad: Band of Heroes (2011) #3
        </li>
        <li className="char__comics-item">Alpha Flight (1983) #50</li>
        <li className="char__comics-item">Amazing Spider-Man (1999) #503</li>
        <li className="char__comics-item">Amazing Spider-Man (1999) #504</li>
        <li className="char__comics-item">
          AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
        </li>
        <li className="char__comics-item">
          Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
        </li>
        <li className="char__comics-item">
          Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
        </li>
        <li className="char__comics-item">Vengeance (2011) #4</li>
        <li className="char__comics-item">Avengers (1963) #1</li>
        <li className="char__comics-item">Avengers (1996) #1</li>
      </ul>
    </div>
  );
};

export default CharInfo;
