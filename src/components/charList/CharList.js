import "./charList.scss";
import PropTypes from "prop-types";
import CharListItem from "../charListItem/CharListItem";
import { useEffect, useState, useRef, useMemo } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelServices from "../../services/MarvelServices";
import { CSSTransition, TransitionGroup } from "react-transition-group";

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

const CharList = ({ selectCharHandler }) => {
  const [charList, setCharList] = useState([]);
  const [offset, setOffset] = useState(200);
  const [isEmpty, setEmpty] = useState(true);

  const { loading, error, getAllCharacters, process, setProcess } =
    MarvelServices();

  useEffect(() => {
    getListCharacters();
    // eslint-disable-next-line
  }, []);

  const getListCharacters = () => {
    getAllCharacters(offset)
      .then((res) => {
        setCharList([...charList, ...res]);
        setEmpty(false);
        setOffset(offset + res?.length);
      })
      .then(() => setProcess("Confirmed"));
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

  const content = useMemo(
    () =>
      setContent(
        process,
        () => (
          <ul className="char__grid">
            <TransitionGroup component={null}>{characters}</TransitionGroup>
          </ul>
        ),
        isEmpty
      ),
    [process]
  );

  return (
    <div className="char__list">
      {content}
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
