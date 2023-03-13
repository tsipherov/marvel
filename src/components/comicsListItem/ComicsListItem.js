import React from "react";
import uw from "../../resources/img/UW.png";

const ComicsListItem = ({ comics }) => {
  //   console.log("comics ... ", title);
  const { imgUrl, title } = comics;
  return (
    <a href="#">
      <img src={imgUrl} alt={title} className="comics__item-img" />
      <div className="comics__item-name">{title}</div>
      <div className="comics__item-price">9.99$</div>
    </a>
  );
};

export default ComicsListItem;
