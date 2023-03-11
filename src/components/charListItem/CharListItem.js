import React from "react";
// import abyss from "../../resources/img/abyss.jpg";

const CharListItem = ({ name, url }) => {
  return (
    <>
      <img src={url} alt={name} />
      <div className="char__name">{name}</div>
    </>
  );
};

export default CharListItem;
