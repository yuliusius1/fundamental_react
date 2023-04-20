import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { showFormattedDate } from "../utils";

function NoteItem({ id, title, note, createdAt, isArchived }) {
  return (
    <div className="note-item">
      <Link to={`/notes/${id}`}>
        <h3 className="note-item__title">{title}</h3>
      </Link>
      <p className="note-item__createdAt">{showFormattedDate(createdAt)}</p>
      <p className="note-item__body">{note}</p>
    </div>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
  isArchived: PropTypes.bool.isRequired,
};

export default NoteItem;
