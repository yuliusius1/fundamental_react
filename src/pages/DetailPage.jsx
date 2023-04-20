import React from "react";
import { useParams } from "react-router-dom";
import NoteDetail from "../components/NoteDetail";
import {
  archiveNote,
  deleteNote,
  getActiveNotes,
  getArchivedNotes,
  getNote,
  unarchiveNote,
} from "../utils/api";
import PropTypes from "prop-types";
import useDetailNotes from "../hooks/useDetailNotes";

// function DetailPageWrapper() {
//   const { id } = useParams();

//   return <DetailPage id={id} />;
// }

// class DetailPage extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       notes: getNote(props.id),
//     };
//   }

//   render() {
//     if (this.state.notes === null) {
//       return (
//         <section>
//           <h2>404</h2>
//           <p>Page not found</p>
//         </section>
//       );
//     }

//     return <NoteDetail {...this.state.notes} />;
//   }
// }

// DetailPage.propTypes = {
//   id: PropTypes.string.isRequired,
// };

function DetailPage() {
  const { id } = useParams();
  const [notes, setNotes, initializing] = useDetailNotes({
    archived: false,
    id: id,
  });
  async function onUnarchiveHandler(id) {
    await unarchiveNote(id);

    const { data } = await getArchivedNotes();
    setNotes(data);
  }

  async function onArchiveHandler(id) {
    await archiveNote(id);

    const { data } = await getActiveNotes();
    setNotes(data);
  }

  async function onDeleteHandler(id) {
    await deleteNote(id);

    const { data } = await getActiveNotes();
    setNotes(data);
  }

  if (initializing) {
    return <section>Fetching Notes</section>;
  } else {
    if (notes === null) {
      return (
        <section>
          <h2>404</h2>
          <p>Page not found</p>
        </section>
      );
    } else {
      return (
        <NoteDetail
          archiveNote={onArchiveHandler}
          unarchiveNote={onUnarchiveHandler}
          deleteNote={onDeleteHandler}
          {...notes}
        />
      );
    }
  }
}

export default DetailPage;
