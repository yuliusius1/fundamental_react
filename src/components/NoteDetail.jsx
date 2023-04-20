import React from "react";
import { showFormattedDate } from "../utils";
import FloatingButton from "./FloatingButton";
import { BiArchiveIn, BiArchiveOut, BiTrash } from "react-icons/bi";
// import { archiveNote, deleteNote, unarchiveNote } from "../utils/api";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function NoteDetail({
  id,
  body,
  title,
  createdAt,
  archived,
  archiveNote,
  unarchiveNote,
  deleteNote,
}) {
  const navigate = useNavigate();
  let floatingButton = (
    <FloatingButton
      children={<BiArchiveIn />}
      onClick={() => {
        archiveNote(id);
        navigate("/");
      }}
    />
  );
  if (archived) {
    floatingButton = (
      <FloatingButton
        children={<BiArchiveOut />}
        onClick={() => {
          unarchiveNote(id);
          navigate("/archives");
        }}
      />
    );
  }
  return (
    <section className="detail-page">
      <h3 className="detail-page__title">{title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
      <p className="detail-page__body">{body}</p>
      <div className="detail-page__action">
        {floatingButton}
        <FloatingButton
          children={<BiTrash />}
          onClick={() => {
            deleteNote(id);
            navigate("/");
          }}
        />
      </div>
    </section>
  );
}

NoteDetail.propTypes = {
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
};

export default NoteDetail;
