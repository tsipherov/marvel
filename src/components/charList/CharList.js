import "./charList.scss";
import PropTypes from "prop-types";
import CharListItem from "../charListItem/CharListItem";
import { useEffect, useState, useRef } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelServices from "../../services/MarvelServices";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const CharList = ({ selectCharHandler }) => {
  const [charList, setCharList] = useState([]);
  const [offset, setOffset] = useState(200);
  const [isEmpty, setEmpty] = useState(true);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const limit = 9;

  const { loading, error, getAllCharacters } = MarvelServices();

  useEffect(() => {
    getListCharacters();
    // eslint-disable-next-line
  }, []);

  const getListCharacters = () => {
    console.log("useEffect");
    getAllCharacters(offset).then((res) => {
      // setLoading(false);
      setCharList([...charList, ...res]);
      setEmpty(false);
      setOffset(offset + res?.length);
    });
  };
  console.log("body");

  const charRefs = useRef([]);

  const focusOnItem = (id) => {
    charRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    charRefs.current[id].classList.add("char__item_selected");
    charRefs.current[id].focus();
  };

  const characters = charList?.map((char, ind) => (
    <CSSTransition key={char.id} classNames="char__item" timeout={1000}>
      <li
        // key={char.id}
        className="char__item"
        ref={(el) => (charRefs.current[ind] = el)}
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
    </CSSTransition>
  ));

  return (
    <div className="char__list">
      {isEmpty && loading ? <Spinner /> : null}
      {!loading && error && <ErrorMessage />}
      <ul className="char__grid">
        <TransitionGroup component={null}>{characters}</TransitionGroup>
      </ul>
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
