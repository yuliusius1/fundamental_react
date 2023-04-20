import React from "react";
import NoteItem from "./NoteItem";
import PropTypes from "prop-types";
import LocaleContext from "../context/LocaleContext";

function NoteList({ notes }) {
  const { locale } = React.useContext(LocaleContext);
  if (notes.length > 0) {
    return (
      <div className="notes-list">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            title={note.title}
            createdAt={note.createdAt}
            note={note.body}
            id={note.id}
            isArchived={note.archived}
            {...note}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="notes-list-empty">
        <p>{locale === "id" ? "Tidak ada catatan" : "No notes"}</p>
      </div>
    );
  }
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NoteList;
