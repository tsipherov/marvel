import { Component } from "react";
import MarvelService from "../services/MarvelServices";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class RandomChar extends Component {
  state = {
    char: {},
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateChar();
    // this.intervalId = setInterval(this.updateChar, 5000);
  }

  componentWillUnmount() {
    // clearInterval(this.intervalId);
  }

  marvelService = new MarvelService();

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onError = (err) => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  updateChar = () => {
    this.setState((prevState) => ({ ...prevState, loading: true }));
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  render() {
    const {
      char: { name, description, imgUrl, homepage, wiki },
      loading,
      error,
    } = this.state;

    const imgStyle = imgUrl?.includes("/image_not_available")
      ? "randomchar__img fill"
      : "randomchar__img";

    return (
      <div className="randomchar">
        {loading && <Spinner />}
        {!loading && error && <ErrorMessage />}
        {!loading && !error && (
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
        )}
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
              this.updateChar();
            }}
          >
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

export default RandomChar;
