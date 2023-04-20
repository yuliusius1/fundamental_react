import React from "react";
import { getNote, getArchivedNotes, getActiveNotes } from "../utils/api";

function useDetailNotes({ archived, id }) {
  const [initializing, setInitializing] = React.useState(true);
  const [notes, setNotes] = React.useState([]);

  React.useEffect(() => {
    if (id !== null) {
      getNote(id).then(({ data }) => {
        setNotes(data);
        setInitializing(false);
      });
    } else {
      if (archived) {
        getArchivedNotes().then(({ data }) => {
          setNotes(data);
          setInitializing(false);
        });
      } else {
        getActiveNotes().then(({ data }) => {
          setNotes(data);
          setInitializing(false);
        });
      }
    }
  }, [id]);

  return [notes, setNotes, initializing];
}

export default useDetailNotes;
