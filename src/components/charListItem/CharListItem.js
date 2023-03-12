import React from "react";
import PropTypes from "prop-types";
const CharListItem = ({ name, url }) => {
  return (
    <>
      <img src={url} alt={name} />
      <div className="char__name">{name}</div>
    </>
  );
};
CharListItem.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
export default CharListItem;
