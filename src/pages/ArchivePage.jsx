import React from "react";
import { useSearchParams } from "react-router-dom";
import {
  archiveNote,
  deleteNote,
  getArchivedNotes,
  unarchiveNote,
} from "../utils/api";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import LocaleContext from "../context/LocaleContext";
import useDetailNotes from "../hooks/useDetailNotes";

// function ArchivePageWrapper() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const keyword = searchParams.get("keyword");

//   function changeSearchParams(keyword) {
//     setSearchParams({ keyword });
//   }

//   return (
//     <ArchivePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
//   );
// }

// class ArchivePage extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       notes: getArchivedNotes(),
//       keyword: props.defaultKeyword || "",
//     };

//     this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
//   }

//   onKeywordChangeHandler(keyword) {
//     this.setState(() => {
//       return {
//         keyword,
//       };
//     });

//     this.props.keywordChange(keyword);
//   }

//   render() {
//     const notes = this.state.notes.filter((note) => {
//       return note.title
//         .toLowerCase()
//         .includes(this.state.keyword.toLowerCase());
//     });
//     return (
//       <section>
//         <h2>Catatan Arsip</h2>
//         <SearchBar
//           keyword={this.state.keyword}
//           keywordChange={this.onKeywordChangeHandler}
//         />
//         <NoteList notes={notes} />
//       </section>
//     );
//   }
// }

// ArchivePage.propTypes = {
//   defaultKeyword: PropTypes.string,
//   keywordChange: PropTypes.func.isRequired,
// };

// export default ArchivePageWrapper;

function ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [notes, initializing] = useListNotes(true);
  const [notes, setNotes, initializing] = useDetailNotes({
    archived: true,
    id: null,
  });

  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });
  const { locale } = React.useContext(LocaleContext);

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  if (!initializing) {
    return (
      <section>
        <h2>{locale === "id" ? "Catatan Arsip" : "Archive notes"}</h2>
        <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
        <NoteList notes={filteredNotes} />
      </section>
    );
  } else {
    return (
      <section>
        <h2>{locale === "id" ? "Catatan Arsip" : "Archive notes"}</h2>
        <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
        {locale === "id" ? "Memuat Catatan..." : "Fetching Notes.."}
      </section>
    );
  }
}
export default ArchivePage;
