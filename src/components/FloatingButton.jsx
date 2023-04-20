import React from "react";
import PropTypes from "prop-types";

function FloatingButton({ children, onClick }) {
  return (
    <button className="action" onClick={onClick}>
      {children}
    </button>
  );
}

FloatingButton.propTypes = {
  children: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FloatingButton;
