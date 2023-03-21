import React from "react";
import "./SingleCharLayout.scss";

const SingleCharLayout = ({ item }) => {
  const { name, description, imgUrl } = item;

  return (
    <div className="single-comic">
      <img src={imgUrl} alt={name} className="single-comic__char-img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
      </div>
    </div>
  );
};

export default SingleCharLayout;
