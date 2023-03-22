import { useEffect, useState } from "react";
import MarvelService from "../../services/MarvelServices";
import mjolnir from "../../resources/img/mjolnir.png";
import { setContent } from "../../utils/setContent";

import "./randomChar.scss";

const RandomChar = () => {
  const [char, setChar] = useState({});

  const { getCharacter, clearError, process, setProcess } = MarvelService();

  useEffect(() => {
    updateChar();
    const intervalId = setInterval(updateChar, 15000);
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacter(id)
      .then(onCharLoaded)
      .then(() => {
        setProcess("Confirmed");
      });
  };

  return (
    <div className="randomchar">
      {setContent(process, View, char)}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button
          className="button button__main"
          onClick={() => {
            updateChar();
          }}
        >
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ data }) => {
  const { imgUrl, name, description, homepage, wiki } = data;
  const imgStyle = imgUrl?.includes("/image_not_available")
    ? "randomchar__img fill"
    : "randomchar__img";
  return (
    <div className="randomchar__block">
      <img src={imgUrl} alt="Random character" className={imgStyle} />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
