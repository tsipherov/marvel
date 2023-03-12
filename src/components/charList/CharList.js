import "./charList.scss";
import PropTypes from "prop-types";
import MarvelServices from "../services/MarvelServices";
import CharListItem from "../charListItem/CharListItem";
import { useEffect, useState, useRef } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const CharList = ({ selectCharHandler }) => {
  const [charList, setCharList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const limit = 9;
  const marvelService = new MarvelServices();

  useEffect(() => {
    getListCharacters();
    // eslint-disable-next-line
  }, []);

  const getListCharacters = () => {
    marvelService
      .getAllCharacters(offset, limit)
      .then((res) => {
        setLoading(false);
        setCharList([...charList, ...res]);
        setOffset(offset + limit);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  const charRefs = useRef([]);

  const focusOnItem = (id) => {
    charRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    charRefs.current[id].classList.add("char__item_selected");
    charRefs.current[id].focus();
  };

  const characters = charList?.map((char, ind) => (
    <li
      className="char__item"
      ref={(el) => (charRefs.current[ind] = el)}
      key={char.id}
      onClick={() => {
        selectCharHandler(char.id);
        focusOnItem(ind);
      }}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          selectCharHandler(char.id);
          focusOnItem(ind);
        }
      }}
    >
      <CharListItem url={char.imgUrl} name={char.name} />
    </li>
  ));

  return (
    <div className="char__list">
      {loading && <Spinner />}
      {!loading && error && <ErrorMessage />}
      {!(loading || error) && <ul className="char__grid">{characters}</ul>}
      <button
        disabled={loading}
        className="button button__main button__long"
        onClick={getListCharacters}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};
CharList.propTypes = {
  selectCharHandler: PropTypes.func.isRequired,
};

export default CharList;
