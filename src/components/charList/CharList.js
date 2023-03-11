import "./charList.scss";

import MarvelServices from "../services/MarvelServices";
import CharListItem from "../charListItem/CharListItem";
import { useEffect, useState } from "react";

const CharList = ({ selectCharHandler }) => {
  const [charList, setCharList] = useState([]);
  const marvelService = new MarvelServices();

  useEffect(() => {
    marvelService.getAllCharacters().then(setCharList);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    selectCharHandler(charList[0]?.id);
  }, [charList]);

  const characters = charList?.slice(0, 9).map((char) => (
    <li
      className="char__item"
      key={char.id}
      onClick={() => selectCharHandler(char.id)}
    >
      <CharListItem url={char.imgUrl} name={char.name} />
    </li>
  ));
  return (
    <div className="char__list">
      <ul className="char__grid">{characters}</ul>
      <button className="button button__main button__long">
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
