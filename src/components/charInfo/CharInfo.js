import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./charInfo.scss";
import MarvelServices from "../../services/MarvelServices";
import { setContent } from "../../utils/setContent";

const CharInfo = ({ id }) => {
  const [character, setChatacter] = useState({});

  const { getCharacter, clearError, process, setProcess } = MarvelServices();
  useEffect(() => {
    if (id) getCharacter(id).then(setChatacter).then(setProcess("Confirmed"));

    // eslint-disable-next-line
  }, [id]);

  const View = ({ data }) => {
    const { imgUrl, name, homepage, wiki, description, comics } = data;
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
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
          {comicsList?.length ? comicsList : noComics}
        </ul>
      </div>
    );
  };

  return setContent(process, View, character);
};

CharInfo.propTypes = {
  id: PropTypes.number,
};

export default CharInfo;
