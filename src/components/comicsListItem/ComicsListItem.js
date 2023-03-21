import React from "react";
import { Link } from "react-router-dom";

const ComicsListItem = ({ comics }) => {
  const { imgUrl, title, id, price } = comics;
  return (
    <Link to={`/comics/${id}`}>
      <img src={imgUrl} alt={title} className="comics__item-img" />
      <div className="comics__item-name">{title}</div>
      <div className="comics__item-price">{price}$</div>
    </Link>
  );
};

export default ComicsListItem;
