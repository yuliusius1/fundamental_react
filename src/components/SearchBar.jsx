import React from "react";
import PropTypes from "prop-types";
import LocaleContext from "../context/LocaleContext";

function SearchBar({ keyword, keywordChange }) {
  const { locale } = React.useContext(LocaleContext);
  const placeHolder =
    locale === "id" ? "Cari berdasarkan judul ... " : "Search by title ...";
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeHolder}
        value={keyword}
        onChange={(event) => keywordChange(event.target.value)}
      />
    </div>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default SearchBar;
